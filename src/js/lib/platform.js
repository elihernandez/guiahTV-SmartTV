
function validatePlatform(){
	if (isWebOS()) {
		getInfoWebOS(function(){})
		isSmartTv()
	} else if(isTizenOS()){ 
		loadScript('$WEBAPIS/webapis/webapis.js', function(){
			getInfoTizen(function(){}) 
			isSmartTv()
		})
	}else {
		generatePlatformCookies()
		getVersionApp()
		isSmartTv()
	}
}

function generatePlatformCookies(){
	if(Cookies.get('platform') === undefined){
		devicePlatform = 'Web Browser'
		Cookies.set('platform', devicePlatform)
	}else{
		devicePlatform = Cookies.get('platform')
	}

	if(Cookies.get('type') === undefined){
		// deviceType = bowser.name+' '+bowser.version
		deviceType = ''
		Cookies.set('type', deviceType)
	}else{
		deviceType = Cookies.get('type')
	}

	if(Cookies.get('uuid') === undefined){
		deviceUUID = uuidv4()
		Cookies.set('uuid', deviceUUID, { expires: 365 })
	}else{
		deviceUUID = Cookies.get('uuid')
	}

	if(Cookies.get('user-agent') === undefined){
		Cookies.set('user-agent', navigator.userAgent)
	}

	if(Cookies.get('memtok') === undefined){
		passwordToken = uuidv4()
		var salt = gensalt(12)
		hashpw(passwordToken, salt, result, function () {})
		function result(newhash) {
			Cookies.set('memtok', newhash)
		}
	}

	if(Cookies.get('memid') === undefined){
		passwordToken = uuidv4()
		var salt = gensalt(12)
		hashpw(passwordToken, salt, result, function () {})
		function result(newhash) {
			Cookies.set('memid', btoa(newhash))
		}
	}
}

function isSmartTv(){
	iniciarSpatialNavigation()
}

function isWebBrowser(){
	if(webOS.platform.tv === true){
		return false
	}

	if(typeof webapis !== 'undefined'){
		return false
	}

	return true
}

function addUserInformation(){
	document.getElementById('suscriberId').innerHTML = suscriberEmail
	document.getElementById('versionApp').innerHTML = versionApp
	document.getElementById('pageApp').innerHTML = pageApp
}

function getVersionApp(){
	if (isWebOS()) {
		var path = 'https://guiah.tv/watch/download/webOS/appinfo.json'
	} else if(isTizenOS()){ 
		var path = 'https://guiah.tv/watch/download/tizenOS/appinfo.json'
	}else {
		const location = window.location
		const { pathname } = location
		var path = `${pathname}appinfo.json`
	}

	readTextFile(path, function(text){
		var data = JSON.parse(text)
		console.log(data)
		versionApp = data.version
		addUserInformation()
	})
}

function readTextFile(file, callback) {
	// console.log('🚀 ~ file: plaftorm.js ~ line 130 ~ readTextFile ~ readTextFile', readTextFile)
	var rawFile = new XMLHttpRequest()
	rawFile.overrideMimeType('application/json')
	rawFile.open('GET', file, true)
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == '200') {
			callback(rawFile.responseText)
		}
	}
	rawFile.send(null)
}

function loadScript(src, callback) {
	var s, r, t
	r = false
	s = document.createElement('script')
	s.type = 'text/javascript'
	s.src = src
	s.onload = s.onreadystatechange = function() {
		//console.log( this.readyState ); //uncomment this line to see which ready states are called.
		if (!r && (!this.readyState || this.readyState == 'complete')) {
			r = true
			callback()
		}
	}
	t = document.getElementsByTagName('script')[0]
	// console.log(t)
	t.parentNode.insertBefore(s, t)
}

// function updateVersionService() {
//     let info, data;
//     var path = webOS.fetchAppRootPath();
//     webOS.fetchAppInfo(function (text) {
//         if(text){
//             info = text;
//             console.log(info)
                         
//             axios.get('https://lap55.com/json/api/info/SmartTV/currentversion')
//             .then(function (response) {
//                 data = response.data;
//                 console.log(data);
//                 if(data.Versioncode > info.versioncode){
//                     console.log("Version mayor")
//                     updateJSCode();
//                 }else{
//                     console.log("Version menor o igual")
//                 }
//             })
//             .catch(function (error) {
//                 console.log(error);
//                 return console.log("Ocurrió un problema en la petición al API para obtener el current version");
//             })
//         }else{
//             console.log("Ocurrió un problema al leer el archivo JSON");
//         }
//     }, path + 'appinfo.json');

   
// }

// function updateJSCode(){
//     var path = webOS.fetchAppRootPath();
//     axios.get('https://guiah.tv/watch/download/build.js')
//     .then(function (response) {
//         console.log(response.data)
//         // fs.writeFile("build/contenido.js", response.data, function(err) {
//         //   if (err) {
//         //     console.log(err);
//         //     return console.log("Ocurrió un problema al escribir el archivo JS");
//         //   }
        
//         //   console.log("El archivo js fue creado correctamente");
//         // });

//         var request = webOS.service.request("luna://com.guiahtv.smarttv.encryptpasswordservice/", {
//             method:"updateVersion",
//             parameters: {  
//                 code: response.data,
//                 path: path,
//             },
//             onSuccess: function(inResponse) {  
//                 console.log(inResponse)
//                 loadScript(path + 'app/build/contenido.js', function(){
//                 })
//             },
//             onFailure: function(inError) {  
//                 console.log(inError)
//             },
//             onComplete: function(inResponse) {  
//                 console.log(inResponse)
//             }
//         });
//     })
//     .catch(function (error) {
//         console.log(error);
//         console.log("Ocurrió un problema en la petición al API del archivo JS")
//     })
// }
