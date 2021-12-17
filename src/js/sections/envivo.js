// Variables globales de la sección Tv en vivo
var sectionEnVivoActive = null,
	channel = new Object,
	dataItemEnVivo = new Object(),
	firstChannel = null,
	lastSectionTv = null,
	lastChannelTv = null,
	watchingChannel = false,
	videoEnVivo,
	guideTvEnVivo = 'guide-tvenvivo',
	guideTvEnVivoContainer = 'guide-tvenvivo-container',
	spinnerChannel = '#envivo .loader-spinner-channel',
	spinnerGuide = '#envivo .loader-spinner-guide',
	messageFailedChannel = '#envivo .message-failed-channel',
	errorLoaderChannel = 'error-loader-channel',
	errorNetworkChannel = 'error-network-channel',
	idBackgroundEnVivoOpacity = 'background-envivo-opacity',
	idPreviewPosterEnVivo = 'preview-poster-envivo',
	idTitleChannelLiveTv = 'title-channel-livetv',
	idLoaderSpinnerLiveTv = 'loader-spinner-livetv',
	timeHideGuide,
	fadeGuide = null,
	timeoutChannel = null,
	timeoutLoaderChannel,
	timeToStartInterval = null,
	validateEventLiveInterval = null,
	hlsLiveTv,
	urlChannel,
	videoLiveTv = document.getElementById('sourceVideoEnVivo')


// Función para abrir Tv en vivo
function getEnVivo(response) {
	sectionEnVivoActive = true
	renderEnvivo()
	renderGuideEnVivo(response)
	showEnVivo()
	listenersEnVivo()
	fadeInElement(idEnVivo, '0', '1', '0.1s')
	fadeOutElementDelay(idLoaderSpinner, '1', '0', '0.2s', '0.5s')
}

function canPlayLiveTV(){
	watchingChannel = true
	fadeOutElement(idLoaderSpinnerLiveTv, '1', '0', '0.3s')
	clearTimeout(timeoutChannel)
	hideGuide()
}

function onErorLiveTV(){
	watchingChannel = false
	clearVideoEnVivo()
	fadeInElement(errorLoaderChannel, '0', '1', '0s')
}

function onWaitingLiveTV(){
	watchingChannel = false
	showLoaderChannel()
	onErrorChannel()
}

function listenersEnVivo(){
	videoLiveTv = document.getElementById('sourceVideoEnVivo')

	// Función que muestra el spinner cuando el video se detiene
	// videoLiveTv.onwaiting = function() {
	//   watchingChannel = false;
	//   showLoaderChannel();
	//   onErrorChannel();
	// }; 

	videoLiveTv.addEventListener('waiting', onWaitingLiveTV)
	videoLiveTv.addEventListener('canplay', canPlayLiveTV)
	videoLiveTv.addEventListener('error', onErorLiveTV)
  
	// Función que muestra el spinner de carga hasta que se inicia el video
	// videoLiveTv.oncanplay = function() {
	//   watchingChannel = true;
	//   console.log("antes")
	//   fadeOutElement(idLoaderSpinnerLiveTv, "1", "0", "0.3s");
	//   console.log("despues")
	//   clearTimeout(timeoutChannel);
	//   hideGuide();
	// }; 
  
	// Función que muestra un mensaje de error en caso de haberlo en el video
	// videoLiveTv.onerror = function(error) {
	//   watchingChannel = false;
	//   clearVideoEnVivo();
	//   fadeInElement(errorLoaderChannel, "0", "1", "0s")
	// }
}

// Función para mostrar la vista e iniciar variables
function showEnVivo(){
	timeHideGuide = isWebBrowser() ? 300000 : 10000
	timeoutLoaderChannel = isWebBrowser() ? 30000 : 45000
	navigableSections = ['liveTvTabContent', 'liveTvTab'] 
	focusSection = 'liveTvTabContent'
	showGuideEnVivo()
	showTabActive()
	channelPressed(firstChannel)
	getInfoChannel(firstChannel)
}

// Muestra la guía Live TV
function showGuideEnVivo(){
	fadeInNameChannel()
	fadeInElement('extras-tizen-tv', '0', '1', '0.3s')
	fadeInLiveTvGuide()
	validateCursorStateChange()
}

