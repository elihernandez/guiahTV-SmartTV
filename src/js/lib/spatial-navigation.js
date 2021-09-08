var focusableElements = new Array,
	navigableElements = new Array,
	navigableSections = new Array

focusableElements = [
	{ section: 'main-info-login', selector: '.buttons-wpage', defaultElement: '#button-show-form-login' },
	{ section: 'register-info-login', selector: '.buttons-rpage', defaultElement: '' },
	{ section: 'form-info-login', selector: '.buttons-lpage', defaultElement: '#username-login' },
	{ section: 'message-login-failed-view', selector: '.buttons-mlf', defaultElement: '' },
	{ section: 'sections', selector: '.section-item', defaultElement: '' },
	{ section: 'spotlight', selector: '.carousel-spotlight', defaultElement: '' },
	{ section: 'top-menu', selector: '.item-top-menu', defaultElement: '' },
	{ section: 'right-menu', selector: '.item-right-menu', defaultElement: '#btn-show-configuration' },
	{ section: 'info-logout', selector: '.item-info-logout', defaultElement: '#button-no-logout' },
	{ section: 'error-sesion-failed', selector: '.button-back', defaultElement: '' },
	{ section: 'error-page-status', selector: '.button-back', defaultElement: '' },
	{ section: 'error-video-status', selector: '.button-back', defaultElement: '' },
	{ section: 'liveTvTabContent', selector: '.channel-item', defaultElement: '' },
	{ section: 'liveTvTab', selector: '.nav-link', defaultElement: '' },
	{ section: 'alacarta', selector: '.item-movie-alacarta', defaultElement: '' },
	{ section: 'zonakids', selector: '.item-movie-zonakids', defaultElement: '' },
	{ section: 'buttons-container', selector: '.button-player', defaultElement: '#button-play' },
	{ section: 'progress-bar-container', selector: '.button-progress-bar', defaultElement: '' },
	{ section: 'cont-video-button-back', selector: '.video-button-back-span', defaultElement: '' },
	{ section: 'text-track-panel', selector: '.text-track-item', defaultElement: '' },
	{ section: 'icon-close-tracks-panel', selector: '.icon-close-panel', defaultElement: '' },
	{ section: 'seasons-serie', selector: '.title-season', defaultElement: '' },
	{ section: 'chapters-serie', selector: '.chapter', defaultElement: '' },
	{ section: 'radio', selector: '.item-radio', defaultElement: '' },
	{ section: 'configurations-left-section', selector: '.cls-item', defaultElement: '#conf-language' },
	{ section: 'configurations-right-section', selector: '.crs-item', defaultElement: '' },
	{ section: 'magic-button-back', selector: '.button-back', defaultElement: '' },
	{ section: 'musica', selector: '.cover-slide', defaultElement: ''},
	{ section: 'music-menu', selector: '.link-music-menu', defaultElement: ''},
	{ section: 'list-tracks-album', selector: '.track', defaultElement: ''},
	{ section: 'controls-player-music', selector: '.button', defaultElement: ''},
	{ section: 'add-playlist', selector: '.button', defaultElement: ''},
	{ section: 'list-add-playlist', selector: '.playlist', defaultElement: ''}
] 

function makeNavigableSections(sections){
	if(sections){
		sections.forEach(function(section, index){
			SpatialNavigation.enable(section)
		})
	}
}

function makeSectionFocus(section){
	SpatialNavigation.focus(section)
}

function addNavigableElementsToSpatialNavigation(elements){
	elements.forEach(function(element, index) {
		if(element.defaultElement){
			SpatialNavigation.add(element.section,{
				selector: element.selector,
				rrememberSource: true,
				enterTo: 'default-element',
				disabled: false,
				defaultElement: element.defaultElement
			})
		}else{
			SpatialNavigation.add(element.section,{
				selector: element.selector,
				rememberSource: true,
				enterTo: 'last-focused',
				disabled: false
			})
		}
	})

	SpatialNavigation.makeFocusable()
}

// Función para inciar Spatial Navigation
function iniciarSpatialNavigation() {
	// Se inicia Spatial navigation y se declara el selector ".focusable" para los elementos con focus
	SpatialNavigation.init()

	// Se declaran los eventos válidos para Spatial Navigation
	var validEvents = [
		'sn:willmove',
		'sn:willunfocus',
		'sn:unfocused',
		'sn:willfocus',
		'sn:focused',
		'sn:enter-down',
		'sn:enter-up',
		'sn:navigatefailed'
	]

	var eventHandler = function(evt) {
		// console.log(evt.type, evt.target, evt.detail);
	}

	validEvents.forEach(function(type) {
		window.addEventListener(type, eventHandler)
	})

	addNavigableElementsToSpatialNavigation(focusableElements)
}
