function MusicArtist({ data }){
    const [artist, setArtist] = React.useState(null)

    React.useEffect(() => {
        fadeInElement('loader-music', '0', '1', '150ms')
        getMusicArtist(data.artistID)
        .then(response => {
            setArtist(response)
            fadeOutElementDelay('loader-music', '1', '0', '0.2s', '0.5s')
            document.get
        })
    }, [])

    if(!artist){
        return null
    }

    return (
        <div className="content-section-artist" id="content-section-artist" >
            <TopMusicArtist data={artist} />
            <MusicMenuArtist active='music' />
            <AlbumsArtist data={artist} />
            <InfoArtist data={artist} />
        </div>
    )
}

function TopMusicArtist({ data }){
    const { title, portadaURL } = data

    return (
        <div className="artist-content">
            <div className="info-artist">
                <div className="cover">
                    <img src={portadaURL} alt={`Portada de ${title}`} />
                </div>
                <div className="info">Artista: 
                    <div className="artist-title">{`${title}`}</div>
                </div>
            </div>
        </div> 
    )
}

function MusicMenuArtist({ active }){
    const [linkActive, setLinkActive] = React.useState(active)

    const handleClick = (e, section) => {
        if(nativeEventValid(e) && linkActive !== section){
            switch(section){
                case 'musica':
                    fadeOutElement('info-artist', "1", "0", "0.15s")
                    fadeInElement('albums-artist', "0", "1", "0.15s")
                break
                case 'info':
                    fadeOutElement('albums-artist', "1", "0", "0.15s")
                    fadeInElement('info-artist', "0", "1", "0.15s")
                break
            }
        }
    }

    return (
      <div className="music-menu" id="music-menu-artist">
        <ul>
            <li className={`link-music-menu ${linkActive === 'musica' ? 'active' : ''}`} tabIndex="-1" onClick={(e) => handleClick(e, 'musica')} onKeyDown={(e) => handleClick(e, 'musica')}>
                <a href="#"><div className="icon fas fa-music" />Música</a>
            </li>
            <li className={`link-music-menu ${linkActive === 'info' ? 'active' : ''}`} tabIndex="-1" onClick={(e) => handleClick(e, 'info')} onKeyDown={(e) => handleClick(e, 'info')}>
                <a href="#"><div className="icon fas fa-info-circle" />Acerca de</a>
            </li>
        </ul>
      </div>
    )
}

function AlbumsArtist({ data }){
    console.log(data)
    const { albums } = data
    return (
        <div className="content-artist albums-artist" id="albums-artist">
            <AlbumsList data={albums} />
        </div>
    )
}

function InfoArtist({ data }){
    const { description } = data

    return (
        <div className="content-artist info-artist" id="info-artist" style={{ 'opacity': '0', 'display': 'none'}}>
            <div className="description">
                { description }
            </div>
        </div>
    )
}