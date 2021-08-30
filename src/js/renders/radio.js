function renderRadio(data){
    const element = (
        <div className="container-section">
            <BackgroundOpacity/>
            <LeftSection/>
            <GradientsRadio/>
            <CatalogueRadio/>
        </div>
    );
    ReactDOM.render(element, document.getElementById(idRadio));
}

function BackgroundOpacity(){
    return (
        <div className="background-section"></div>
    )
}

function LeftSection(){
    return (
        <div className="left-section">
            <TitleRadio/>
            <InfoRadio/>
            <AudioRadio/>
        </div>
    )
}

function TitleRadio(){
    return (
        <div className="title-section">
             <h2 className="title">Radio</h2>
            <div className="circle-red"></div>
        </div>
    )
}

function InfoRadio(){
    return (
        <div className="info-radio">
            <h3 id="name-radio" className="name-radio"></h3>
            <h5 id="description-radio" className="description-radio"></h5>
        </div>
    );
}

function AudioRadio(){
    return (
        <div id="radio-player" className="radio-player">
            <audio id="radio-station-audio" className="" type="application/x-mpegURL" autoPlay>
            </audio>
            <div className="group-info-radio">
                <div className="group">
                    <h4 id="info-text-audio" className="info-text"></h4>
                    <h3 id="name-radio-audio" className="name-radio-audio"></h3>
                </div>
                <div className="group-bars">
                    {/* <img className="red-bars" id="radio-bars" src="" style={{display: "none"}}/> */}
                </div>
            </div>
            <img id="img-station" className="img-station" src="" alt=""/>
            <VolumeRadio/>
        </div>
    )
}

class VolumeRadio extends React.Component {
    componentDidMount() {    
        document.getElementById('icon-volume-radio').addEventListener('mouseover', function(e){
            if(isHidden('container-volume-radio')){
                fadeInElement('container-volume-radio', '0', '1', '0.15s');
            }
        })
    }  

    componentWillUnmount() { 
        document.getElementById('icon-volume-radio').removeEventListener('mouseover');
    }

    render(){
        return (
            <div className="icons-radio-container" style={{ display: "none"}}>
                <span>
                    <i id="icon-volume-radio" className="fas fa-volume-up"></i>
                    <div id="container-volume-radio" className="container-volume-radio" style={{display: "none"}}>
                        <div className="content-volume-radio">
                            <div id="progress-volume-radio" className="progress-volume-radio" onMouseDown={activateVolumeChangeRadio}>
                                <div id="current-volume-radio" className="current-volume-radio" >
                                    <div className="drop-volume-radio">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        )
    }
}

function GradientsRadio(){
    return (
        <div className="gradients">
            <div className="gradient-catalogue to-top gradient-6"></div>
        </div>
    );
}

function CatalogueRadio(){
    return (
        <div id="catalogo-radio" className="catalogue catalogue-radio">
            <div className="list">
                <ul className="square">
                    <div className="header-category el-row ai-center ac-center">
                        <h3 className="name-category">Estrenos</h3>
                        <div id="">
                            <h3 className="fs-2">(1/1)</h3>
                        </div>
                    </div>
                    <div className="movies">
                        <li id="" className="item-movie-alacarta"><img src="" alt=""/><div className=""></div></li>
                        <li id="" className="item-movie-alacarta"><img src="" alt=""/><div className=""></div></li>
                        <li id="" className="item-movie-alacarta"><img src="" alt=""/><div className=""></div></li>
                        <li id="" className="item-movie-alacarta"><img src="" alt=""/><div className=""></div></li>
                        <li id="" className="item-movie-alacarta"><img src="" alt=""/><div className=""></div></li>
                        <li id="" className="item-movie-alacarta"><img src="" alt=""/><div className=""></div></li>
                        <li id="" className="item-movie-alacarta"><img src="" alt=""/><div className=""></div></li>
                    </div>
                </ul>
                <ul className="square">
                    <div className="header-category el-row ai-center ac-center">
                        <h3 className="name-category">Estrenos</h3>
                        <div id="">
                            <h3 className="fs-2">(1/1)</h3>
                        </div>
                    </div>
                    <div className="movies">
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                    </div>
                </ul>
                <ul className="square">
                    <div className="header-category el-row ai-center ac-center">
                        <h3 className="name-category">Estrenos</h3>
                        <div id="">
                            <h3 className="fs-2">(1/1)</h3>
                        </div>
                    </div>
                    <div className="movies">
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                        <li id="" className=""><img src="" alt=""/><div className=""></div></li>
                    </div>
                </ul>
            </div>
        </div>
    )
}