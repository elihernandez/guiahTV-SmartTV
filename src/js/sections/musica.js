var idMusica = 'musica',
	isMusicActive = false,
	isMusicHomeActive = false,
	isMusicAlbumActive = false,
	isCreatePlaylistActive = false,
	musicAlbum = null,
	isAddToPlaylistActive = false,
	classMusic

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
	if(isMusicActive){
		isMusicActive = false
		fadeInElement(idLoaderSpinner, "0", "1", "0.15s")
		fadeOutElement(idMusica, "1", "0", "0.15s")
		getMenuPrincipal([idLoaderSpinner], false)
		hideMagicButtonBack()
		ReactDOM.render('', document.getElementById('musica'))
		document.getElementById('musica').removeEventListener('keydown', handlePress)
		document.getElementById('magic-button-back').removeEventListener('keydown', handleMagicButton)
		document.getElementById('magic-button-back').removeEventListener('click', handleMagicButton)
	}

	if(isMusicAlbumActive){
		fadeOutElement('music-album', '1', '0', '0.15s')
		fadeInElement('music-home', '0', '1', '0.15s')
		SpatialNavigation.focus('musica')
		ReactDOM.render('', document.getElementById('music-album'))	
		isMusicAlbumActive = false
		isMusicActive = true
	}	

	if(isCreatePlaylistActive){
		fadeOutElement('add-playlist', '1', '0', '0.15s')
		fadeInElement('music-home', '0', '1', '0.15s')
		clearFormCreatePlaylist()
		SpatialNavigation.focus('musica')
		isCreatePlaylistActive = false
		isMusicActive = true
	}

	if(isAddToPlaylistActive){
		isAddToPlaylistActive = false
		isMusicAlbumActive = true
		fadeOutElement("list-add-playlist", "1", "0", "0.15s")
		fadeInElement("list-album", "0", "1", "0.15s")
		SpatialNavigation.focus('list-tracks-album')
	}
}