// Oculta el nombre del canal que se está viendo
function fadeOutNameChannel(){
	if(isVisible(idTitleChannelLiveTv)){
		var element = document.getElementById(idTitleChannelLiveTv)
		transition.begin(element, [
			//  ["transform", "translateY(0)", "translateY(-50px)", ".3s", "ease-in-out"], 
			['opacity', '1', '0', '0s']
		], {
			onBeforeChangeStyle: function(element) {
			},
			onTransitionEnd: function(element, finished) {
				if (!finished) return
				element.style.display = 'none'
			}
		})
	}
}

// Muestra el nombre del canal que se está viendo
function fadeInNameChannel(){
	if(isHidden(idTitleChannelLiveTv)){
		var element = document.getElementById(idTitleChannelLiveTv)
		transition.begin(element, [
			['opacity', '0', '1', '0s'],
			// ["transform", "translateY(-50px)", "translateY(0)", ".3s", "ease-in-out"]
		], {
			onBeforeChangeStyle: function(element) {
				element.style.display = ''
			},
			onTransitionEnd: function(element, finished) {
				if (!finished) return
			}
		})
	}
}

// Se muestra el tab activo de la guía
function showTabActive(){
	// $('#liveTvTabContent').children().each(function () {
	// 	var id = $(this).attr('id')
	// 	$('#'+id+'').removeClass('active in')
	// })
	$('#'+lastSectionTv+' a').tab('show')
	// var tabShow = lastSectionTv.slice(2)
	// $('#'+tabShow+'').addClass('active')
}

function fadeInLiveTvGuide(){
	fadeInElement(guideTvEnVivo, '0', '1', '0.3s')
	var element = document.getElementById(guideTvEnVivoContainer)
	transition.begin(element, [
		['opacity', '0', '1', '0.3s'],
		// ["transform", "translateY(50px)", "translateY(0)", ".3s", "ease-in-out"]
	], {
		onBeforeChangeStyle: function(element) {
			element.style.display = ''
			$('#'+lastChannelTv+'').focus()
		},
		onTransitionEnd: function(element, finished) {
			if (!finished) return
		}
	})
}

// Función que se ejecuta al presionar cualquier tecla en el canal
function channelPressed(data) {
	clearVideoEnVivo()
	showLoaderChannel()
	clearInterval(validateEventLiveInterval)
	if(isEvent(data.canal.ContentType)){
		if(isLive(data)){
			showTitleChannelLiveTv(data)
			if(isVisible(idPreviewPosterEnVivo)){
				fadeOutElement(idPreviewPosterEnVivo, '1', '0', '0s')
			}
			if(isVisible(errorLoaderChannel)){
				fadeOutElement(errorLoaderChannel, '1', '0', '0s')
			}
			if(isVisible(errorNetworkChannel)){
				fadeOutElement(errorNetworkChannel, '1', '0', '0s')
			}
			getLinkLiveTv(data.canal.SignalID)
		}else{
			if(isVisible(errorLoaderChannel)){
				fadeOutElement(errorLoaderChannel, '1', '0', '0s')
			}
			if(isVisible(errorNetworkChannel)){
				fadeOutElement(errorNetworkChannel, '1', '0', '0s')
			}
			showTimeToStartEventLiveTv(data)
			showPreviewPoster(data)
			validateEventLive(data)
		}
	}else{
		showTitleChannelLiveTv(data)
		if(isVisible(idPreviewPosterEnVivo)){
			fadeOutElement(idPreviewPosterEnVivo, '1', '0', '0s')
		}
		if(isVisible(errorLoaderChannel)){
			fadeOutElement(errorLoaderChannel, '1', '0', '0s')
		}
		if(isVisible(errorNetworkChannel)){
			fadeOutElement(errorNetworkChannel, '1', '0', '0s')
		}
		getLinkLiveTv(data.canal.SignalID)
	}
	lastChannelTv = data.canal.lastChannelTv
	lastSectionTv = data.categoria.id
}

function validateEventLive(data){
	validateEventLiveInterval = setInterval(function(){
		clearTimeout(timeoutChannel)
		if(isLive(data)){
			showLoaderChannel()
			showTitleChannelLiveTv(data)
			if(isVisible(idPreviewPosterEnVivo)){
				fadeOutElement(idPreviewPosterEnVivo, '1', '0', '0s')
			}
			if(isVisible(errorLoaderChannel)){
				fadeOutElement(errorLoaderChannel, '1', '0', '0s')
			}
			if(isVisible(errorNetworkChannel)){
				fadeOutElement(errorNetworkChannel, '1', '0', '0s')
			}
			clearInterval(validateEventLiveInterval)
			getLinkLiveTv(data.canal.SignalID)
		}else{
			showTimeToStartEventLiveTv(data)
		}
	}, 5000)
}

