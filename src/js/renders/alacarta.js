function renderALaCarta(){
    const element = (
        <div className="container-section">
            <InfoMovieALaCarta/>
            <GradientsALaCarta/>
            <RectangleFocusALaCarta/>
            <CatalogoALaCarta/>
            <BackgroundALaCarta/>
        </div>
    );

    ReactDOM.render(element, document.getElementById(idALaCarta));
}

function InfoMovieALaCarta(){
    return (
        <div id="info-movie-alacarta" className="info-background p-overscan-left p-overscan-top">
            <div className="info">
                <div className="el-row">
                    <h2 className="title"></h2>
                </div>
                <div className="el-row jc-space-between w-40">
                    <div className="group-1 el-row ai-center ac-center w-50">
                        <img className="imdb-movie" src=""/>
                        <h3 className="rating-movie ml-1 mb-"></h3>
                        <h3 className="line-space fs-3 ml-1 mb-2"></h3>
                        <img className="clasification-movie ml-1" src=""/>
                    </div>
                    <div className="el-row jc-center ai-center">
                        <i className="clock fs-3 color-grey-1" aria-hidden="true"></i>
                        <h2 className="duration-movie fs-2 ml-1 mb-2 color-grey-1"></h2>
                        <h3 className="date-movie fs-2 ml-2 mb-2 color-grey-1"></h3>
                    </div>
                </div>
                <div className="el-col text-group description"></div>
                <div className="el-row text-group categories ai-center ac-center"></div>
                <div className="el-row text-group actors ai-center ac-center"></div>
                <div className="el-row text-group director ai-center ac-center"></div>
            </div>
        </div>
    )
}

function GradientsALaCarta(){
    return (
        <div className="gradients">
            <div className="gradient-catalogue to-top gradient-4"></div>
            <div className="gradient-catalogue to-top gradient-5"></div>
            <div className="gradient-catalogue to-top gradient-6"></div>
            <div className="gradient-catalogue to-right gradient-1"></div>
        </div>
    )
}

function RectangleFocusALaCarta(){
    return (
        <div id="rectangle-focus-alacarta" className="rectangle-catalogue p-overscan-left"></div>
    )
}

function CatalogoALaCarta(){
    return (
        <div id="catalogo-alacarta" className="catalogue p-overscan-left"></div>
    )
}

function BackgroundALaCarta(){
    return (
        <div id="background-catalogo-alacarta" className="background full-width">
            <img src="" alt=""/>
        </div>
    )
}