function MusicPage({ data }){
    return (
        <div className="content-section" id="music-home">
            <MusicMenu active='home' />
            <div id="content-section-music">
                <div>   
                    <MusicHome data={data} />
                </div>
            </div>
        </div>
    )
}

function MusicMenu({ active }) {
    const [linkActive, setLinkActive] = React.useState(active)

    const handleClick = (e, section) => {
        if(nativeEventValid(e) && linkActive !== section){
            switch(section){
                case 'home':
                    console.log('home')
                    fadeInElement(idLoaderSpinner, "0", "1", "0.2s")
                    getMusicHome()
                    .then(response => {
                        setLinkActive('home')
                        ReactDOM.render("", document.getElementById('content-section-music'))
                        ReactDOM.render(<MusicHome data={response} />, document.getElementById('content-section-music'))
                        fadeOutElementDelay(idLoaderSpinner, "1", "0", "0.2s", "0.5s")
                    })
                    break
                    case 'playlists':
                        console.log('playlists')
                        fadeInElement(idLoaderSpinner, "0", "1", "0.2s")
                        getMyPlaylists()
                        .then(response => {
                            setLinkActive('playlists')
                            const data = {
                                musicSections: [response]
                            }
                        ReactDOM.render("", document.getElementById('content-section-music'))
                        ReactDOM.render(<MusicHome data={data} />, document.getElementById('content-section-music'))
                        fadeOutElementDelay(idLoaderSpinner, "1", "0", "0.2s", "0.5s")
                    })
                    break
            }
        }
    }

    return (
      <div className="music-menu" id="music-menu">
        <ul>
            <li className={`link-music-menu ${linkActive === 'home' ? 'active' : ''}`} tabIndex="-1" onClick={(e) => handleClick(e, 'home')} onKeyDown={(e) => handleClick(e, 'home')}>
                <a href="#">Inicio</a>
            </li>
            <li className={`link-music-menu ${linkActive === 'playlists' ? 'active' : ''}`} tabIndex="-1" onClick={(e) => handleClick(e, 'playlists')} onKeyDown={(e) => handleClick(e, 'playlists')}>
                <a href="#">Playlists</a>
            </li>
        </ul>
      </div>
    )
}

function MusicHome({ data }){
    console.log('Music Home')
    const { musicSections } = data

    React.useEffect(() => {
        setTimeout(() => {
            console.log('use effect')
            SpatialNavigation.makeFocusable('musica')
            document.getElementsByClassName('cover-slide')[0].focus()
        }, 50)
        
            $('.catalogue-music').slick({
                accessibility: false,
                dots: false,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                vertical: true,
                verticalSwiping: false,
                swipeToSlide: false,
                focusOnSelect: false,
                speed: 350,
                autoplay: false,
                arrows: false,
                variableWidth: false,
                adaptiveHeight: false,
            })
    }, [data])

    const handleMove = (e) => {
        if(pressDown(e)){
            $('.catalogue-music').slick('slickNext')
        }

        if(pressUp(e)){
            $('.catalogue-music').slick('slickPrev')
        }
    }

    return (
        <div className="catalogue-music">  
            {
                musicSections.map((section) => {
                    const { contentType } = section
        
                    switch(contentType){
                        case 'tracks':
                        return <TracksList key={section.title} data={section} handleMove={handleMove} />
                        case 'playlists':
                        return <PlaylistsList key={section.title} data={section} handleMove={handleMove} />
                        case 'myplaylists':
                        return <MyPlaylistsList key={section.title} data={section} handleMove={handleMove} />
                    }
                })
            }
        </div>
    )
}

function TracksList({ data, handleMove }){
    const { title, tracks } = data
    console.log('Tracks List')

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

    const handleKeyDown = (e) => {
        handleMove(e)
    }

    return (
        <div className="list tracks-list">
            <h1 className="name-list">{title}</h1>
            <div className="carousel">
                {
                    tracks.map((track) => {
                        const { portadaURL, title, albumTitle } = track

                        return (
                            <div key={title} className="slide">
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

function PlaylistsList({ data, handleMove }){
    const { title, playLists } = data

    console.log('Playlists')

    React.useEffect(() => {
        setTimeout(() => {
            $('.carousel').slick({
                infinite: false,
                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: false,
                speed: 350,
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

                        return (
                            <div key={title} className="slide" tabIndex="-1">
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

function MyPlaylistsList({ data, handleMove }){
    const { title, playLists } = data
    console.log('My Playlists')

    React.useEffect(() => {
        setTimeout(() => {
            $('.carousel').slick({
                infinite: false,
                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: false,
                speed: 350
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

                        return (
                            <div key={title} className="slide" tabIndex="-1">
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