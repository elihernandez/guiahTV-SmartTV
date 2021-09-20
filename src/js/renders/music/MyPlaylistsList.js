function MyPlaylistsList({ data, handleMove, listIndex }){
    const { title, playLists } = data

    React.useEffect(() => {
        setTimeout(() => {
            try{
                SpatialNavigation.add(`list-music-${listIndex}`, {
                    selector: `.cover-slide-${listIndex}`,
                    rememberSource: true,
                    enterTo: 'last-focused',
                    disabled: false
                })
            }catch{}
            
            $('.carousel').slick({
                accessibility: false,
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
                    playLists.map((track, index) => {
                        const { portadaURL, title, description } = track
                        
                        const handleKeyDown = (e) => {
                            if(nativeEventValid(e)){
                                ReactDOM.render(
                                    <MusicPlaylist data={track} />,
                                    document.getElementById('music-album')
                                )

                                fadeElementMusic('music-album')
                            }else{
                                handleMove(e)
                            }
                        }

                        const handleInfo = () => {
                            document.querySelector('.content-title').innerHTML = title
                            console.log(description)
                            document.querySelector('.content-subtitle').innerHTML = description != '' ? description : ' g '
                        }

                        if(index === 0){    
                            return (
                                <div key={title} className="slide" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                    <div className={`cover-slide cover-slide-${listIndex}`} tabIndex="-1" onKeyDown={handleKeyDown} onFocus={handleInfo} data-sn-left="#" data-sn-down={`@list-music-${listIndex + 1}`} data-sn-up={`@list-music-${listIndex - 1}`}>
                                        <img src={portadaURL} alt={`Cover de ${title}`} />
                                    </div>
                                </div>
                            )
                        }

                        if(index === playLists.length - 1){    
                            return (
                                <div key={title} className="slide" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                    <div className={`cover-slide cover-slide-${listIndex}`} tabIndex="-1" onKeyDown={handleKeyDown} onFocus={handleInfo} data-sn-right="#" data-sn-down={`@list-music-${listIndex + 1}`} data-sn-up={`@list-music-${listIndex - 1}`}>
                                        <img src={portadaURL} alt={`Cover de ${title}`} />
                                    </div>
                                </div>
                            )
                        }

                        return (
                            <div key={title} className="slide" onClick={handleKeyDown} onMouseOver={handleInfo}>
                                <div className={`cover-slide cover-slide-${listIndex}`} tabIndex="-1" onKeyDown={handleKeyDown} onFocus={handleInfo} data-sn-down={`@list-music-${listIndex + 1}`} data-sn-up={`@list-music-${listIndex - 1}`}>
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