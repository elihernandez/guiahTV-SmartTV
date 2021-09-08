function MusicAlbum({ data }){
    const { albumID } = data
    musicAlbum = new Album(data)

    return (
        <div className="content-section-album" id="content-section-album" >
            <InfoMusicAlbum data={data} />
            <ListAddTrackPlaylist />
            <ListTracksAlbum albumID={albumID} />
        </div>
    )
}

function InfoMusicAlbum({ data }){
    const { title, albumTitle, albumID, artists, portadaURL } = data

    return (
        <div className="left-content">
                <div className="info-album">
                    <div className="cover">
                        <img src={portadaURL} alt={`Portada de ${albumTitle}`} />
                    </div>
                    <div className="type">Álbum: 
                        <div className="album-title">{`${albumTitle}`}</div>
                    </div>
                    <InfoTrackAlbum />
                    <MusicPlayer />
                </div>
            </div> 
    )
}

function InfoTrackAlbum(){
    const [infoTrack, setInfoTrack] = React.useState(null)
   
    musicAlbum.changeInfoTrack(value => {
        setInfoTrack(value)
    })

    return (
        <div className="info-track">
            {infoTrack &&
                <React.Fragment>
                    <div className="song-title">{limitString(infoTrack.title, 30)}</div>
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

function ListTracksAlbum({ albumID }){
    const [data, setData] = React.useState(null)
    const [trackActive, setTrackActive] = React.useState(null)

    React.useEffect(() => {
        getMusicAlbum(albumID)
        .then(response => {
            setData(response)
            musicAlbum.listTracks = response
            fadeOutElement('loader-list-tracks-album', '1', '0', '0.2s')

            setTimeout(() => {
                document.getElementsByClassName('track')[0].focus()
            }, 250)

            $('.list-tracks-album').slick({
                accessibility: false,
                dots: false,
                infinite: false,
                slidesToShow: 6,
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

    musicAlbum.changeListTracks(value => {
        setTrackActive(value.regID)
    })

    return (
        <div className="right-content" id="list-album">
            {data &&       
                <ButtonsPlaylist />
            }
            <div className="list-tracks-album" id="list-tracks-album">
                { data &&
                    data.tracks.map((track, index) => {
                        return <TrackAlbum key={track.regID} data={track} index={index} trackActive={trackActive} />
                    })
                }
            </div>
            <div className='loader' id='loader-list-tracks-album'>
                <div className='spinner'></div>
            </div>
        </div>
    )
}

function ButtonsPlaylist(){
    const [randomActive, setRandomActive] = React.useState(false)
    
    const handlePlayPlaylist = (e) => {
        if(isPressEnter(e.nativeEvent)){
            if(!musicPlayer.random){
                const tracks = musicAlbum.listTracks.tracks
                playTrackMusic(tracks[0], tracks[0].regID)
                document.getElementsByClassName('track')[2].focus()
            }else{
                musicAlbum.listRandom = []
                const randomTrack = musicAlbum.randomTrack

                if(randomTrack){
                    playTrackMusic(randomTrack, randomTrack.regID)
                }else{
                    document.getElementsByClassName('track')[0].focus()
                }
            }
        }
    }

    const handleRandomPlaylist = (e) => {
        if(isPressEnter(e.nativeEvent)){
            musicPlayer.setRandom(true)
            musicAlbum.listRandom = []     
    
            if(musicPlayer.random){
                setRandomActive(true)
            }else{
                setRandomActive(false)
            }
        }
    }


    return (
        <div className="buttons-playlist">
            <div className="track btn button-play-list" tabIndex="-1" onClick={handlePlayPlaylist} onKeyDown={handlePlayPlaylist}>
                <div className="icon fas fa-play"></div>Reproducir
            </div>
            <div className={`track btn button-play-list ${randomActive ? 'active' : ''}`} tabIndex="-1" onClick={handleRandomPlaylist} onKeyDown={handleRandomPlaylist}>
                <div className="icon fas fa-random"></div>Aleatorio
            </div>
        </div> 
    )
}

function TrackAlbum({ data, index, trackActive }){
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


    const handleAddToPlaylist = (e) => {
        if(isPressEnter(e.nativeEvent)){
            isAddToPlaylistActive = true
            isMusicAlbumActive = false
            fadeOutElement("list-album", "1", "0", "0.15s")
            fadeInElement("list-add-playlist", "0", "1", "0.15s")
            SpatialNavigation.focus('list-add-playlist')
        }
    }

    return (
        <div>
            <div className={"track info-track `${trackActive === regID ? 'active' : ''}`"} tabIndex="-1" onKeyDown={handlePress} onClick={handlePress} data-sn-left="#button-play-music">
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
            <div class="track button-playlists dropdown-toggle" tabIndex="-1" onClick={handleAddToPlaylist} onKeyDown={handleAddToPlaylist}>
                <div className="icon fas fa-list"></div>
            </div>
        </div>
    )
}

function ListAddTrackPlaylist(){
    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        getMyPlaylists()
        .then(response => {
            setData(response)

            $('.list-playlists-add').slick({
                accessibility: false,
                dots: false,
                infinite: false,
                slidesToShow: 6,
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
    
    return (
        <div className="right-content list-add-playlist" id="list-add-playlist" style={{ "opacity": "0"}}>
            <div className="header-text">Agregar canción a playlist</div>
            <div className="list-playlists-add" id="list-playlists-add">
                { data &&
                    data.playLists.map((playlist, index) => {
                        return <PlaylistsToAdd key={playlist.regID} title={playlist.title} index={index} />
                    })
                }
            </div>
        </div>
    )
}

function PlaylistsToAdd({ index, title}){

    const handleMove = (e) => {
        if(pressDown(e)){
            $('.list-playlists-add').slick('slickNext')
        }

        if(pressUp(e)){
            $('.list-playlists-add').slick('slickPrev')
        }
    }

    return (
        <div>
            <div className="playlist info-track" tabIndex="-1" onKeyDown={handleMove}>
                <div className="track-title">{limitString(title, 48)}</div>
            </div>
        </div>
    )
}

function playTrackMusic(track, trackID){
    getTrackLink(trackID)
    .then(response => {
        const { url } = response

        const hls = new Hls()
        hls.detachMedia()
        hls.attachMedia(musicPlayer.element)

        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(url)
            musicPlayer.muted = false

            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) { 
                SpatialNavigation.enable('controls-player-music')
                musicAlbum.setTrackInPlay(track)
            })
        })
    })
}