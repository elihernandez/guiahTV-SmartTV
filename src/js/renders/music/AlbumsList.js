function AlbumsList({ data }){
    console.log(data)

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
            document.querySelector('#albums-artist .cover-slide')[0].focus()
        }, 50)
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
                                isMusicActive = false
                                isMusicArtistActive = true
                                ReactDOM.render(
                                    <MusicArtist data={artist} />,
                                    document.getElementById('music-artist')
                                )
                                fadeOutElement('music-home', '1', '0', '150ms')
                                fadeInElement('music-artist', '0', '1', '150ms')
                            }
                        }

                        const handleInfo = () => {
                            {/* document.querySelector('.content-title').innerHTML = limitString(title, 40)
                            document.querySelector('.content-subtitle').innerHTML = '' */}
                        }

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
