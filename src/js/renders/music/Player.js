let musicPlayer = null

function MusicPlayer(){
    return (
        <div className="music-player">
            <PlayerMusicAudio />
            <ProgressBarMusic />
            <PlayerMusicControls />
        </div>
    )
}

function PlayerMusicAudio(){

    const handleEnded = () => {
        const nextTrack = musicAlbum.nextTrack

        if(nextTrack){
            playTrackMusic(nextTrack, nextTrack.regID)
        }else{
            document.getElementsByClassName('track')[0].focus()
        }
    }

    React.useEffect(() => {
        const el = document.getElementById('music-player-audio')
        musicPlayer = new Audio(el)

        musicPlayer.element.addEventListener('ended', handleEnded)
    }, [])

    return <audio id="music-player-audio" type="application/x-mpegURL" autoPlay />
}

function ProgressBarMusic(){
    const [duration, setDuration] = React.useState('0:00')
    const [currentTime, setCurrentTime] = React.useState('0:00')
    const [progress, setProgress] = React.useState(0)

    const handleDurationChange = () => {
        const seconds = musicPlayer.element.duration
        const duration = transformSecondsToStringHour(seconds)
        setDuration(duration)
    }

    const handleTimeUpdate = () => {
        const seconds = musicPlayer.element.currentTime
        const currentTime = transformSecondsToStringHour(seconds)
        setCurrentTime(currentTime)

        const duration = musicPlayer.element.duration
        const current = musicPlayer.element.currentTime
        const progress = (current / duration) * 100
        setProgress(progress)
    }

    React.useEffect(() => {
        musicPlayer.element.addEventListener('durationchange', handleDurationChange)
        musicPlayer.element.addEventListener('timeupdate', handleTimeUpdate)
    }, [])

    return (
        <div className="progress-container">
            <div className="start-time">{currentTime}</div>
            <div className="progress-bar">
                <div className="current-progress" style={{ 'width': `${progress}%` }}></div>
            </div>
            <div className="end-time">{duration}</div>
        </div>
    )
}

function PlayerMusicControls(){

    React.useEffect(() => {
        SpatialNavigation.disable('controls-player-music')
    }, [])

    return (
        <div className="controls" id="controls-player-music">
            <ButtonBackward />
            <ButtonPlay />
            <ButtonForward />
        </div>
    )
}

function ButtonPlay(){
    const [playing, setPlaying] = React.useState(false)
    
    const handlePress = (e) => {
        const player = musicPlayer.element

        if(isPressEnter(e.nativeEvent)){
            if(player?.paused){
                musicPlayer.setPlay()
            }else{
                musicPlayer.setPause()
            }
        }
    }

    const handlePlay = () => {
        setPlaying(true)
    }

    const handlePause = () => {
        setPlaying(false)
    }

    React.useEffect(() => {
        musicPlayer.element.addEventListener('play', handlePlay)
        musicPlayer.element.addEventListener('pause', handlePause)

        $('.button').on('sn:willunfocus', (e) => {
            console.log(e.originalEvent.detail)
        })
    }, [])

    return (
        <div className="button" id="button-play-music" tabIndex="-1" onClick={handlePress} onKeyDown={handlePress}>
            {!playing &&
                <div className="icon fas fa-play" />
            }
            {playing &&
                <div className="icon fas fa-pause" />
            }
        </div>
    )
}

function ButtonBackward(){

    const handlePress = (e) => {
        if(isPressEnter(e)){
            if(musicPlayer.element.currentTime < 5){
                if(musicPlayer.random){
                    const randomTrack = musicAlbum.randomTrack
        
                    if(randomTrack){
                        playTrackMusic(randomTrack, randomTrack.regID)
                    }else{
                        document.getElementsByClassName('track')[0].focus()
                    }
                }else{
                    const prevTrack = musicAlbum.prevTrack
        
                    if(prevTrack){
                        playTrackMusic(prevTrack, prevTrack.regID)
                    }else{
                        musicPlayer.element.currentTime = 0
                    }
                }
            }else{
                musicPlayer.element.currentTime = 0
            }
        }
    }

    return (
        <div className="button" tabIndex="-1" data-sn-left="#" onKeyDown={handlePress} onClick={handlePress}>
            <div className="icon fas fa-step-backward" />
        </div>
    )
}

function ButtonForward(){

    const handlePress = (e) => {
        if(isPressEnter(e)){
            if(musicPlayer.random){
                const randomTrack = musicAlbum.randomTrack
    
                if(randomTrack){
                    playTrackMusic(randomTrack, randomTrack.regID)
                }else{
                    document.getElementsByClassName('track')[0].focus()
                }
            }else{
                const nextTrack = musicAlbum.nextTrack
    
                if(nextTrack){
                    playTrackMusic(nextTrack, nextTrack.regID)
                }
            }
        }
    }

    return (
        <div className="button" tabIndex="-1" onKeyDown={handlePress} onClick={handlePress}>
            <div className="icon fas fa-step-forward" />
        </div>
    )
}