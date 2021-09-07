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
                speed: 0,
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
                        const { contentType, portadaURL, title, description } = track

                        const handleKeyDown = (e) => {
                            if(nativeEventValid(e)){
                                isMusicActive = false
                                isMusicAlbumActive = true
                                ReactDOM.render(
                                    <MusicPlaylist data={track} />,
                                    document.getElementById('music-album')
                                )
                                fadeOutElement('music-home', '1', '0', '150ms')
                                fadeInElement('music-album', '0', '1', '150ms')
                            }else{
                                handleMove(e)
                            }
                        }

                        const handleAddPlaylist = (e) => {
                            if(isPressEnter(e)){
                                fadeOutElement('music-home', '1', '0', '150ms')
                                fadeInElement('add-playlist', '0', '1', '150ms')
                            }
                        }

                        const handleInfo = () => {
                            document.querySelector('.content-title').innerHTML = title
                            document.querySelector('.content-subtitle').innerHTML = description
                        }

                        return (
                            <React.Fragment>
                                {contentType === 'add-playlist' ? (
                                    <div key={title} className="slide" tabIndex="-1" onClick={handleAddPlaylist} onMouseOver={handleInfo}>
                                        <div className="cover-slide button-add-playlist" onKeyDown={handleAddPlaylist} onFocus={handleInfo}>
                                            <div className="container-button">
                                                <div className="icon fas fa-plus"></div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div key={title} className="slide" tabIndex="-1" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                        <div className="cover-slide" onKeyDown={handleKeyDown} onFocus={handleInfo}>
                                            <img src={portadaURL} alt={`Cover de ${title}`} />
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}