function showTitleChannelLiveTv(data){
	clearInterval(timeToStartInterval)
	renderTitleChannelLiveTv(data)
	fadeInNameChannel()
}

function showTimeToStartEventLiveTv(data){
	renderTimeToStartEventLiveTv(data)
	fadeInNameChannel()
}

function isEvent(string){
	if(string.includes('Event') || string.includes('event')){
		return true
	}

	return false
}

function isLive(data){
	if(moment().isSameOrAfter(data.canal.Inicio) && moment().isSameOrBefore(data.canal.Fin)){
		return true
	}

	return false
}

// Función para imprimir en HTML la guía
function drawEnVivo(response, callback){
	var append = ''
	append = append + '<div class="container-cont">' +
    '<h4 class="index-channel"></h4>' +
    '<h4 class="text-channel-cont"></h4>' +
    '<h4 class="total-channels"></h4>' +
    '</div>'
	append = append + '<ul class="nav nav-tabs" id="liveTvTab" role="tablist">'
	response.forEach( function(categoria, indice) {
		dataItemEnVivo['categoria'] = categoria
		if(!lastSectionTv && categoria.cmData.length && indice <= 1){
			lastSectionTv = 'litvenvivo-' + indice
			// console.log(lastSectionTv);
		}
		append = append + 
          '<li class="nav-item" id="litvenvivo-'+indice+'">' +
            '<a class="nav-link envivo-item" tabindex="-1" id="'+indice+'" data-toggle="tab" href="#tvenvivo-'+indice+'" role="tab" aria-controls="tvenvivo-'+indice+'" aria-selected="true">' +
              '<h5>'+ dataItemEnVivo['categoria'].category +'</h5>'+
            '</a>' +
          '</li>'
	})
	append = append + '</ul>'
	append = append + '<div class="tab-content" id="liveTvTabContent">'
	response.forEach( function(categoria, indice) {
		dataItemEnVivo['categoria'] = categoria
		dataItemEnVivo['categoria']['id'] = 'litvenvivo-'+indice
		dataItemEnVivo['categoria']['directionsId'] = 'direction-icons-litvenvivo-'+indice
		var indiceCategoria = indice
		if (indice == 0) {
			var firstCategoria = indice
		}
		append = append +'<div class="tab-pane fade" id="tvenvivo-'+indice+'" role="tabpanel" aria-labelledby="tvenvivo-'+indice+'-tab">'
		append = append + 
      '<div id="direction-icons-litvenvivo-'+indice+'" class="directions-icons">'+
        '<div class="contenedor">'+
        '<span class="chevron-left"><i class="fas fa-chevron-left"></i></span>'+
        '<span class="chevron-right"><i class="fas fa-chevron-right"></i></span>'+
        '</div>'+
      '</div>'
		if(categoria.cmData.length){
			append = append +'<ul class="list-channels">'
			categoria.cmData.forEach( function(canal, indice) {
				dataItemEnVivo['canal'] = canal
				dataItemEnVivo['canal']['indexChannel'] = indice + 1
				dataItemEnVivo['canal']['totalChannels'] = categoria.cmData.length
				dataItemEnVivo['canal']['lastChannelTv'] = 'tvenvivo-'+indiceCategoria+'-'+indice
				if (!firstChannel && indice == 0) {
					firstChannel = canal.Url
					document.getElementById('info-name-channel').innerText = canal.Name
				}
				var channel = escape(JSON.stringify(dataItemEnVivo))
				append = append + 
            '<li class=\'item channel-item\' id=\'tvenvivo-'+indiceCategoria+'-'+indice+'\' tabindex=\'-1\' data-sn-up=\'#'+indiceCategoria+'\'    onclick=\'channelPressed(13, '+ '"' + channel + '"' + ')\' onkeydown=\'channelPressed(event, '+ '"' + channel + '"' + ')\' onfocus=\'itemChannelFocus(event, '+ '"' + channel + '"' + ')\'>' +
              '<img src="'+dataItemEnVivo['canal'].Poster +'">' +
              '<div class="info-channel">' +
                '<h3 class="fw-500">'+dataItemEnVivo['canal'].Name +'</h3>'
				if(categoria == 0){
					append = append + '<h4 class="fw-500">'+getEventTime(canal)+'</h4>'
				}
				append = append + '<h5 class="fw-400">'+dataItemEnVivo['canal'].Description +'</h5>' +
              '</div>' +
            '</li>'
			})
		}else{
			append = append +'<ul class="list-channels empty">'
			append = append + '<li>No hay eventos en vivo por el momento</li>'
		}
		append = append + '</ul>'  
		append = append + '</div>'  
	})
	append = append + '</div>'
	document.getElementById(guideTvEnVivoContainer).innerHTML += append 
	return callback()
}

