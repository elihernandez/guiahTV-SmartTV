function TracksList({ data, handleMove }){
    const { title, tracks } = data

    React.useEffect(() => {
        setTimeout(() => {
            $('.carousel').slick({
                infinite: false,
                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: false,
                focusOnSelect: false,
                speed: 350
            })
        }, 50)
    }, [])

    return (
        <div className="list tracks-list">
            <h1 className="name-list">{title}</h1>
            <div className="carousel">
                {
                    tracks.map((track) => {
                        const { portadaURL, title, albumTitle } = track

                        const handleKeyDown = (e) => {
                            if(nativeEventValid(e)){
                                isMusicActive = false
                                isMusicAlbumActive = true
                                ReactDOM.render(
                                    <MusicAlbum data={track} />,
                                    document.getElementById('music-album')
                                )
                                fadeOutElement('music-home', '1', '0', '250ms')
                                fadeInElement('music-album', '0', '1', '250ms')
                            }else{
                                handleMove(e)
                            }
                        }

                        return (
                            <div key={title} className="slide" tabIndex="-1" onClick={handleKeyDown}>
                                <div className="cover-slide" onKeyDown={handleKeyDown}>
                                    <img src={portadaURL} alt={`Cover de ${title}`} />
                                </div>
                                <div className="info-slide">
                                    <h2 className="title">{title}</h2>
                                    <h3 className="album">{albumTitle}</h3>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
