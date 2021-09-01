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