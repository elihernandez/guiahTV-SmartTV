function AddPlaylist(){

    const handleCreate = (e) => {
        if(isPressEnter(e.nativeEvent)){
            const title = document.getElementById('create-name-playlist')
            
            if(title.value !== ''){
                const description = document.getElementById('create-description-playlist')
                const isPublic = document.getElementById('create-public-playlist').checked

                createMusicPlaylist(title.value, description.value, isPublic)
                .then(response => {
                    if(response.regID){
                        getMusicPlaylist(response.regID)
                        .then(response => {
                            ReactDOM.render(
                                <MusicPlaylist data={response} />,
                                document.getElementById('music-album')
                            )

                            function removeItemFromArr( arr, item ) {
                                return arr.filter( function( e ) {
                                    return e !== item
                                })
                            }

                            fadeElementMusic('music-album')
                            musicHistory = removeItemFromArr( musicHistory, 'add-playlist' );
                            indexActive = musicHistory.length - 1
                            clearFormCreatePlaylist()
                        })
                    }else{
                        
                    }
                })
            }else{
                title.focus()
            }
        }
    }
    
    const handleCancel = (e) => {
        if(isPressEnter(e.nativeEvent)){
            cleanSectionMusic()
        }
    }

    const handlePublic = (e) => {
        if(isPressEnter(e.nativeEvent)){
            if(document.getElementById('create-public-playlist').checked === true){
                document.getElementById('create-public-playlist').checked = false
            }else{
                document.getElementById('create-public-playlist').checked = true
            }
        }
    }

    return (
        <div className="form-add-playlist">
            <div className="header">
                <div className="title">Crear nueva playlist</div>
            </div>
            <div className="form-content">
                <div className="left-content">
                    <div className="info-album">
                        <div className="cover">
                            <img />
                            <div className="info-cover">
                                <div className="icon fas fa-music" />
                                <div className="text">Nueva playlist</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-content">
                    <input id="create-name-playlist" className="button input title-playlist" type="text" placeholder="Nombre" tabIndex="-1" />
                    <input id="create-description-playlist" className="button input description-playlist" type="text" placeholder="Descripción (opcional)" tabIndex="-1" />
                    <div className="button group-public" tabIndex="-1" onClick={handlePublic} onKeyDown={handlePublic}>
                        <input type="checkbox" id="create-public-playlist" />
                        <div className="text">Hacer pública</div>
                    </div>
                    <div className="buttons">
                        <div
                            className="button create-button"
                            tabIndex="-1"
                            onClick={handleCreate}
                            onKeyDown={handleCreate}>
                            Crear playlist
                        </div>
                        <div
                            className="button cancel-button"
                            tabIndex="-1"
                            onClick={handleCancel}
                            onKeyDown={handleCancel}>
                            Cancelar
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function clearFormCreatePlaylist(){
    document.getElementById('create-name-playlist').value = ''
    document.getElementById('create-description-playlist').value = ''
}