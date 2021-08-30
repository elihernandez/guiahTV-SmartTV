var idMusica = 'musica',
	sectionMusicaActive = false

function getMusica(response){
	fadeOutElements([idTopMenu, idMenuPrincipal], '1', '0', '0.2s')
	fadeInTranslateXElement(idMusica, '0', '1', '.2s', '0', '0', '.3s')
	fadeOutElementDelay(idLoaderSpinner, '1', '0', '0.2s', '0.5s')

	renderHome(response)
	sectionMusicaActive = true
	showMagicButtonBack()
}

function renderHome(response){
    ReactDOM.render(<MusicPage data={response} />, document.getElementById('musica'))
}

function clearSectionMusica(){
	sectionMusicaActive = false
	fadeInElement(idLoaderSpinner, "0", "1", "0.2s")
	fadeOutElement(idMusica, "1", "0", "0.1s")
	getMenuPrincipal([idLoaderSpinner], false)
	hideMagicButtonBack()
	ReactDOM.render("", document.getElementById('musica'))
  }