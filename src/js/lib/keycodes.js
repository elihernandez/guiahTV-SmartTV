function nativeEventValid(e){
	if(e.nativeEvent){
		if(pressEnter(e.nativeEvent) || e.nativeEvent.type == 'click'){
			return true
		}
	}
	return false
}

function pressEnter(e){
	if(e.keyCode == 13 || e == 13 || e == '13'){
		return true
	}

	return false
}

function pressLeft(e){
	if(e.keyCode == 37 || e.detail.direction == 'left'){
		return true
	}

	return false
}

function pressRight(e){
	if(e.keyCode == 39 || e.detail.direction == 'right'){
		return true
	}

	return false
}

function pressUp(e){
	if(e.keyCode == 38 || e.detail.direction == 'up'){
		return true
	}

	return false
}

function pressDown(e){
	if(e.keyCode == 40 || e.detail.direction == 'down'){
		return true
	}

	return false
}

function pressBack(e){
	if(e.keyCode == 461 || e.keyCode == 8 || e == 461 || e == 8 || e.keyCode == 10009){
		history.pushState(null, null, location.href)
		window.onpopstate = function () {
			history.go(1)
		}
		return true
	}
	return false
}

function clickEnter(e){
	if(e == 13 || e == '13'){
		return true
	}
    
	return false
}

function keyDownEventListenerApp(event){
	var e = event
	// console.log(e)

	if(!sectionErrorStatus){
		if(sectionLoginActive){
			pressBackOnSectionLogin(e)
		}

		if(configurationsMenuActive){
			pressBackOnConfigurationsMenu(e)
		}

		if(sectionMenuPrincipalActive && !configurationsMenuActive && !sectionLoginActive){
			pressBackOnSectionMenuPrincipal(e)
		}

		if (sectionEnVivoActive) {
			keyPressOnSectionEnVivo(e)
		}

		if (sectionALaCartaActive && !videoPlayerActive && !sectionTemporadasActive) {
			pressBackOnSectionALaCarta(e)
		}

		if (sectionZonaKidsActive && !videoPlayerActive && !sectionTemporadasActive) {
			pressBackOnSectionZonaKids(e)
		}

		if (sectionTemporadasActive && !videoPlayerActive) {
			pressBackOnSectionSeries(e)
		}

		if (videoPlayerActive) {
			keyPressOnSectionVideoPlayer(e)
		}

		if (sectionRadioActive) {
			pressBackOnSectionRadio(e)
		}
	}
}

document.addEventListener('keydown', keyDownEventListenerApp, true)