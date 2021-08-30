// function renderMenuPrincipal(spotlight, sections, callback){
//     const element = (
//         <div className="container-section">
//             <Spotlight data={spotlight}/>
//             <div id="secciones">
//                 <div id="lista" className="lista">
//                     <Sections data={sections}/>
//                 </div>
//             </div>
//         </div>
//     );
//     ReactDOM.render(element, document.getElementById(idMenuPrincipal));
//     return callback();
// }

// function renderSpotlight(data){
//     var element = (
//        <Spotlight data={data}/>
//     )   
//     ReactDOM.render(element, document.getElementById(idSpotlight));
// }

// function Spotlight(props){
//     return (
//         <div id="spotlight" className="spotlight-control" tabIndex="-1" data-sn-left="#spolight" data-sn-right="#spotlight" onKeyDown={keyDownOnSpotlight}>
//             <div id="carouselSpotlight" className="carousel slide" data-ride="carousel">
//                 <ol className="carousel-indicators">
//                     <CarouselIndicators data={props.data}/>
//                 </ol>
//                 <div className="carousel-inner" role="listbox">
//                     <Images data={props.data}/>
//                 </div>
//                 <CarouselControls/>
//             </div>
//         </div>
//     );
// }

// function CarouselIndicators(props){
//     var indicators = props.data.map((image, index) =>
//         <Indicator key={index} index={index}/>
//     );
//     return indicators;
// }

// function Indicator(props){
//     var className = props.index === 0 ? 'active' : '';
//     return <li key={props.index} data-target="#myCarousel" data-slide-to={props.index} className={className}></li>
// }

// function CarouselControls(){
//     return (
//         <div>
//             <a className="left carousel-control focusable" data-sn-left="#buttonPrev" data-sn-up="#button-right-menu" href="#myCarousel" role="button" data-slide="prev" id="buttonPrev">
//                 <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
//                 <span className="sr-only">Previous</span>
//             </a>
//             <a className="right carousel-control focusable" data-sn-right="#buttonNext" href="#myCarousel" role="button" data-slide="next" id="buttonNext">
//                 <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
//                 <span className="sr-only">Next</span>
//             </a>
//         </div>
//     );
// }

// function Images(props){
//     var images = props.data.map((image, index) =>
//         <Image key={index} data={image} index={index}/>
//     );
//     return images;
// }

// function Image(props){
//     if(props){
//         var className = props.index === 0 ? 'item active' : 'item ';
//         return (
//             <div className={className}>
//                 <img src={props.data.ImgLandscape}/>
//                 <div className="carousel-caption"></div>
//             </div>
//         );
//     }
// }

// function renderSections(data){
//     var element = (
//         <div id="lista" className="lista">
//             <Sections data={data}/>
//         </div>
//      );
//     ReactDOM.render(element, document.getElementById(idSectionsMenu));
// }

// function Sections(props){
//     var sections = props.data.map((section, index) =>
//         <Section key={index} index={index} data={props.data} section={section}/>
//     );
//     return sections;
// }

// function Section(props){
//     var lastItem = props.data.length - 1;
//     var dataLeft = "#section-"+lastItem;
//     var dataRight = "#section-0";
//     var id = "section-"+props.index;
//     var data = new Object();
//     data['section'] = props.section;
//     data['idSection'] = props.index;
//     var data = escape(JSON.stringify(data));
//     if(props.section.orden != 3){
//         if (props.index == 0) {
//             return (
//                 <div className="item section-menu" id={id} tabIndex="-1" data-sn-up="#spotlight" data-sn-left={dataLeft} onKeyDown={keyDownSectionMenu} onClick={clickSectionMenu} data={data}>
//                     <img src={props.section.PosterCardUrlLandscape} className="card-img-top"/>
//                     <h3 className="text-section">{props.section.titulo}</h3>
//                 </div>
//             );
//         }else if (props.index == lastItem) {
//             return (
//                 <div className="item section-menu" id={id} tabIndex="-1" data-sn-up="#spotlight" data-sn-right={dataRight} onKeyDown={keyDownSectionMenu} onClick={clickSectionMenu} data={data}>
//                     <img src={props.section.PosterCardUrlLandscape} className="card-img-top"/>
//                     <h3 className="text-section">{props.section.titulo}</h3>
//                 </div>
//             );
//         }else{
//             return (
//                 <div className="item section-menu" id={id} tabIndex="-1" data-sn-up="#spotlight" onKeyDown={keyDownSectionMenu} onClick={clickSectionMenu} data={data}>
//                     <img src={props.section.PosterCardUrlLandscape} className="card-img-top"/>
//                     <h3 className="text-section">{props.section.titulo}</h3>
//                 </div>
//             ); 
//         }
//     }

//     return "";
// }

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

    componentDidMount() {
        spotlight = new Carousel("carousel-spotlight", "6500");
        spotlight.init();
    }

    componentDidUpdate() {
        spotlight.init();
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
}