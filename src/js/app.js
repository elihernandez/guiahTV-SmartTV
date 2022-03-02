"use strict"
console.log(navigator.userAgent)

const initialStore = { 
	count: 0 
}

const store = Kel(initialStore)

const COUNT_CHANGE = 'countChange'

store.on(COUNT_CHANGE, ({ count }) => {
	console.log(count)
})

// window.addEventListener("click", function () {
// 	store.emit(COUNT_CHANGE, ({ count }) => 
// 		({ count: count + 1 })
// 	)
// })

// window.addEventListener("click", function () {
//   store.emit(COUNT_CHANGE, ({ count }) => ({ count: count - 1 }))
// })
const saludo = 'Hola'
const env = 'dev'

var urlGetApi = 'https://lap55.com/json/api/',
	timeoutGetApi = 15000,
	minTime = 2000,
	defaultTime = 0,
	plusTime = 0,
	timeDelay = 0,
	fadeFast = 'fast',
	fadeSlow = 'slow',
	idGifLoader = 'gif',
	idVideoLogo = 'video-logo',
	idRightMenu = 'right-menu',
	idInfoLogout = 'info-logout',
	idLoaderLogo = 'loader-logo',
	idLoaderSpinner = 'loader-spinner',
	idLoaderLogoSpinner = 'loader-logo-spinner',
	idTopMenu = 'top-menu',
	idConfigurationsMenu = 'configurations-menu',
	idMenuPrincipal = 'menu-principal',
	idEnVivo = 'envivo',
	idALaCarta = 'alacarta',
	idTemporadas = 'temporadas',
	idSeries = 'series',
	idVideoALaCarta = 'video-alacarta',
	idRadio = 'radio',
	idRadioView2 = 'radio-view-2',
	idZonaKids = 'zonakids',
	idSectionMusica = 'musica',
	idErrorPage = 'error-page',
	idLoginPage = 'login-view',
	idRegisterInfo = 'register-view',
	idLoginForm = 'form-login-view',
	idErrorPageStatus = 'error-page-status',
	idErrorVideoStatus = 'error-video-status',
	idErrorSesionFailed = 'error-sesion-failed',
	idMessageLoginFailed = 'message-login-failed-view',
	fadeOptions = new Object,
	focusElement,
	focusSection,
	pageApp = 'www.guiah.tv',
	videoLogoTag = document.getElementById('video-logo-tag'),
	suscriptionStatus,
	idPreviousSection,
	sectionActiveId,
	sectionErrorStatus,
	passwordToken

window.onload = function() {
	startGuiahTv()
} 

// Función que se ejecuta al cargar la página
function startGuiahTv(){
	loadInformation(function(validate){
		validatePlatform()
		if(validate){   
			getMenuPrincipal([idLoaderLogo], false) 
		}else{
			sectionLoginActive = true
			fadeInElement(idLoginPage, '0', '1', '0.2s')
			showMainPageLogin(13)
			fadeOutElementDelay(idLoaderLogo, '1', '0', '0.2s', '0.5s')
		}
	})
}

function loadInformation(callback){
	return callback(validateLogin())

	// fadeInElement(idVideoLogo, "0", "1", "0s");
	// videoLogoTag.play();
    
	// videoLogoTag.onended = function(){
	//   $("#video-logo").fadeOut(function(){
	//     var validate = validateLogin();
	//     return callback(validate);
	//   })
	// }
}

function validateLogin(){
	if(isWebOS() || isTizenOS()){
		if(typeof(Storage) !== 'undefined') {
			suscriberId = localStorage.getItem('suscriberId')
			suscriberEmail = localStorage.getItem('suscriberEmail')
			if(suscriberId){
				return true
			}
		}
		return false
	}else{
		if(Cookies.get('memclem') === undefined || Cookies.get('memclid') === undefined){
			return false
		}

		suscriberId = Cookies.get('memclid')
		suscriberEmail = Cookies.get('memclem')
		return true
	} 
}