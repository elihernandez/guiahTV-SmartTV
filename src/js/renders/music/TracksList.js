function TracksList({ data, handleMove }){
    const { title, tracks } = data

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

    return (
        <div className="list tracks-list">
            <h1 className="name-list">{title}</h1>
            <div className="carousel">
                {
                    tracks.map((track) => {
                        const { portadaURL, title, albumTitle, artists } = track

                        const getArtistsTrack = (str) => {
                            const array = []
                            str.map((artist, index) => {                               
                                return array.push(artist.title)
                            })

                            return array.join(', ')
                        }

                        const handleKeyDown = (e) => {
                            if(nativeEventValid(e)){
                                isMusicActive = false
                                isMusicAlbumActive = true
                                ReactDOM.render(
                                    <MusicAlbum data={track} />,
                                    document.getElementById('music-album')
                                )
                                fadeOutElement('music-home', '1', '0', '150ms')
                                fadeInElement('music-album', '0', '1', '150ms')
                            }else{
                                handleMove(e)
                            }
                        }

                        const handleInfo = () => {
                            document.querySelector('.content-title').innerHTML = limitString(title, 40)
                            document.querySelector('.content-subtitle').innerHTML = `${albumTitle} - ${getArtistsTrack(artists)}`
                        }

                        return (
                            <div key={title} className="slide" tabIndex="-1" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                <div className="cover-slide" onKeyDown={handleKeyDown} onFocus={handleInfo}>
                                    <img src={portadaURL} alt={`Cover de ${title}`} />
                                </div>
                                {/* <div className="info-slide">
                                    <h2 className="title">{title}</h2>
                                    <h3 className="album">{albumTitle}</h3>
                                </div> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
