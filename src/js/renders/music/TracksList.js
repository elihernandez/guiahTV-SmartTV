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
                    tracks.map((track, index) => {
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
                                ReactDOM.render(
                                    <MusicAlbum data={track} />,
                                    document.getElementById('music-album')
                                )

                                fadeElementMusic('music-album')
                            }else{
                                handleMove(e)
                            }
                        }

                        const handleInfo = () => {
                            document.querySelector('.content-title').innerHTML = limitString(title, 40)
                            document.querySelector('.content-subtitle').innerHTML = `${albumTitle} - ${getArtistsTrack(artists)}`
                        }

                        if(index === 0){
                             return (
                                <div key={title} className="slide" tabIndex="-1" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                    <div className="cover-slide" onKeyDown={handleKeyDown} onFocus={handleInfo} data-sn-left="#">
                                        <img src={portadaURL} alt={`Cover de ${title}`} />
                                    </div>
                                </div>
                            )    
                        }

                        if(index === tracks.length - 1){
                             return (
                                <div key={title} className="slide" tabIndex="-1" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                    <div className="cover-slide" onKeyDown={handleKeyDown} onFocus={handleInfo} data-sn-right="#">
                                        <img src={portadaURL} alt={`Cover de ${title}`} />
                                    </div>
                                </div>
                            )    
                        }

                        return (
                            <div key={title} className="slide" tabIndex="-1" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                <div className="cover-slide" onKeyDown={handleKeyDown} onFocus={handleInfo}>
                                    <img src={portadaURL} alt={`Cover de ${title}`} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
