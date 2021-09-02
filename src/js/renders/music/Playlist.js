function MusicPlaylist({ data }){
    const { regID } = data
    stateMusic.album = data

    return (
        <div className="content-section-album" id="content-section-album" >
            <InfoMusicPlaylist data={data} />
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
   
    stateMusic.changeInfoTrack(value => {
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
    console.log(data)
    const [trackActive, setTrackActive] = React.useState(null)

    React.useEffect(() => {
        getMusicPlaylist(playlistID)
        .then(response => {
            setData(response)
            stateMusic.listTracks = response
            fadeOutElement('loader-list-tracks-album', '1', '0', '0.2s')

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
        })
    }, [])

    const handleClickPlayList = (e) => {
        if(isPressEnter(e.nativeEvent)){
            playTrackMusic(data.tracks[0], data.tracks[0].regID)
            document.getElementsByClassName('track')[1].focus()
        }
    }

    stateMusic.changeListTracks(value => {
        setTrackActive(value.regID)
    })

    return (
        <div className="right-content">
            {data &&
                <div className="buttons-playlist">
                    <div className="track btn button-play-list" tabIndex="-1" onClick={handleClickPlayList} onKeyDown={handleClickPlayList}>
                        <div className="icon fas fa-play" />Reproducir
                    </div>
                    <div className="track btn button-add-songs" tabIndex="-1" onClick={handleClickPlayList} onKeyDown={handleClickPlayList}>
                    <div className="icon fas fa-music" />Agregar canciones
                    </div>
                </div>       
            }
            { data &&
                <div className="list-tracks-album" id="list-tracks-album">
                    {
                        data.tracks ? (
                            data.tracks.map((track, index) => {
                                return <TrackPlaylist key={track.regID} data={track} index={index} trackActive={trackActive} />
                            })
                        ) : (
                            <div className="no-songs-message">La playlist no tiene canciones agregadas</div>
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
            SpatialNavigation.disable('controls-player-music')
            playTrackMusic(data, regID)
        }
    }

    return (
        <div className={`track ${trackActive === regID ? 'active' : ''}`} tabIndex="-1" onKeyDown={handlePress} onClick={handlePress} data-sn-left="#button-play-music">
            <div className="track-index">
                {trackActive === regID ?
                    <div className="button">
                        <div className="icon fas fa-pause" />
                    </div>
                    :
                    index + 1
                }
            </div>
            <div className="track-title">{title}</div>
            <div className="track-time">
                {transformSecondsToStringHour(length)}
            </div>
        </div>
    )
}