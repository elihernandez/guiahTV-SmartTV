// Función para abrir las secciones
function getSectionApi(e, section, idElementOut, clearElement) {  
	switch (section) {
	case 0:
		fadeOutElement(idTopMenu, '1', '0', '0.2s')
		fadeOutFadeInElements(idMenuPrincipal, idLoaderSpinner, '1', '0', '0.2s')
		sectionMenuPrincipalActive = false
		var utcOffset = getUtcOffsetLocal()
		// utcOffset = "UTC-7";
		fadeOptions.url = urlGetApi+'cmdata/leon/livetvplus/'+suscriberId+'/'+utcOffset
		getSubscriptionStatus(section, idElementOut, clearElement, idLoaderSpinner)
		break
	case 1:
		fadeOutElement(idTopMenu, '1', '0', '0.2s')
		fadeOutFadeInElements(idMenuPrincipal, idLoaderSpinner, '1', '0', '0.2s')
		sectionMenuPrincipalActive = false
		fadeOptions.url = urlGetApi+'cmdata/leon/entplus/'+suscriberId
		getSubscriptionStatus(section, idElementOut, clearElement, idLoaderSpinner)
		break        
	case 2:
		fadeInElement(idLoaderSpinner, '0', '1', '0.2s')
		fadeOptions.url = urlGetApi+'cdata/leon/radio/'+suscriberId
		getSubscriptionStatus(section, idElementOut, clearElement, idLoaderSpinner)
		break
	case 3:
		fadeOutFadeInElements(idMenuPrincipal, idLoaderSpinner, '1', '0', '0.2s')
		fadeOptions.url = 'https://api.guiah.tv/music/home/'+suscriberId+'/1'
		getSubscriptionStatus(section, idElementOut, clearElement, idLoaderSpinner)
		break
	case 4:
		fadeInElement(idLoaderSpinner, '0', '1', '0.2s')
		fadeOptions.url = urlGetApi+'cdata/leon/kids/'+suscriberId
		getSubscriptionStatus(section, idElementOut, clearElement, idLoaderSpinner)
		break
	case 5:
		break
	default:
		break
	}
}

function getSubscriptionStatus(section, idElementOut, clearElement, previousElement){
	$.ajax({
		timeout: timeoutGetApi,
		url: fadeOptions.url,
		success: function(response) {
			var suscriptionStatus
			if(response[0] && response[0].SuscriptionStatus){
				suscriptionStatus = response[0].SuscriptionStatus
			}else if(response.suscriptionStatus){
				suscriptionStatus = response.suscriptionStatus
			}
			validateSubscription(suscriptionStatus, response, section, previousElement)
		},
		error: function(error) {
			errorSection([previousElement])
		}
	})
}

function validateSubscription(suscriptionStatus, response, section, previousElement){
	switch(suscriptionStatus) {
	case 0:
		// Suscripción expirada
		errorSection([previousElement])
		break
	case 1:
		// Suscripción válida
		validSubscription(response, section)
		break
	case 2:
		// Suscripción periodo de gracia
		validSubscription(response, section)
		break
	case 3:
		// Suscripción gratuita
		validSubscription(response, section)
		break
	case 4:
		// Sesión no válida
		sessionNotValid([previousElement])
		break
	default:
		errorSection([previousElement])
		break
	}
}

function validSubscription(response, section){
	switch (section) {
	case 0:
		getEnVivo(response)
		break
	case 1:
		getALaCarta(response)
		break
	case 2:
		getRadio(response)
		break
	case 3:
		getMusica(response)
		break
	case 4:
		getZonaKids(response, idLoaderSpinner, false)
		break
	case 5:
      
		break
	default:
		// console.log("");
		break
	}
	clearMenuPrincipal()
}

function sessionNotValid(idElements){
	// if(isVisible(idLoaderSpinner)){
	//   fadeOutElement(idLoaderSpinner, "1", "0", "0s");
	// }
	hideMagicButtonBack()
	focusSection = 'error-sesion-failed'
	fadeOutElements(idElements, '1', '0', '0.2s')
	fadeInElement(idErrorSesionFailed, '0', '1', '0.3s')
	sectionErrorStatus = true
}

function sessionNotValidLogout(e){
	if(pressEnter(e) || pressBack(e)){
		logout()
		fadeOutElement(idErrorSesionFailed, '1', '0', '0.3s')
		showMainPageLogin('13')
		fadeInElement(idLoginPage, '0', '1', '0.1s')
		sectionErrorStatus = false
		sectionLoginActive = true
	}
}

function errorSection(idElements){ 
	if(isVisible(idLoaderSpinner)){
		fadeOutElement(idLoaderSpinner, '1', '0', '0s')
	}
	hideMagicButtonBack()
	focusSection = 'error-page-status'
	fadeOutElements(idElements, '1', '0', '0.2s')
	fadeInElement(idErrorPageStatus, '0', '1', '0.3s')
	sectionErrorStatus = true
}

function errorSectionBack(e){
	if(pressEnter(e) || pressBack(e) || clickEnter(e)){
		fadeOutElement(idErrorPageStatus, '1', '0', '0.2s')
		fadeInElement(idLoaderSpinner, '0', '1', '0.2s')
		sectionErrorStatus = false
		getMenuPrincipal([idLoaderSpinner], false)
	}
}

function validateStatusCode(data, sectionActive){
	switch(data.StatusCode) {
	case 0:
		// Suscripción expirada
		errorSection([sectionActive])
		break
	case 1:
		return true
		break
	case 2:
		// Suscripción periodo de gracia
		return true
		break
	case 3:
		// Suscripción gratuita
		return true
		break
	case 4:
		// Sesión no válida
		sessionNotValid([sectionActive])
		break
	default:
		errorSection([sectionActive])
		break
	}
}

// Muestra el mensaje de error cuando falló en la petición al API
function showErrorPageStatus(idElements, error){
	navigableSections = ['error-page-status'] 
	focusSection = 'error-page-status'
	fadeOutElements(idElements, '1', '0', '0.2s')
	fadeInElement(idErrorPageStatus, '0', '1', '0.3s')
	sectionErrorStatus = true
}