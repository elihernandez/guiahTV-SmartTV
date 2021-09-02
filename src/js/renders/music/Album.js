const stateMusic = {
    trackInPlay: null,
    album: null,
    listTracks: null,
    musicPlayer: null,
    infoTrackListener: function(val) {},
    listTracksListener: function(val) {},
    set setTrackInPlay(val) {
      this.trackInPlay = val
      this.listTracksListener(val)
      this.infoTrackListener(val)
    },
    get prevTrack(){
        const isTrack = (element) => element.regID === this.trackInPlay.regID
        const index = this.listTracks.tracks.findIndex(isTrack)

        if(index === 0){
            this.musicPlayer.currentTime = 0
            return
        }

        const length = this.listTracks.tracks.length - 1
        const prevTrack = this.listTracks.tracks[index - 1]
        
        return prevTrack
    },
    get nextTrack(){
        const isTrack = (element) => element.regID === this.trackInPlay.regID
        const index = this.listTracks.tracks.findIndex(isTrack)  
        const length = this.listTracks.tracks.length - 1

        if(index === length){
            this.musicPlayer.currentTime = 0
            return
        }

        const nextTrack = this.listTracks.tracks[index + 1]

        return nextTrack
    },
    changeInfoTrack: function(listener) {
      this.infoTrackListener = listener
    },
    changeListTracks: function(listener) {
        this.listTracksListener = listener
    }
}

function MusicAlbum({ data }){
    const { albumID } = data
    stateMusic.album = data

    return (
        <div className="content-section-album" id="content-section-album" >
            <InfoMusicAlbum data={data} />
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

function ListTracksAlbum({ albumID }){
    const [data, setData] = React.useState(null)
    const [trackActive, setTrackActive] = React.useState(null)

    React.useEffect(() => {
        getMusicAlbum(albumID)
        .then(response => {
            setData(response)
            stateMusic.listTracks = response
            fadeOutElementDelay('loader-list-tracks-album', '1', '0', '0.2s', '0.25s')

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
            document.getElementsByClassName('track')[2].focus()
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
                        <div className="icon fas fa-play"></div>Reproducir
                    </div>
                </div> 
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
            SpatialNavigation.disable('controls-player-music')
            playTrackMusic(data, regID)
        }
    }

    return (
        <div className={`track ${trackActive === regID ? 'active' : ''}`} tabIndex="-1" onKeyDown={handlePress} onClick={handlePress} data-sn-left="#button-play-music">
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
            <div className="track-title">{title}</div>
            <div className="track-time">
                {transformSecondsToStringHour(length)}
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
        hls.attachMedia(document.getElementById('music-player-audio'))

        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(url)

            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) { 
                SpatialNavigation.enable('controls-player-music')
                stateMusic.setTrackInPlay = track
            })
        })
    })
}