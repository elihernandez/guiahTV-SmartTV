class MenuPrincipal extends React.Component {
    render()  {
        return (
            <div className="container-section">
                <div id="spotlight">
                </div>
                <div id="sections">
                    
                </div>
            </div>
        )
    }
}

class Spotlight extends React.Component{
    constructor(props) {
        super(props);
        this.state = { data: {}, loading: true }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)){
            return true;
        }
        
        spotlight.init();
        return false;
    }

    componentDidMount() {
        spotlight = new Carousel("carousel-spotlight", "6500");
        spotlight.init();
    }

    componentDidUpdate() {
        spotlight.init();
    }

    render() {  
        var data = this.props.data;
        const content = data.map((item, index) =>
            CarouselContent(item, index)
        );

        const indicators = data.map((item, index) =>
            CarouselIndicators(item, index, data)
        );

        const element = (
            <div className="carousel-spotlight" id="carousel-spotlight" tabIndex="-1" data-sn-left="#" data-sn-right="#" onKeyDown={keyDownOnSpotlight}>
                <div className="carousel-content">
                    {content}
                </div>
                <div className="carousel-indicators">
                    <ol>
                        {indicators}
                    </ol>
                </div>
                <div className="carousel-control-prev" onClick={spotlightControlPrev}>
                    <i className="fas fa-angle-left"></i>
                </div>
                <div className="carousel-control-next" onClick={spotlightControlNext}>
                    <i className="fas fa-angle-right"></i>
                </div>
            </div>
        )

        return element;
    }  
}

function CarouselContent(item, index){
    var id = "carousel-spotlight-item-"+index;
    var className = index === 0 ? "carousel-item active" : "carousel-item no-active";
    return (
        <div id={id} className={className}>
            <img src={item.ImgLandscape} alt=""/>
        </div>
    )
}

function CarouselIndicators(item, index, data){
    var length = data.length - 1;
    var className = index === 0 ? "indicator active" : "indicator";
    var id = "spotlight-carousel-indicator-"+index;
    if(index == 0){
        var direction = "#spotlight-carousel-indicator-"+length;
        return (
            <li id={id }className={className} tabIndex="-1" data-sn-left={direction}></li>
        )
    }else if(index == length){
        var direction = "#spotlight-carousel-indicator-0";
        return (
            <li id={id }className={className} tabIndex="-1" data-sn-right={direction}></li>
        )
    }else{
        return (
            <li id={id }className={className} tabIndex="-1"></li>
        )
    }
}

class Sections extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: {}, loading: true }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)){
            return true;
        }
        
        return false;
    }

    render() {  
        var data = this.props.data;
        const content = data.map((item, index) =>
            SectionsContent(item, index, data)
        );

        const element = (
            <div className="sections-content">
                {content}
            </div>
        )

        return element;
    }

}

function SectionsContent(item, index, data){
    var id = "section-menu-"+index;
    if(env === "dev"){
        if(item.ContentType != 'leon_ppv'){
            if(index == 0){
                var direction = "#section-menu-4";
                return (
                    <div id={id} className="section-item" tabIndex="-1" datasectionid={index} data-sn-up="#carousel-spotlight" data-sn-left={direction} onKeyDown={keyDownOnSectionMenu} onClick={keyDownOnSectionMenu}>
                        <img src={item.PosterCardUrlLandscape}/>
                        <h2 className="title-section">{item.titulo}</h2>
                    </div>
                )
            }else if(index == 4){
                var direction = "#section-menu-0";
                return (
                    <div id={id} className="section-item" tabIndex="-1" datasectionid={index} data-sn-up="#carousel-spotlight" data-sn-right={direction} onKeyDown={keyDownOnSectionMenu} onClick={keyDownOnSectionMenu}>
                        <img src={item.PosterCardUrlLandscape}/>
                        <h2 className="title-section">{item.titulo}</h2>
                    </div>
                )
            }else{
                return (
                    <div id={id} className="section-item" tabIndex="-1" datasectionid={index} data-sn-up="#carousel-spotlight" onKeyDown={keyDownOnSectionMenu} onClick={keyDownOnSectionMenu}>
                        <img src={item.PosterCardUrlLandscape}/>
                        <h2 className="title-section">{item.titulo}</h2>
                    </div>
                )
            }
        }
    }else{
        if(item.ContentType != 'leon_ppv' && item.ContentType != 'leon_music'){
            if(index == 0){
                var direction = "#section-menu-4";
                return (
                    <div id={id} className="section-item" tabIndex="-1" datasectionid={index} data-sn-up="#carousel-spotlight" data-sn-left={direction} onKeyDown={keyDownOnSectionMenu} onClick={keyDownOnSectionMenu}>
                        <img src={item.PosterCardUrlLandscape}/>
                        <h2 className="title-section">{item.titulo}</h2>
                    </div>
                )
            }else if(index == 4){
                var direction = "#section-menu-0";
                return (
                    <div id={id} className="section-item" tabIndex="-1" datasectionid={index} data-sn-up="#carousel-spotlight" data-sn-right={direction} onKeyDown={keyDownOnSectionMenu} onClick={keyDownOnSectionMenu}>
                        <img src={item.PosterCardUrlLandscape}/>
                        <h2 className="title-section">{item.titulo}</h2>
                    </div>
                )
            }else{
                return (
                    <div id={id} className="section-item" tabIndex="-1" datasectionid={index} data-sn-up="#carousel-spotlight" onKeyDown={keyDownOnSectionMenu} onClick={keyDownOnSectionMenu}>
                        <img src={item.PosterCardUrlLandscape}/>
                        <h2 className="title-section">{item.titulo}</h2>
                    </div>
                )
            }
        }
    }

}