var cursorVisibilityChange

function clickMagicButtonBack(){
	if(sectionEnVivoActive){
		clearSectionEnVivo()
		getMenuPrincipal([idLoaderSpinner], false)
	}

	if (sectionALaCartaActive && !videoPlayerActive && !sectionTemporadasActive) {
		clearSectionALaCarta()
	}

	if (sectionRadioActive) {
		clearSectionRadio()
	}

	if (sectionZonaKidsActive && !videoPlayerActive && !sectionTemporadasActive) {
		clearSectionZonaKids()
	}

	if (sectionTemporadasActive && !videoPlayerActive) {
		// console.log("Series");
		pressBackOnSectionSeries(461)
	}

  if(sectionMusicaActive){
    clearSectionMusica()
  }
}

function pressMagicButtonBack(e){
	if(pressEnter(e)){
		if(sectionEnVivoActive){
			clearSectionEnVivo()
			getMenuPrincipal([idLoaderSpinner], false)
		}
  
		if (sectionALaCartaActive && !videoPlayerActive && !sectionTemporadasActive) {
			clearSectionALaCarta()
		}
  
		if (sectionRadioActive) {
			clearSectionRadio()
		}
  
		if (sectionZonaKidsActive && !videoPlayerActive && !sectionTemporadasActive) {
			clearSectionZonaKids()
		}
  
		if (sectionTemporadasActive && !videoPlayerActive) {
			// console.log("Series");
			pressBackOnSectionSeries(461)
		}

    if(sectionMusicaActive){
      clearSectionMusica()
    }
	}
}

function showMagicButtonBack(){
	if(isHidden('magic-button-back')){
		fadeInElement('magic-button-back', '0', '1', '0s')
	}
}

function hideMagicButtonBack(){
	if(isVisible('magic-button-back')){
		fadeOutElement('magic-button-back', '1', '0', '0s')
	}
}

function validateCursorStateChange(){
	showMagicButtonBack()
    
	if(cursorVisibilityChange == true){
	}
}

function handledCursorVisibilityChange(event) {
	var visibility = event.detail.visibility
	if(!sectionMenuPrincipalActive && !videoPlayerActive && !sectionLoginActive){
		fadeInElement('magic-button-back', '0', '1', '0s')
		// console.log("Se muestra boton back")
	}
	if(visibility){
		cursorVisibilityChange = true
		// if(!sectionMenuPrincipalActive && !videoPlayerActive){
		//   fadeInElement("magic-button-back", "0", "1", "0s");
		//   console.log("Se muestra boton back")
		// }
		// console.log("Cursor appeared");
		if(sectionALaCartaActive && !videoPlayerActive && !sectionTemporadasActive){
			fadeOutElement('rectangle-focus-alacarta')
		}
	}
	else{
		cursorVisibilityChange = false
		hideMagicButtonBack()
		// console.log("Cursor disappeared");
		if(sectionALaCartaActive && !videoPlayerActive && !sectionTemporadasActive){
			fadeInElement('rectangle-focus-alacarta')
		}
	}
}

document.addEventListener('cursorStateChange', handledCursorVisibilityChange, true)