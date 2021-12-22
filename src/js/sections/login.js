
var suscriberId = '',
	suscriberEmail = '',
	devicePlatform = '',
	deviceType = '',
	deviceUUID = '',
	deviceVersion = '',
	deviceFirmwareVersion = '',
	deviceSdkVersion = '',
	versionApp = '',
	suscriberPassword = '',
	sectionLoginActive = false

function clearSessionApp() {
	localStorage.clear()
	removeAuthCookies()
}

function removeAuthCookies(){
	Cookies.remove('memtok')
	Cookies.remove('memid')
	Cookies.remove('memclid')
	Cookies.remove('memclem')
}

function logout() {
	clearSessionApp()
}

function showMainPageLogin(e) {
	if (e == 13 || nativeEventValid(e) || pressBack(e.nativeEvent)) {
		ReactDOM.render(<MainInfoLogin />, document.getElementById(idLoginPage))
	}else{
		if(pressDown(e.nativeEvent)){
			document.getElementById('username-login').focus()
		}
	}
}

function showRegisterPageLogin(e) {
	if (nativeEventValid(e)) {
		ReactDOM.render(
			<RegisterInfoLogin />,
			document.getElementById(idLoginPage)
		)
	}
}

function showFormPageLogin(e) {
	if (nativeEventValid(e)) {
		ReactDOM.render(<FormLogin />, document.getElementById(idLoginPage))
	}
}

function validateInput(inputId) {
	if (document.getElementById(inputId).value != '') {
		return true
	}

	return false
}

function setCursor(elemId) {
	var tb = document.getElementById(elemId)
	var cursor = -1

	// IE
	if (document.selection && (document.selection != 'undefined'))
	{
		var _range = document.selection.createRange()
		var contador = 0
		while (_range.move('character', -1))
			contador++
		cursor = contador
	}
	// FF
	else if (tb.selectionStart >= 0)
		cursor = tb.selectionStart

	return cursor
}

function pressButtonLogin(e) {
	if(nativeEventValid(e) || e.keyCode == 65376){
		var buttonId = e.currentTarget.id
		var isUsername = validateInput('username-login')
		var isPassword = validateInput('password-login')
		var button = document.getElementById(buttonId)

		if(button.classList.contains('button-username') && isUsername){
			document.getElementById('password-login').focus()
			return
		}

		if(button.classList.contains('button-password') && isPassword){
			makeLoginApp()
		}

		if(button.classList.contains('button-login') && (isUsername && isPassword)){
			if(pressBack(e.nativeEvent)){
				showMainPageLogin(13)
			}else{
				makeLoginApp()
			}
		}else if(!isUsername){
			document.getElementById('username-login').focus()
		}else if(!isPassword){
			document.getElementById('password-login').focus()
		}

	}else{
		var buttonId = e.currentTarget.id
		var button = document.getElementById(buttonId)
		if(pressBack(e.nativeEvent)){
			if(button.classList.contains('button-login')){
				console.log(e.nativeEvent.keyCode)
				showMainPageLogin(13)
			}
		}
		
		if(pressBack(e.nativeEvent)){
			if(button.classList.contains('button-username') || button.classList.contains('button-password')){
				if(isWebOS() && !keyboardStateEvent.visibility){
					webOS.platformBack()
				}
			}
		}

		if(pressUp(e.nativeEvent)){
			if(button.classList.contains('button-username') || button.classList.contains('button-password')){
				document.getElementById('back-button-form-login').focus()
			}
		}

		if(pressRight(e.nativeEvent) && !keyboardStateEvent.visibility){
			if(button.classList.contains('button-username')){
				document.getElementById('password-login').focus()
			}
		}

		if(pressLeft(e.nativeEvent) && !keyboardStateEvent.visibility){
			if(button.classList.contains('button-password')){
				document.getElementById('username-login').focus()
			}
		}


		if(pressUp(e.nativeEvent)){
			if(button.classList.contains('button-login')){
				document.getElementById('password-login').focus()
			}
		}

		if(pressDown(e.nativeEvent)){
			if(button.classList.contains('button-password')){
				document.getElementById('button-login').focus()
			}
		}
	}
}

function makeLoginApp() {
	fadeOutFadeInElements(idLoginPage, idLoaderLogo, '1', '0', '0.2s')
	var username = document.getElementById('username-login').value
	var password = document.getElementById('password-login').value
	makeHash(username, password, function (result) {
		requestSuscriberKeys(username, result)
	})
}

function makeHash(username, password, callback) {
	if (webOS.platform.tv === true) {
		console.log('Hola')
		encryptPasswordService(username, password)
		// return callback(suscriberPassword);
	} else {
		var salt = gensalt(9)
		hashpw(password, salt, result, function () {})
		function result(newhash) {
			suscriberPassword = btoa(newhash)
			return callback(suscriberPassword)
		}
	}
}

