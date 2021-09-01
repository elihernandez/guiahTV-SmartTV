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
        </React.Fragment>
    )
}