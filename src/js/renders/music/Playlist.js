function MusicPlaylist({ data }){
    const { regID } = data
    musicAlbum = new Album(data)

    return (
        <div className="content-section-album" id="content-section-album" >
            <InfoMusicPlaylist data={data} />
            <DeleteTrackPlaylist playlistID={regID} />
            <ListTracksPlaylist playlistID={regID} />
        </div>
    )
}

function InfoMusicPlaylist({ data }){
    const { title, portadaURL } = data

    return (
        <div className="left-content">
                <div className="info-album">
                    <div className="cover">
                        <img src={portadaURL} alt={`Portada de ${title}`} />
                    </div>
                    <div className="type">Playlist: 
                        <div className="album-title">{`${title}`}</div>
                    </div>
                    <InfoTrackPlaylist />
                    <MusicPlayer />
                </div>
            </div> 
    )
}

function InfoTrackPlaylist(){
    const [infoTrack, setInfoTrack] = React.useState(null)
   
    musicAlbum.changeInfoTrack(value => {
        setInfoTrack(value)
    })

    return (
        <div className="info-track">
            {infoTrack &&
                <React.Fragment>
                    <div className="song-title">{infoTrack.title}</div>
                    <div className="song-artists">
                        {
                            infoTrack.artists.map((artist, index) => {
                                return <div className="artist-name">
                                    {`${artist.title}${index + 1 !== infoTrack.artists.length ? ',  ' : ''}`} 
                                </div>
                            })
                        }
                    </div>
                </React.Fragment>
            }
        </div>
    )
}

function ListTracksPlaylist({ playlistID }){
    const [data, setData] = React.useState(null)
    const [trackActive, setTrackActive] = React.useState(null)

    React.useEffect(() => {
        getMusicPlaylist(playlistID)
        .then(response => {
            setData(response)
            musicAlbum.listTracks = response
            fadeOutElement('loader-list-tracks-album', '1', '0', '0.2s')
        })
    }, [])

    React.useEffect(() => {
        if(data){   
            setTimeout(() => {
                document.getElementsByClassName('track')[0].focus()
            }, 250)

            $('.list-tracks-album').slick({
                accessibility: false,
                dots: false,
                infinite: false,
                slidesToShow: 5,
                slidesToScroll: 1,
                vertical: true,
                verticalSwiping: false,
                swipeToSlide: false,
                focusOnSelect: false,
                speed: 0,
                autoplay: false,
                arrows: true,
                variableWidth: false,
                adaptiveHeight: false,
                prevArrow: '<div class="slick-prev"><div class="icon fas fa-chevron-up"></div></div>',
                nextArrow: '<div class="slick-next"><div class="icon fas fa-chevron-down"></div></div>'
            })
        }
    }, [data])

    musicAlbum.changeListTracks(value => {
        setTrackActive(value.regID)
    })

    musicAlbum.changeDeleteTrack(value => {
        setData(null)
        setTimeout(() => {
            setData(value)
        }, 100)
    })

    return (
        <div className="right-content" id="list-album">
            {data &&
                <ButtonsPlaylist />     
            }
            { data &&
                <div className="list-tracks-album" id="list-tracks-album">
                    {
                        data.tracks ? (
                            data.tracks.map((track, index) => {
                                return <TrackPlaylist key={track.regID} data={track} index={index} trackActive={trackActive} />
                            })
                        ) : (
                            <div className="no-songs-message">
                                <div className="title">La playlist no tiene canciones agregadas</div>
                                <div className="subtitle">Navega en las secciones para agregar tus canciones favoritas</div>
                            </div>
                        )
                    }
                </div>
            }
            <div className='loader' id='loader-list-tracks-album'>
                <div className='spinner'></div>
            </div>
        </div>
    )
}

function TrackPlaylist({ data, index, trackActive }){
    const { regID, title, length } = data 
    const [playing, setPlaying] = React.useState(false)

    const handlePlay = () => {
        setPlaying(true)
    }

    const handlePause = () => {
        setPlaying(false)
    }

    React.useEffect(() => {
        document.getElementById('music-player-audio').addEventListener('play', handlePlay)
        document.getElementById('music-player-audio').addEventListener('pause', handlePause)
    }, [])

    const handleMove = (e) => {
        if(pressDown(e)){
            $('.list-tracks-album').slick('slickNext')
        }

        if(pressUp(e)){
            $('.list-tracks-album').slick('slickPrev')
        }
    }

    const handlePress = (e) =>{
        handleMove(e.nativeEvent)

        if(isPressEnter(e.nativeEvent)){
            if(musicAlbum.trackInPlay?.regID === regID){
                if(musicPlayer.play){
                    musicPlayer.setPause()
                }else{
                    musicPlayer.setPlay()
                }
            }else{
                SpatialNavigation.disable('controls-player-music')
                playTrackMusic(data, regID)
            }
        }
    }

    const handleRemoveTrackPlaylilst = (e) => {
        if(isPressEnter(e.nativeEvent)){
            isAddToPlaylistActive = true
            isMusicAlbumActive = false
            musicAlbum.trackDelete = regID
            fadeOutElement("list-album", "1", "0", "0.15s")
            fadeInElement("list-add-playlist", "0", "1", "0.15s")
            SpatialNavigation.focus('list-add-playlist')
        }
    }

    return (
        <div>
            <div className={`track info-track ${trackActive === regID ? 'active' : ''}`} tabIndex="-1" onKeyDown={handlePress} onClick={handlePress} data-sn-left="#button-play-music">
                <div className="track-index">
                    {trackActive === regID ?
                        <div className="button">
                            {playing ?
                                <div className="icon fas fa-pause" />
                                :
                                <div className="icon fas fa-play" />
                            }
                        </div>
                        :
                        index + 1
                    }
                </div>
                <div className="track-title">{limitString(title, 48)}</div>
                <div className="track-time">
                    {transformSecondsToStringHour(length)}
                </div>
            </div>
            <div class="track button-playlists dropdown-toggle" tabIndex="-1" onClick={handleRemoveTrackPlaylilst} onKeyDown={handleRemoveTrackPlaylilst}>
                <div className="icon fas fa-minus"></div>
            </div>
        </div>
    )
}

function DeleteTrackPlaylist({ playlistID }){

    const handleCancel = (e) => {
        if(isPressEnter(e.nativeEvent)){
            cleanSectionMusic()
        }
    }

    const handleDelete = (e) => {
        if(isPressEnter(e.nativeEvent)){
            const trackID = musicAlbum.trackDelete
            deleteMusicTrackToPlaylist(playlistID, trackID)
            .then(response => {
                musicAlbum.setDeleteTrack(trackID)
                showToastMessage('toast-message', 'La canción se eliminó de la playlist')
                cleanSectionMusic()
            })
        }
    }

    return (
        <div className="right-content list-add-playlist" id="list-add-playlist" style={{ "opacity": "0"}}>
            <div className="header-text">Se va a eliminar la canción de esta playlist</div>
            <div className="buttons">
                <div
                    tabIndex="-1"
                    className="playlist button delete-button"
                    onClick={handleDelete}
                    onKeyDown={handleDelete}>
                    Eliminar
                </div>
                <div
                    tabIndex="-1"
                    className="playlist button cancel-button"
                    onClick={handleCancel}
                    onKeyDown={handleCancel}>
                    Cancelar
                </div>
            </div>
        </div>
    )
}