// Función de tiempo para ocultar la guía
function hideGuide(){
	clearTimeout(fadeGuide)
	fadeGuide = setTimeout(function(){
		fadeOutGuideTvEnVivoContainer(guideTvEnVivoContainer)
		fadeOutElement(guideTvEnVivo, '1', '0', '0.3s')
		fadeOutElement('extras-tizen-tv', '1', '0', '0.3s')
		// fadeOutElement(idBackgroundEnVivoOpacity, "1", "0", "0.3s");
		fadeOutNameChannel()     
		hideMagicButtonBack()
		mouseActive = false
	}, timeHideGuide)
}

function keyDownOnChannelEnVivo(e){
	if(pressEnter(e.nativeEvent)){
		var data = dataElement(e.nativeEvent)
		showLoaderChannel()
		channelPressed(data)
		getInfoChannel(data)
	}
}

function clickOnChannelLiveTv(e){
	if(pressEnter(13)){
		var data = dataOffsetParent(e.nativeEvent)
		showLoaderChannel()
		channelPressed(data)
		getInfoChannel(data)
	}
}

function showInfoChannel(e){
	if(e.type == 'click' || e == 13){
		fadeInElement('more-info-channel', '0', '1', '0.3s')
	}
}

function hideInfoChannel(e){
	if(e.type == 'click' || e == 13){
		fadeOutElement('more-info-channel', '1', '0', '0.3s')
	}
}

function showPreviewPoster(data){
	document.getElementById('preview-poster-image').src = ''
	document.getElementById('preview-poster-image').src = data.canal.PreviewPoster
	if(isHidden(idPreviewPosterEnVivo)){
		fadeInElement(idPreviewPosterEnVivo, '0', '1', '0.3s')
	}
	fadeOutElement(idLoaderSpinnerLiveTv, '1', '0', '0.1s')
}

function fadeOutGuideTvEnVivoContainer(fadeOutElement){
	var element = document.getElementById(fadeOutElement)
	transition.begin(element, [
		//  ["transform", "translateY(0)", "translateY(50px)", ".3s", "ease-in-out"], 
		['opacity', '1', '0', '.3s']
	], {
		onBeforeChangeStyle: function(element) {
		},
		onTransitionEnd: function(element, finished) {
			if (!finished) return
			element.style.display = 'none'
			// clearView(fadeOutElement, true);
		}
	})
}

// Función para refrescar la guía cada vez que se oculte
function refreshGuideEnVivo(callback) {
	var utcOffset = getUtcOffsetLocal()
	// utcOffset = "UTC2"
	$.ajax({
		url: urlGetApi+'cmdata/leon/livetvplus/'+suscriberId+'/'+utcOffset,
		success: function(response) {
			renderGuideEnVivo(response)
			showTabActive()
			return callback()
		},
		error: function() {
			// console.log("No se ha podido obtener la información");
		}
	})
}

function isM3U8(str){
	return str.includes('m3u8')
}

function getLinkLiveTv(signalId){
	$.ajax({
		url: urlGetApi+'cmd/getLinkLiveTV/'+signalId+'/'+suscriberId,
		success: function(response) {
			if(isM3U8(response.Url)){
				showChannelEnVivo(response.Url)
			}else{
				videoLiveTv.src = response.Url
				videoLiveTv.addEventListener('canplay',function() {
					videoLiveTv.play()
					if(isHidden('videoEnVivo')){
						fadeInElement('videoEnVivo', '0', '1', '0.1s')
					}
				})
			}
			// if(validateStatusCode(response, idEnVivo)){
			//   if(response.StatusCode == 3){
			//     videoLiveTv.src = response.Url;
			//     console.log("Hola2")
			//     videoLiveTv.play();
			//     videoLiveTv.addEventListener('canplay',function() {
			//       console.log("Hola")
			//       videoLiveTv.play();
			//       fadeInElement("videoEnVivo", "0", "1", "0.1s");
			//     });
			//   }else{
			//     showChannelEnVivo(response.Url);
			//   }
			//   showChannelEnVivo(response.Url);
			// }else{
			//   clearSectionEnVivo();
			// }
		},
		error: function() {
			// console.log(response);
			clearVideoEnVivo()
			fadeOutElement(idPreviewPosterEnVivo, '1', '0', '0s')
			fadeOutElement(idLoaderSpinner, '1', '0', '0.1s')
			fadeInElement(errorLoaderChannel, '0', '1', '0s')
			fadeOutNameChannel()
		}
	})
}

