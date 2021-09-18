function PlaylistsList({ data, handleMove, listIndex }){
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
        <div className="list playlists-list" id={`list-music-${listIndex}`}>
            <h1 className="name-list">{title}</h1>
            <div className="carousel">
                {
                    playLists.map((track, index) => {
                        const { contentType, portadaURL, title, description } = track

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

                        const handleAddPlaylist = (e) => {
                            if(isPressEnter(e)){
                                fadeElementMusic('add-playlist')
                                document.querySelector('#add-playlist .button').focus()
                            }
                        }

                        const handleInfo = () => {
                            document.querySelector('.content-title').innerHTML = title
                            document.querySelector('.content-subtitle').innerHTML = description != '' ? description : ' sdf'
                        }

                        if(contentType === 'add-playlist'){
                            return (
                                <div key={title} className="slide" tabIndex="-1" onClick={handleAddPlaylist} onMouseOver={handleInfo}>
                                    <div className={`cover-slide cover-slide-${listIndex} button-add-playlist`} onKeyDown={handleAddPlaylist} onFocus={handleInfo} data-sn-left="#">
                                        <div className="container-button">
                                            <div className="icon fas fa-plus"></div>
                                        </div>
                                    </div>
                                </div>
                            )
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
                                <div className="cover-slide" onKeyDown={handleKeyDown} tabIndex="-1" onFocus={handleInfo} data-sn-down={`@list-music-${listIndex + 1}`} data-sn-up={`@list-music-${listIndex - 1}`}>
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