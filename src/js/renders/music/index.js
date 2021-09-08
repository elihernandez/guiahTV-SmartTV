function MusicPage({ data }){
    return (
        <React.Fragment>
            <div className="content-section" id="music-home">
                <MusicMenu active='home' />
                <div className="content-section-music" id="content-section-music">
                    <MusicHome data={data} />
                </div>
            </div>
            <div className="content-section" id="music-album" style={{ "opacity": "0", "display": "none"}} />
            <div className="content-section" id="add-playlist" style={{ "opacity": "0", "display": "none"}}>
                <AddPlaylist />
            </div>
            <div className="content-section loader" id='loader-music' style={{ "opacity": "0", "display": "none"}}>
                <div className='loader'>
                    <div className='spinner'></div>
                </div>
            </div>
        </React.Fragment>
    )
}