// Función para mostrar el canal seleccionado
function showChannelEnVivo(url){
	if(url){
		if(isHidden('videoEnVivo')){
			fadeInElement('videoEnVivo', '0', '1', '0.1s')
		}
		if(Hls.isSupported()){
			hlsLiveTv = new Hls()
			hlsLiveTv.attachMedia(videoLiveTv)
			hlsLiveTv.on(Hls.Events.MEDIA_ATTACHED, function () {
				hlsLiveTv.loadSource(url)
				hlsLiveTv.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
					videoLiveTv.play()
					document.getElementById('icon-volume-livetv').classList.remove('fa-volume-mute')
					document.getElementById('icon-volume-livetv').classList.remove('fa-volume-up')
					document.getElementById('icon-volume-livetv').classList.add('fa-volume-down')
					videoLiveTv.volume = 0.4
					document.getElementById('current-volume-livetv').style.height = '40%' 
				})
			})
			hlsLiveTv.on(Hls.Events.ERROR, function(event, data){
				// console.log(event)
				// console.log(data)
				if(data.details == 'manifestLoadError'){
					validateErrorHlsLiveTv()
				}
			})
		}
	}
}

function validateErrorHlsLiveTv(){
	if(validateNetwork() === null){
		showErrorChannel()
	}else{
		if(validateNetwork()){
			showErrorChannel()
		}else{
			reconectNetworkLiveTv()
			showErrorNetkworkChannel()
		}
	}
	// console.log(validateNetwork());
}

var timeIntervalReconectNetwork = null

function reconectNetworkLiveTv(){
	clearTimeout(timeIntervalReconectNetwork)
	timeIntervalReconectNetwork = setTimeout(function(){
		if(validateNetwork()){
			clearTimeout(timeIntervalReconectNetwork)
			fadeOutElement(errorNetworkChannel, '1', '0', '0s')
			fadeInElement('videoEnVivo', '0', '1', '0.1s')
			fadeInElement(idLoaderSpinnerLiveTv, '0', '1', '0.1s')
			hlsLiveTv.startLoad()
			videoLiveTv.play()
		}else{
			reconectNetworkLiveTv()
		}
	}, 5000)
}

// Función que inicializa el video
function clearVideoEnVivo(){
	if(hlsLiveTv !== undefined){
		hlsLiveTv.stopLoad()
		hlsLiveTv.destroy()
		watchingChannel = false
		clearTimeout(fadeGuide)
	}
}

// Función de tiempo que muestra un error en pantalla en caso de haber fallo al cargar el canal
function onErrorChannel(){
	clearTimeout(timeoutChannel)
	timeoutChannel = setTimeout(function() {
		validateErrorHlsLiveTv()
		// console.log("Timeout channel");
	}, timeoutLoaderChannel)
}

function showErrorChannel(){
	hlsLiveTv.stopLoad()
	fadeOutElement('videoEnVivo', '1', '0', '0.1s')
	fadeOutElement(idPreviewPosterEnVivo, '1', '0', '0s')
	fadeOutElement(errorNetworkChannel, '1', '0', '0s')
	fadeOutElement(idLoaderSpinnerLiveTv, '1', '0', '0.1s')
	fadeInElement(errorLoaderChannel, '0', '1', '0s')
	fadeOutNameChannel()
}

function showErrorNetkworkChannel(){
	hlsLiveTv.stopLoad()
	fadeOutElement('videoEnVivo', '1', '0', '0.1s')
	fadeOutElement(idPreviewPosterEnVivo, '1', '0', '0s')
	fadeOutElement(idLoaderSpinnerLiveTv, '1', '0', '0.1s')
	fadeOutElement(errorLoaderChannel, '1', '0', '0.1s')
	fadeInElement(errorNetworkChannel, '0', '1', '0s')
	fadeOutNameChannel()
}

