function renderSerie(data, temporadas){
    const element = (
        <div className="container-section">
            <BackgroundSeries data={data}/>
            <div className="catalogue-series">
                <TitleSerie data={data}/>
                <BackgroundSerie data={data}/>
                <div id="seasons-serie" className="seasons">
                    <ul id="list-seasons">
                        <Seasons data={data} temporadas={temporadas}/>
                    </ul>
                </div>
                <div id="chapters-serie" className="chapters">
                    <ul id="list-chapters">
                    </ul>
                </div>
            </div>
        </div>
    )
    
    ReactDOM.render(element, document.getElementById(idSeries));
}

function BackgroundSeries({ data }){
    const { movie } = data
    const { HdBackgroundImageUrl } = movie

    if(sectionALaCartaActive){
        var img = <img src="app/assets/images/backgrounds/background-series-iglesias.webp"></img>
    }
    
    if(sectionZonaKidsActive){
        var img = <img src="app/assets/images/backgrounds/background-series-kids.webp"></img>
    }

    img = <img src={HdBackgroundImageUrl} />

    return (
        <div className="background-section">
            {img}
        </div>
    )
}

function BackgroundSerie({ data }){
    const { movie } = data
    const { Description } = movie

    return (
        <div className="background-serie">
            <h4 className="description-serie">{limitString(Description, 225)}</h4>
            {/*<img src={props.data.movie.HDPosterUrlPortrait}/>*/}
        </div>
    );
}

function TitleSerie({ data }){
    const { movie } = data
    const { Title, Categories } = movie

    return (
        <div className="title-wrapper">
            <h4 className="genre-serie">{Categories}</h4>
            <h3 className="title-serie">{Title}</h3>
        </div>
    )
}

function Seasons(props){

    const seasons = props.temporadas.map((temporada, index) =>
        <Season key={temporada.Title} index={index} length={props.temporadas.length} serie={props.data} temporada={temporada}/>
    );

    return seasons;
}

function Season(props){
    const { index, length } = props
    var id = "season-"+props.index;
    var className = props.index === 0 ? 'title-season active' : 'title-season';
    var data = new Object();
    data['serie'] = props.serie;
    data['season'] = props.temporada;
    data = escape(JSON.stringify(data));

    if(index < length - 1){
        return (
            <li id={id} tabIndex="-1" className={className} onClick={keyDownOnTitleSeason} onKeyDown={keyDownOnTitleSeason} data={data}>
                <i className="fas fa-angle-right"></i>{limitString(props.temporada.Title, 23)}
            </li>
        );
    }else{
        return (
            <li id={id} tabIndex="-1" className={className} data-sn-down="#" onClick={keyDownOnTitleSeason} onKeyDown={keyDownOnTitleSeason} data={data}>
                <i className="fas fa-angle-right"></i>{limitString(props.temporada.Title, 23)}
            </li>
        );
    }

}

function getChapters(data, temporada){
    $.ajax({
        url: urlGetApi+'episode/leon/'+data.movie.ContentTypeOrder+'/temp/'+temporada.TitleSeason+'/'+suscriberId,
        success: function(respuesta) {
            chaptersSerie = respuesta;
            renderChapters(data, respuesta);
            document.getElementById('list-chapters').style.transform = "translateY(0px)";
        },
        error: function(error) {
            
        }
    });
}

function renderChapters(data, chapters){
    ReactDOM.render("", document.getElementById('list-chapters'));

    const element = chapters.map((chapter, index) =>
        <Chapter key={chapter.Title} index={index} length={chapters.length} category={data} chapter={chapter}/>
    );

    ReactDOM.render(element, document.getElementById('list-chapters'));
    navigableSections = ['seasons-serie', 'chapters-serie'];
    focusSection = 'chapters-serie';
    fadeInElement('list-chapters', "0", "1", "0.2s");
    document.getElementById('chapter-0').focus();
}

function Chapter(props){
    const { index, length } = props
    var id = "chapter-"+props.index;
    var data = new Object();
    data['category'] = props.category;
    data['movie'] = props.chapter;
    data = escape(JSON.stringify(data));

    const onKeyDown = (e) => {
        if(pressLeft(e)){
            makeSectionFocus('seasons-serie')
        }else{
            keyDownItemSeries(e)
        }
    }

    if(index < length - 1){
        return (
            <li id={id} className="chapter" tabIndex="-1" onClick={keyDownItemSeries} onKeyDown={onKeyDown} data={data}>
                <div className="background-chapter">
                    <img className="image-chapter" src={props.chapter.HDPosterUrlLandscape} alt=""/>
                    <div className="background-progress"></div>
                    {ProgressBarSerie(data)}
                </div>
                <div className="info-chapter">
                    <h2 className="title-chapter">{props.chapter.Title}</h2>
                    <h3 className="description-chapter">{limitString(props.chapter.Description, 280)}</h3>
                </div>
            </li>
        );
    }else{
        return (
            <li id={id} className="chapter" tabIndex="-1" onClick={keyDownItemSeries} data-sn-down="#" onKeyDown={onKeyDown} data={data}>
                <div className="background-chapter">
                    <img className="image-chapter" src={props.chapter.HDPosterUrlLandscape} alt=""/>
                    <div className="background-progress"></div>
                    {ProgressBarSerie(data)}
                </div>
                <div className="info-chapter">
                    <h2 className="title-chapter">{props.chapter.Title}</h2>
                    <h3 className="description-chapter">{limitString(props.chapter.Description, 280)}</h3>
                </div>
            </li>
        );
    }
}

function ProgressBarSerie(data){
    data = JSON.parse(unescape(data));
    if(data.movie.ResumePos){
        var time = getProgressMovie(data);
        return  (
            <div className="progress-continued">
                <div className="progress-total"></div>
                <div className="progress-actual" style={{width: time}}></div>
            </div>
        );
    }
}