function requestSuscriberKeys(username, suscriberPassword) {
	axios
		.get(urlGetApi + 'cmd/logusr/' + username + '/' + suscriberPassword, {
			params: {
				DevicePlatform: devicePlatform,
				DeviceType: deviceType,
				DeviceUUID: deviceUUID,
				DeviceVersion: versionApp,
			}
		})
		.then(function (response) {
			validateSuscriptionStatusCode(response.data, username)
			// console.log("Success");
		})
		.catch(function (error) {
			alert(error)
			showMessageLoginFailed(error)
		})
}

function validateSuscriptionStatusCode(response, username) {
	switch (response.ResponseCode) {
	case 0:
		// Usuario no encontrado
		showMessageLoginFailed(response)
		break
	case 1:
		// console.log(response);
		break
	case 2:
		// Usuario suscrito
		saveLoginCookies(response, username)
		startApp(response, username)
		break
	case 3:
		// Password incorrecta
		showMessageLoginFailed(response)
		break
	default:
		showMessageLoginFailed(response)
		break
	}
}

function saveLoginCookies(response, username){
	if(isWebOS() || isTizenOS()){
		saveSuscriberKeys(response, username)
	}else{
		Cookies.set('memclid', response.SuscriberID, { expires: 365 })
		Cookies.set('memclem', username, { expires: 365 })
		suscriberId = response.SuscriberID
	}
}

function saveSuscriberKeys(response, username) {
	localStorage.setItem('suscriberId', response.SuscriberID)
	localStorage.setItem('suscriberEmail', username)
	suscriberId = response.SuscriberID
	localStorage.clickcount = 1
}

function setUserInfoApp(username) {
	document.getElementById('suscriberId').innerHTML = username
	document.getElementById('versionApp').innerHTML = versionApp
	document.getElementById('pageApp').innerHTML = pageApp
}

function clearLoginView() {
	sectionLoginActive = false
	clearInpustFormLogin()
}

function startApp(response, username) {
	setUserInfoApp(username)
	getMenuPrincipal([idLoaderLogo], false)
	clearLoginView()
}

function clearInpustFormLogin() {
	document.getElementById('username-login').value = ''
	document.getElementById('password-login').value = ''
}

function showMessageLoginFailed(response) {
	var message = response.Response ? response.Response : 'Ocurrió un problema'
	ReactDOM.render(
		<LoginMessageFailed message={message} responseCode={response.ResponseCode} />,
		document.getElementById(idMessageLoginFailed)
	)
	focusSection = idMessageLoginFailed
	fadeOutFadeInElements(idLoaderLogo, idMessageLoginFailed, '1', '0', '0.2s')
}

function backLoginFailed(e) {
	if (nativeEventValid(e)) {
		document.getElementById('password-login').value = ''
		focusSection = 'form-info-login'
		fadeOutFadeInElements(idMessageLoginFailed, idLoginPage, '1', '0', '0.2s')
	}
}

function pressBackOnSectionLogin(e) {
	if (pressBack(e)) {
		if (e.target.id) {
			if (e.target.id == 'username-login' || e.target.id == 'password-login') {
			} else {
				// console.log("platformBack");
				webOS.platformBack()
				if(isTizenOS()){
					open(location, '_self').close()
				}
			}
		} else {
			// console.log("platformBack");
			webOS.platformBack()
			if(isTizenOS()){
				open(location, '_self').close()
			}
		}
	}
}

function encryptPasswordService(username, password) {
	var request = webOS.service.request(
		'luna://com.guiahtv.smarttv.encryptpasswordservice/',
		{
			method: 'encryptPassword',
			parameters: {
				username: username,
				string: password,
			},
			onFailure: function (inError) {
				var message = 'Ocurrió un problema'
				ReactDOM.render(
					<LoginMessageFailed message={message} />,
					document.getElementById(idMessageLoginFailed)
				)
				focusSection = idMessageLoginFailed
				fadeOutFadeInElements(
					idLoaderLogo,
					idMessageLoginFailed,
					'1',
					'0',
					'0.2s'
				)
			},
			onComplete: function (inResponse) {
				// console.log(inResponse);
				// console.log("Service Responded");
				console.log(inResponse)
				var username = inResponse.username
				var suscriberPassword = btoa(inResponse.password)
				requestSuscriberKeys(username, suscriberPassword)
			},
		}
	)
}

function focusButtonFormLogin(){
	document.body.style.height = '100%'
	document.body.style.position = ''
}