// Muestra el loader mientras se carga el canal 
function showLoaderChannel(){
	if(isHidden(idLoaderSpinnerLiveTv)){
		fadeInElement(idLoaderSpinnerLiveTv, '0', '1', '0.1s')
	}
}

// Función que se ejecuta cuando un canal recibe el foco
function focusOnChannelLiveTv(e, data) {
	var data = dataElement(e.nativeEvent)
	var indexChannel = data.canal.indexChannel
	var totalChannels = data.canal.totalChannels
	// if(indexChannel == 1){
	//   $("#"+dataChannel.categoria.directionsId+" .chevron-left").css("opacity", "0");
	//   $("#"+dataChannel.categoria.directionsId+" .chevron-right").css("opacity", "1");
	// } else if(indexChannel == totalChannels){
	//   $("#"+dataChannel.categoria.directionsId+" .chevron-left").css("opacity", "1");
	//   $("#"+dataChannel.categoria.directionsId+" .chevron-right").css("opacity", "0");
	// }else{
	//   $("#"+dataChannel.categoria.directionsId+" .chevron-left").css("opacity", "1");
	//   $("#"+dataChannel.categoria.directionsId+" .chevron-right").css("opacity", "1");
	// }
	$('#envivo .index-channel').html(indexChannel)
	$('#envivo .text-channel-cont').html('de')
	$('#envivo .total-channels').html(totalChannels)
}

// Función que limpia la vista y las variables
function clearSectionEnVivo(){
	sectionEnVivoActive = false
	fadeInElement(idLoaderSpinner, '0', '1', '0.1s')
	hideMagicButtonBack()
	clearVideoEnVivo()
	clearTimeout(timeIntervalReconectNetwork)
	if(isVisible(errorLoaderChannel)){
		fadeOutElement(errorLoaderChannel, '1', '0', '0.1s')
	}
	if(isVisible(errorNetworkChannel)){
		fadeOutElement(errorNetworkChannel, '1', '0', '0.1s')
	}
	if(isVisible(idPreviewPosterEnVivo)){
		fadeOutElement(idPreviewPosterEnVivo, '1', '0', '0.1s')
	}
	fadeOutElement(idEnVivo, '1', '0', '0.3s')
	firstChannel = null
	lastSectionTv = null
	lastChannelTv = null
}

function keyPressOnSectionEnVivo(e){
	if(e.keyCode == 403 || e.keyCode == 73){
		if(isHidden('more-info-channel')){
			showInfoChannel(13)
		}
	}else{
		if (pressBack(e)) {  
			if(isVisible('more-info-channel')){
				hideInfoChannel(13)
			}else{
				if(isVisible(guideTvEnVivoContainer)){
					fadeOutGuideTvEnVivoContainer(guideTvEnVivoContainer)  
					fadeOutElement(guideTvEnVivo, '1', '0', '0.3s')
					fadeOutElement('extras-tizen-tv', '1', '0', '0.3s')
					fadeOutNameChannel(idTitleChannelLiveTv) 
					// fadeOutElement(idBackgroundEnVivoOpacity, "1", "0", "0.3s");
					hideMagicButtonBack()
					mouseActive = false
				}else{
					clearSectionEnVivo()
					getMenuPrincipal([idLoaderSpinner], false)
				}
			}
		}else{
			if (isVisible(guideTvEnVivoContainer)) {
				if(watchingChannel){
					hideGuide()
				}
			}else{
				refreshGuideEnVivo(function(){
					showGuideEnVivo()
				})
				if(watchingChannel){
					hideGuide()
				}
			}
		}
	}
  
}

var mouseActive = false
document.getElementById('envivo').addEventListener('mousemove', function(e){
	if (isVisible(guideTvEnVivoContainer)) {
		if(watchingChannel){
			hideGuide()
		}
	}else{
		refreshGuideEnVivo(function(){
			if(!mouseActive){
				mouseActive = true
				showGuideEnVivo()
			}
		})
    
		if(watchingChannel){
			hideGuide()
		}
	}

	if(dragVolumeLiveTv){
		mouseActive = true
		updateVolumeLiveTv(e)  
	}

	toogleProgressVolumeLiveTv(e)
})

