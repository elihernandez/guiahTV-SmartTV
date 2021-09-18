function MusicHome({ data }){
    const { musicSections } = data

    React.useEffect(() => {
        setTimeout(() => {
            SpatialNavigation.makeFocusable('list-music-1')
            SpatialNavigation.makeFocusable('list-music-2')
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
            <div className="catalogue-music" id="catalogue-music"> 
                {
                    musicSections.map((section, index) => {
                        const { contentType, title } = section
                        const listIndex = index + 1

                        switch(contentType){
                            case 'tracks':
                            return <TracksList key={title} data={section} handleMove={handleMove} listIndex={listIndex} />
                            case 'playlists':
                            return <PlaylistsList key={title} data={section} handleMove={handleMove} listIndex={listIndex} />
                            case 'myplaylists':
                            return <MyPlaylistsList key={title} data={section} handleMove={handleMove} listIndex={listIndex} />
                            case 'artists':
                            return <ArtistsList key={title} data={section} handleMove={handleMove} listIndex={listIndex} />
                        }
                    })
                }
            </div>
        </React.Fragment>
    )
}