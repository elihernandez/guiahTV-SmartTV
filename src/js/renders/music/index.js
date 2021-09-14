function MusicPage({ data }) {
    return (
        <React.Fragment>
            <div className="content-section" id="music-home">
                <MusicMenu active='home' />
                <div className="content-section-music" id="content-section-music">
                    <MusicHome data={data} />
                </div>
            </div>
            <div className="content-section" id="music-album" style={{ "opacity": "0", "display": "none" }} />
            <div className="content-section" id="add-playlist" style={{ "opacity": "0", "display": "none" }}>
                <AddPlaylist />
            </div>
            <div className="content-section" id="music-artist" style={{ "opacity": "0", "display": "none" }} />
            <div className="content-section loader" id='loader-music' style={{ "opacity": "0", "display": "none" }}>
                <div className='loader'>
                    <div className='spinner'></div>
                </div>
            </div>
            <ToastMessage />
        </React.Fragment>
    )
}

function ToastMessage(){

    return (
        <div className="toast-container" id="toast-message" style={{ "opacity": "0", "display": "none"}}>
            <div className="toast-wrapper">
                <div className="toast-head">
                    <div className="icon fas fa-check-circle" />
                </div>
                <div className="toast-message"></div>
            </div>
        </div>
    )
}

function showToastMessage(el, message, timeout = 5000){
    document.querySelector(`#${el} .toast-message`).innerHTML = message
    fadeInElement(el, "0", "1", "500ms")

    setTimeout(() => {
        fadeOutElement(el, "1", "0", "500ms")
    }, timeout)
}