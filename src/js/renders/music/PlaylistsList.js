function PlaylistsList({ data, handleMove }){
    const { title, playLists } = data

    React.useEffect(() => {
        setTimeout(() => {
            $('.carousel').slick({
                dots: false,
                infinite: false,
                slidesToShow: 6,
                slidesToScroll: 1,
                swipeToSlide: false,
                focusOnSelect: false,
                speed: 250,
                autoplay: false,
                arrows: true,
                variableWidth: false,
                adaptiveHeight: false,
                prevArrow: '<div class="slick-prev"><div class="icon fas fa-chevron-left"></div></div>',
                nextArrow: '<div class="slick-next"><div class="icon fas fa-chevron-right"></div></div>'
            })
        }, 50)
    }, [])

    const handleKeyDown = (e) => {
        handleMove(e)
    }

    return (
        <div className="list playlists-list">
            <h1 className="name-list">{title}</h1>
            <div className="carousel">
                {
                    playLists.map((track) => {
                        const { portadaURL, title, description } = track

                        const handleKeyDown = (e) => {
                            if(nativeEventValid(e)){
                                isMusicActive = false
                                isMusicAlbumActive = true
                                ReactDOM.render(
                                    <MusicPlaylist data={track} />,
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
                                    <h3 className="description">{description}</h3>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}