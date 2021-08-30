// Variables Radio
var sectionRadioActive = null
var dataItemRadio = new Object()
var radioAudioElement
var idCatalogueRadio = 'catalogo-radio'
var idListRadio = 'list-radio'
// var idBackgroundALaCarta = 'background-alacarta';
var classFocusItemRadio = 'item-radio'
var currentRadioActive
var radioActive
var actualDataRadio
var errorRadio = false
var dragVolumeRadio = false
var mouseActiveRadio = false

function getRadio(data){
	renderRadio(data)
	renderCatalogo(data, idListRadio, idCatalogueRadio, classFocusItemRadio, true)
	radioAudioElement = document.getElementById('radio-station-audio')
	// radioAudioElement.addEventListener("abort", function(e){
	//   var element = document.getElementById(data.movie.id);
	//   var children = element.children[2];
	//   children.classList.remove("active")
	//   children.classList.remove("pause")
	//   children.classList.remove("play")
	// });
	radioAudioElement.addEventListener('playing', playingAudioRadio)
	radioAudioElement.addEventListener('error', abortAudioRadio)
	showSectionRadio()
}

function showSectionRadio(){
	focusSection = 'radio'
	fadeInElement(idRadio, '0', '1', '0.2s')
	fadeOutElements([idMenuPrincipal, idTopMenu], '1', '0', '0.2s')
	fadeOutElementDelay(idLoaderSpinner, '1', '0', '0.2s', '0.5s')
	sectionRadioActive = true
	validateCursorStateChange()
}

function keyDownItemRadio(data){
	showRadioPlayer()
	showButtons(data)
}

function showButtons(data){
	var element = document.getElementById(data.movie.id)
	var children = element.children[2]
	document.querySelector('.icons-radio-container').style.display = 'none'
	if(!currentRadioActive){
		element.children[3].style.display = ''
		document.getElementById('info-text-audio').innerHTML = ''
		document.getElementById('name-radio-audio').innerHTML = ''
		document.getElementById('img-station').src = ''
		currentRadioActive = element
		getLinkRadioStation(data)
	}else{
		if((element == currentRadioActive) && !errorRadio){
			if(radioActive){
				children.classList.add('active')
				children.classList.remove('pause')
				children.classList.add('play')
				radioActive = false
				radioAudioElement.pause()
				toogleBarsRadio()
			}else{
				children.classList.add('active')
				children.classList.remove('play')
				children.classList.add('pause')
				radioActive = true
				radioAudioElement.play()
				toogleBarsRadio()
			}
		}else{
			element.children[3].style.display = ''
			document.getElementById('info-text-audio').innerHTML = ''
			document.getElementById('name-radio-audio').innerHTML = ''
			document.getElementById('img-station').src = ''
			children = currentRadioActive.children[2]
			children.classList.remove('active')
			children.classList.remove('pause')
			children.classList.remove('play')
			currentRadioActive = element
			getLinkRadioStation(data)
		}
	}
}

function clickButtonsRadio(e){
	var data = e.currentTarget.offsetParent.offsetParent.attributes.data.value
	showButtons(JSON.parse(unescape(data)))
}

function focusItemRadio(data){
	changeCountCategory(data)
	showInfoRadio(data)
}

function showInfoRadio(data){
	document.getElementById('name-radio').innerHTML = data.movie.Title
	document.getElementById('description-radio').innerHTML = data.movie.Description
}

function getLinkRadioStation(data){
	actualDataRadio = data
	$.ajax({
		url: urlGetApi+'cmd/getLinkLeon/'+data.movie.Registro+'/'+suscriberId,
		success: function(response) {
			// document.getElementById("radio-bars").style.display = "block"
			if((response.Url).includes('m3u8')){
				hls = new Hls()
				hls.detachMedia()
				hls.attachMedia(radioAudioElement)
				hls.on(Hls.Events.MEDIA_ATTACHED, function () {
					hls.loadSource(response.Url)
					hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) { 
            radioActive = true
					})
				})
			}else{
				radioAudioElement.src = response.Url
        radioActive = true
			}
		},
		error: function() {
			abortAudioRadio()
		}
	})
}

function toogleBarsRadio(){
	// if(isVisible("radio-bars")){
	//   document.getElementById("radio-bars").style.display = "none"
	// }else{
	//   document.getElementById("radio-bars").style.display = "block"
	// }
}

function pressBackOnSectionRadio(e){
	if(pressBack(e)){
		clearSectionRadio()
	}
}

