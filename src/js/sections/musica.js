var idMusica = 'musica',
	isMusicActive = false,
	isMusicHomeActive = false,
	isMusicAlbumActive = false,
	isCreatePlaylistActive = false,
	musicAlbum = null,
	isAddToPlaylistActive = false,
	isMusicArtistActive = false,
	classMusic,
	musicHistory = [],
	indexActive = 0

function getMusica(response){
	fadeOutElements([idTopMenu, idMenuPrincipal], '1', '0', '0.2s')
	fadeInTranslateXElement(idMusica, '0', '1', '.2s', '0', '0', '.3s')
	fadeOutElementDelay(idLoaderSpinner, '1', '0', '0.2s', '0.5s')
	
	renderHome(response)
	isMusicActive = true
	// classMusic = new Music(response)
	showMagicButtonBack()
	document.getElementById('musica').addEventListener('keydown', handlePress)
	document.getElementById('magic-button-back').addEventListener('keydown', handleMagicButton)
	document.getElementById('magic-button-back').addEventListener('click', handleMagicButton)
}

function renderHome(response){
	ReactDOM.render(<MusicPage data={response} />, document.getElementById('musica'))
	setHistoryMusic('music-home')
}

function handlePress(e){
	if(isPressBack(e) || e.type === 'click'){
		cleanSectionMusic()
	}
}

function handleMagicButton(e){
	if(e.type === 'click' || isPressEnter(e)){
		cleanSectionMusic()
	}
}

function cleanSectionMusic(){

	if(indexActive === 0){
		fadeInElement(idLoaderSpinner, "0", "1", "0.15s")
		fadeOutElement(idMusica, "1", "0", "0.15s")
		getMenuPrincipal([idLoaderSpinner], false)
		hideMagicButtonBack()
		ReactDOM.render('', document.getElementById('musica'))
		document.getElementById('musica').removeEventListener('keydown', handlePress)
		document.getElementById('magic-button-back').removeEventListener('keydown', handleMagicButton)
		document.getElementById('magic-button-back').removeEventListener('click', handleMagicButton)
		musicHistory = []
	}

	const prevSection = musicHistory[indexActive - 1]
	const currentSection = musicHistory[indexActive]

	fadeOutElement(currentSection, '1', '0', '150ms')
    fadeInElement(prevSection, '0', '1', '150ms')
	musicHistory.pop()
	indexActive = musicHistory.length - 1

	if(currentSection === 'list-add-playlist'){
		fadeOutElement("list-add-playlist", "1", "0", "0.15s")
		fadeInElement("list-album", "0", "1", "0.15s")
		SpatialNavigation.focus('list-tracks-album') 
		return
	}

	if(currentSection === 'music-album'){
		ReactDOM.render('', document.getElementById('music-album'))	
	}

	if(currentSection === 'music-artist'){
		ReactDOM.render('', document.getElementById('music-artist'))	
	}

	if(prevSection === 'music-artist'){
		SpatialNavigation.focus('music-artist')
	}

	if(prevSection === 'music-home'){
		SpatialNavigation.focus('musica')
	}
}

function setHistoryMusic(sectionID){
    musicHistory.push(sectionID)
    indexActive = musicHistory.length - 1
}

function fadeElementMusic(sectionID){
	const currentSection = musicHistory[indexActive]
	fadeOutElement(currentSection, '1', '0', '150ms')
    fadeInElement(sectionID, '0', '1', '150ms')
	setHistoryMusic(sectionID)
}

function musicError(){
	indexActive = 0
	cleanSectionMusic()
	errorSection()
}