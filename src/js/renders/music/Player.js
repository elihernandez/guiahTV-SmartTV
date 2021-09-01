function MusicPlayer(){

    React.useEffect(() => {
        SpatialNavigation.disable('controls-player-music')
        stateMusic.musicPlayer = document.getElementById('music-player-audio')
    }, [])

    return (
        <div className="music-player">
            <audio id="music-player-audio" type="application/x-mpegURL" autoPlay />
            <ProgressBarMusic />
            <div className="controls" id="controls-player-music">
                <ButtonBackward />
               
                <ButtonPlay />
                <ButtonForward />
            </div>
        </div>
    )
}

function ProgressBarMusic(){
    const [duration, setDuration] = React.useState('0:00')
    const [currentTime, setCurrentTime] = React.useState('0:00')
    const [progress, setProgress] = React.useState(0)

    const handleDurationChange = () => {
        const seconds = document.getElementById('music-player-audio').duration
        const duration = transformSecondsToStringHour(seconds)
        setDuration(duration)
    }

    const handleTimeUpdate = () => {
        const seconds = document.getElementById('music-player-audio').currentTime
        const currentTime = transformSecondsToStringHour(seconds)
        setCurrentTime(currentTime)

        const duration = document.getElementById('music-player-audio').duration
        const current = document.getElementById('music-player-audio').currentTime
        const progress = (current / duration) * 100
        setProgress(progress)
    }

    React.useEffect(() => {
        document.getElementById('music-player-audio').addEventListener('durationchange', handleDurationChange)
        document.getElementById('music-player-audio').addEventListener('timeupdate', handleTimeUpdate)
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

function ButtonPlay(){
    const [playing, setPlaying] = React.useState(false)
    
    const handlePress = (e) => {
        const player = document.getElementById('music-player-audio')

        if(isPressEnter(e.nativeEvent)){
            if(player?.paused){
                player.play()
            }else{
                player.pause()
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
        document.getElementById('music-player-audio').addEventListener('play', handlePlay)
        document.getElementById('music-player-audio').addEventListener('pause', handlePause)
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
            const prevTrack = stateMusic.prevTrack

            if(prevTrack){
                playTrackMusic(prevTrack, prevTrack.regID)
            }
        }
    }

    return (
        <div className="button" tabIndex="-1" data-sn-left="#" onKeyDown={handlePress} onClick={handlePress}>
            <div className="icon fas fa-backward" />
        </div>
    )
}

function ButtonForward(){

    const handlePress = (e) => {
        if(isPressEnter(e)){
            const nextTrack = stateMusic.nextTrack
            
            if(nextTrack){
                playTrackMusic(nextTrack, nextTrack.regID)
            }
        }
    }

    return (
        <div className="button" tabIndex="-1" onKeyDown={handlePress} onClick={handlePress}>
            <div className="icon fas fa-forward" />
        </div>
    )
}