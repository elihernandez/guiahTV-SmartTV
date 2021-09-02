function MusicHome({ data }){
    const { musicSections } = data

    React.useEffect(() => {
        setTimeout(() => {
            SpatialNavigation.makeFocusable('musica')
            document.getElementsByClassName('cover-slide')[0].focus()
            document.getElementById('music-home')
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
                speed: 0,
                autoplay: false,
                arrows: true,
                variableWidth: false,
                adaptiveHeight: false,
                prevArrow: '<div class="slick-prev"><div class="icon fas fa-chevron-up"></div></div>',
                nextArrow: '<div class="slick-next"><div class="icon fas fa-chevron-down"></div></div>'
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
        <React.Fragment>
            <div className="content-info-list">
                <div className="content-title"></div>
                <div className="content-subtitle"></div>
            </div> 
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
        </React.Fragment>
    )
}