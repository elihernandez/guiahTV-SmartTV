function MusicPage({ data }){
    return (
        <React.Fragment>
            <div className="content-section" id="music-home">
                <MusicMenu active='home' />
                <div className="content-section-music" id="content-section-music">
                    <MusicHome data={data} />
                </div>
            </div>
            <div className="content-section" id="music-album" />
            <div className="content-section" id="add-playlist">
                <div className="form-add-playlist">
                    <input className="input title-playlist" type="text" placeholder="Nombre de playlist" />
                    <input className="input description-playlist" type="text" placeholder="Descripción de playlist (opcional)" />
                </div>
            </div>
            <div className="content-section loader" id='loader-music'>
                <div className='loader'>
                    <div className='spinner'></div>
                </div>
            </div>
        </React.Fragment>
    )
}