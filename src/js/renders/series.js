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
    console.log(data)

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

function BackgroundSerie(props){
    return (
        <div className="background-serie">
            <img src={props.data.movie.HDPosterUrlPortrait}/>
        </div>
    );
}

function TitleSerie(props){
    return <h3 className="title-serie">{props.data.movie.Title}</h3>;
}

function Seasons(props){
    const seasons = props.temporadas.map((temporada, index) =>
        <Season key={temporada.Title} index={index} serie={props.data} temporada={temporada}/>
    );

    return seasons;
}

function Season(props){
    var id = "season-"+props.index;
    var className = props.index === 0 ? 'title-season active' : 'title-season';
    var data = new Object();
    data['serie'] = props.serie;
    data['season'] = props.temporada;
    data = escape(JSON.stringify(data));

    return (
        <li id={id} tabIndex="-1" className={className} onClick={keyDownOnTitleSeason} onKeyDown={keyDownOnTitleSeason} data={data}>
            <i className="fas fa-angle-right"></i>{props.temporada.Title}
        </li>
    );
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
        <Chapter key={chapter.Title} index={index} category={data} chapter={chapter}/>
    );

    ReactDOM.render(element, document.getElementById('list-chapters'));
    navigableSections = ['seasons-serie', 'chapters-serie'];
    focusSection = 'chapters-serie';
    fadeInElement('list-chapters', "0", "1", "0.2s");
    document.getElementById('chapter-0').focus();
}

function Chapter(props){
    var id = "chapter-"+props.index;
    var data = new Object();
    data['category'] = props.category;
    data['movie'] = props.chapter;
    data = escape(JSON.stringify(data));
    return (
        <li id={id} className="chapter" tabIndex="-1" onClick={keyDownItemSeries} onKeyDown={keyDownItemSeries} data={data}>
            <div className="background-chapter">
                <img className="image-chapter" src={props.chapter.HDPosterUrlLandscape} alt=""/>
                <div className="background-progress"></div>
                {ProgressBarSerie(data)}
            </div>
            <div className="info-chapter">
                <h2 className="title-chapter">{props.chapter.Title}</h2>
                <h3 className="description-chapter">{limitString(props.chapter.Description, 250)}</h3>
            </div>
        </li>
    );
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