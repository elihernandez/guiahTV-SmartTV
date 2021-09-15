function AlbumsList({ data }){
    React.useEffect(() => {
        setTimeout(() => {
            $('.albums').slick({
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
        setTimeout(() => {
            SpatialNavigation.focus('music-artist')
        }, 500)
    }, [])

    return (
        <div className="list tracks-list">
            {/* <h1 className="name-list">{title}</h1> */}
            <div className="carousel albums">
                {
                    data.map((album) => {
                        console.log(album)
                        const { albumID, title, portadaURL } = album

                        const handleKeyDown = (e) => {
                            if(nativeEventValid(e)){
                                album.albumTitle = album.title

                                ReactDOM.render(
                                    <MusicAlbum data={album} />,
                                    document.getElementById('music-album')
                                )

                                fadeElementMusic('music-album')
                            }
                        }

                        const handleInfo = () => {}

                        return (
                            <div key={albumID} className="slide" tabIndex="-1" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                <div className="cover-slide" tabIndex="-1" onKeyDown={handleKeyDown} onFocus={handleInfo}>
                                    <img src={portadaURL} alt={`Cover de ${title}`} />
                                </div>
                                 <div className="info-slide">
                                    <h2 className="title">{title}</h2>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