function showRadioPlayer(){
	var radioPlayer = document.getElementById('radio-player')
	if(radioPlayer.style.opacity == 0){
		fadeInTranslateXElement('radio-player', '0', '1', '.5s', '-50', '0', '.5s')
	}
}

function playingAudioRadio(){
	errorRadio = false
	var data = actualDataRadio
	document.querySelector('.icons-radio-container').style.display = ''
	var element = document.getElementById(data.movie.id)
	element.children[3].style.display = 'none'
	element.children[2].classList.add('active')
	element.children[2].classList.add('pause')
	document.getElementById('info-text-audio').innerHTML = 'Ahora suena:'
	document.getElementById('name-radio-audio').innerHTML = data.movie.Title
	document.getElementById('img-station').src = data.movie.HDPosterUrlLandscape
}

function abortAudioRadio(){
	errorRadio = true
	var data = actualDataRadio
	var element = document.getElementById(data.movie.id)
	element.children[3].style.display = 'none'
	document.getElementById('info-text-audio').innerHTML = 'Ocurrió un problema al reproducir:'
	document.getElementById('name-radio-audio').innerHTML = data.movie.Title
}

// Se limpia la sección de A La Carta
function clearSectionRadio(){
	if(actualDataRadio != undefined){
		var data = actualDataRadio
		var element = document.getElementById(data.movie.id)
		element.children[3].style.display = 'none'
		element.children[2].classList.remove('active')
		element.children[2].classList.remove('pause')
		element.children[2].classList.remove('play')
	}
	fadeInElement(idLoaderSpinner, '0', '1', '0.2s')
	radioAudioElement.pause()
	radioActive = false
	fadeOutElement(idRadio, '1', '0', '0.2s')
	fadeOutElement('radio-player', '1', '0', '0.2s')
	getMenuPrincipal([idLoaderSpinner], false)
	sectionRadioActive = null
	hideMagicButtonBack()
}

document.getElementById('radio').addEventListener('mousemove', function(e){
	if(dragVolumeRadio){
		mouseActiveRadio = true
		updateVolumeRadio(e)  
	}

	toogleProgressVolumeRadio(e)
})

document.getElementById('radio').addEventListener('mouseup', function(){
	dragVolumeRadio = false
})

function toogleProgressVolumeRadio(e){
	var element = e.target
	if(element.classList.contains('icons-radio-container') || element.classList.contains('fa-volume-down') || element.classList.contains('fa-volume-up') || element.classList.contains('fa-volume-mute') || element.classList.contains('container-volume-radio') || element.classList.contains('content-volume-radio') || element.classList.contains('progress-volume-radio') || element.classList.contains('current-volume-radio') || element.classList.contains('drop-volume-radio') || element.classList.contains('container')){
    
	}else{
		if(isVisible('container-volume-radio')){
			fadeOutElement('container-volume-radio', '1', '0', '0.15s')
		}
	}
}

function activateVolumeChangeRadio(e){
	dragVolumeRadio = true
	updateVolumeRadio(e)
}

function updateVolumeRadio(e){
	var element = document.getElementById('progress-volume-radio')
	var eInner = document.getElementById('current-volume-radio')
	var offsetTop = document.getElementById('radio-player').offsetTop
	offsetTop = offsetTop + document.getElementById('progress-volume-radio').offsetTop
	offsetTop = offsetTop + document.querySelector('.icons-radio-container').offsetTop
	var height = (4  * document.querySelector('.icons-radio-container').clientHeight)
	offsetTop = offsetTop - height
	var y = e.clientY
	var clientHeight = element.clientHeight
	var offset = offsetTop
	var position = y - offset
	var percentage = 100 * position / clientHeight
	percentage = 100 - percentage

	if (percentage >= 100) {
		percentage = 100
	}

	if (percentage <= 0) {
		percentage = 0
		document.getElementById('icon-volume-radio').classList.remove('fa-volume-down')
		document.getElementById('icon-volume-radio').classList.add('fa-volume-mute')
	}

	if (percentage > 0 && percentage < 50) {
		document.getElementById('icon-volume-radio').classList.remove('fa-volume-mute')
		document.getElementById('icon-volume-radio').classList.remove('fa-volume-up')
		document.getElementById('icon-volume-radio').classList.add('fa-volume-down')
	}

	if (percentage >= 50) {
		document.getElementById('icon-volume-radio').classList.remove('fa-volume-down')
		document.getElementById('icon-volume-radio').classList.add('fa-volume-up')
	}

	radioAudioElement.volume = (percentage / 100)
	eInner.style.height = percentage +'%'
}