document.getElementById('envivo').addEventListener('touchmove', function(e){
	if (isVisible(guideTvEnVivoContainer)) {
		if(watchingChannel){
			hideGuide()
		}
	}else{
		refreshGuideEnVivo(function(){
			if(!mouseActive){
				mouseActive = true
				showGuideEnVivo()
			}
		})
    
		if(watchingChannel){
			hideGuide()
		}
	}
})

document.getElementById('envivo').addEventListener('dblclick', function(){
	toggleFullScreenLiveTv()
})

document.getElementById('envivo').addEventListener('click', function(e){
	if(isVisible(guideTvEnVivoContainer)){
		if(e.target == document.getElementById('guide-tvenvivo')) {
			fadeOutGuideTvEnVivoContainer(guideTvEnVivoContainer)  
			fadeOutElement(guideTvEnVivo, '1', '0', '0.3s')
			fadeOutNameChannel(idTitleChannelLiveTv) 
			hideMagicButtonBack()
			mouseActive = false
		}
	}else{
		refreshGuideEnVivo(function(){
			showGuideEnVivo()
			hideGuide()
		})
	}
})

var dragVolumeLiveTv = false
document.getElementById('envivo').addEventListener('mouseup', function(){
	dragVolumeLiveTv = false
})

function fullScreenVideoLiveTv(){
	toggleFullScreenLiveTv()
}

function toggleFullScreenLiveTv() {
	var elem = document.documentElement
	if (!document.fullscreenElement) {
		if (!document.fullscreenElement) {
			elem.requestFullscreen()
			document.getElementById('icon-full-screen-livetv').classList.remove('fa-expand')
			document.getElementById('icon-full-screen-livetv').classList.add('fa-compress')
		} else if (!document.webkitRequestFullscreen) { /* Safari */
			elem.webkitRequestFullscreen()
			document.getElementById('icon-full-screen-livetv').classList.remove('fa-expand')
			document.getElementById('icon-full-screen-livetv').classList.add('fa-compress')
		} else if (!document.msRequestFullscreen) { /* IE11 */
			elem.msRequestFullscreen()
			document.getElementById('icon-full-screen-livetv').classList.remove('fa-expand')
			document.getElementById('icon-full-screen-livetv').classList.add('fa-compress')
		}
	}else{
		if(document.fullscreenElement){
			if (document.exitFullscreen) {
				document.exitFullscreen()
				document.getElementById('icon-full-screen-livetv').classList.remove('fa-compress')
				document.getElementById('icon-full-screen-livetv').classList.add('fa-expand')
			} else if (document.webkitExitFullscreen) { /* Safari */
				document.webkitExitFullscreen()
				document.getElementById('icon-full-screen-livetv').classList.remove('fa-compress')
				document.getElementById('icon-full-screen-livetv').classList.add('fa-expand')
			} else if (document.msExitFullscreen) { /* IE11 */
				document.msExitFullscreen()
				document.getElementById('icon-full-screen-livetv').classList.remove('fa-compress')
				document.getElementById('icon-full-screen-livetv').classList.add('fa-expand')
			}
		}
	}
  
}

function openFullscreen() {
	var elem = document.documentElement
	if (elem.requestFullscreen) {
		elem.requestFullscreen()
	} else if (elem.webkitRequestFullscreen) { /* Safari */
		elem.webkitRequestFullscreen()
	} else if (elem.msRequestFullscreen) { /* IE11 */
		elem.msRequestFullscreen()
	}
	document.getElementById('icon-full-screen-livetv').classList.remove('fa-expand')
	document.getElementById('icon-full-screen-livetv').classList.add('fa-compress')
}

function closeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen()
	} else if (document.webkitExitFullscreen) { /* Safari */
		document.webkitExitFullscreen()
	} else if (document.msExitFullscreen) { /* IE11 */
		document.msExitFullscreen()
	}
	document.getElementById('icon-full-screen-livetv').classList.remove('fa-compress')
	document.getElementById('icon-full-screen-livetv').classList.add('fa-expand')
}

function toogleProgressVolumeLiveTv(e){
	var element = e.target
	if(element.classList.contains('icons-live-container') || element.classList.contains('fa-volume-down') || element.classList.contains('fa-volume-up') || element.classList.contains('fa-volume-mute') || element.classList.contains('container-volume-livetv') || element.classList.contains('content-volume-livetv') || element.classList.contains('progress-volume-livetv') || element.classList.contains('current-volume-livetv') || element.classList.contains('drop-volume-livetv') || element.classList.contains('container')){
    
	}else{
		if(isVisible('container-volume-livetv')){
			fadeOutElement('container-volume-livetv', '1', '0', '0.15s')
		}
	}
}

function activateVolumeChangeLiveTv(e){
	dragVolumeLiveTv = true
	updateVolumeLiveTv(e)
}

function updateVolumeLiveTv(e){
	var element = document.getElementById('progress-volume-livetv')
	var eInner = document.getElementById('current-volume-livetv')
	var offsetTop = document.getElementById('guide-tvenvivo-container').offsetTop
	offsetTop = offsetTop + document.getElementById('progress-volume-livetv').offsetTop
	var height = (3 * document.querySelector('.icons-live-container').clientHeight)
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
		document.getElementById('icon-volume-livetv').classList.remove('fa-volume-down')
		document.getElementById('icon-volume-livetv').classList.add('fa-volume-mute')
	}

	if (percentage > 0 && percentage < 50) {
		document.getElementById('icon-volume-livetv').classList.remove('fa-volume-mute')
		document.getElementById('icon-volume-livetv').classList.remove('fa-volume-up')
		document.getElementById('icon-volume-livetv').classList.add('fa-volume-down')
	}

	if (percentage >= 50) {
		document.getElementById('icon-volume-livetv').classList.remove('fa-volume-down')
		document.getElementById('icon-volume-livetv').classList.add('fa-volume-up')
	}

	videoLiveTv.volume = (percentage / 100)
	eInner.style.height = percentage +'%'
}

function moveRightCatalogueLiveTV(e){
	var listId = e.currentTarget.attributes.listId.value
	var currentRow = parseInt(e.currentTarget.attributes.currentRow.value)
	var numRows = e.currentTarget.attributes.numRows.value
	var leftDirectionId = e.currentTarget.attributes.leftdirectionid.value
	var rightDirectionId = e.currentTarget.attributes.rightdirectionid.value
	var element = document.getElementById(listId)
	if(currentRow < numRows){
		var positionBefore = 90 * (currentRow-1)
		var positionAfter = 90 * currentRow
		transition.begin(element, [
			['transform', 'translateX(-'+positionBefore+'%)', 'translateX(-'+positionAfter+'%)', '.7s', 'ease-in-out'],], {
			onBeforeChangeStyle: function() {
				currentRow = currentRow + 1
				var leftDirection = document.getElementById(leftDirectionId)
				leftDirection.setAttribute('currentRow', currentRow)
				var rightDirection = document.getElementById(rightDirectionId)
				rightDirection.setAttribute('currentRow', currentRow)
				if(currentRow == numRows){
					rightDirection.style.display = 'none'
				}
  
				if(currentRow > 1){
					leftDirection.style.display = ''
				}
			},
			onAfterChangeStyle: function(){
			},
			onTransitionEnd: function(finished) {
				if (!finished || stop) return
			}
		})
	}
}

function moveLeftCatalogueLiveTV(e){
	var listId = e.currentTarget.attributes.listId.value
	var currentRow = parseInt(e.currentTarget.attributes.currentRow.value)
	var numRows = e.currentTarget.attributes.numRows.value
	var leftDirectionId = e.currentTarget.attributes.leftdirectionid.value
	var rightDirectionId = e.currentTarget.attributes.rightdirectionid.value
	var element = document.getElementById(listId)
	if(currentRow > 1){
		var positionBefore = 92 * (currentRow-1)
		var positionAfter = 92 * (currentRow-2)
		transition.begin(element, [
			['transform', 'translateX(-'+positionBefore+'%)', 'translateX(-'+positionAfter+'%)', '.7s', 'ease-in-out'],], {
			onBeforeChangeStyle: function() {
				currentRow = currentRow - 1
				var leftDirection = document.getElementById(leftDirectionId)
				leftDirection.setAttribute('currentRow', currentRow)
				var rightDirection = document.getElementById(rightDirectionId)
				rightDirection.setAttribute('currentRow', currentRow)
				if(currentRow != numRows){
					rightDirection.style.display = ''
				}
  
				if(currentRow == 1){
					leftDirection.style.display = 'none'
				}
			},
			onAfterChangeStyle: function(){
			},
			onTransitionEnd: function(finished) {
				if (!finished || stop) return
			}
		})
	}
}