function renderEnvivo(){
    const element = (
        <div className="container-section">
            <ErrorChannel/>
            <ErrorNetworkChannel/>
            <PreviewPoster/>
            <VideoPlayer/>
            <BackgroundOpacityEnVivo/>
            <LoaderSpinnerLiveTv/>
            <TitleChannel/>
            <ExtrasTizenTV/>
            <GuideEnVivo/>
            <InfoChannel/>
        </div>
    );

    ReactDOM.render(element, document.getElementById(idEnVivo));
}

function ErrorChannel(){
    return (
        <div id="error-loader-channel" className="message-failed-channel" style={{display: "none"}}>
            <h3 className="fw-700">Señal no disponible por el momento</h3>
            {/* <h4 className="fw-400">Señal no disponible por el momento</h4> */}
        </div>
    )
}

function ErrorNetworkChannel(){
    return (
        <div id="error-network-channel" className="message-failed-channel" style={{display: "none"}}>
            <h3 className="fw-700">Error de conexión de red, se intentará conectar en un momento</h3>
            {/* <h4 className="fw-400">Señal no disponible por el momento</h4> */}
        </div>
    )
}

function PreviewPoster(){
    return (
        <div id="preview-poster-envivo" className="preview-poster-container" style={{display: "none"}}>
            <img id="preview-poster-image" className="preview-poster-image"/>
        </div>   
    )
}

function VideoPlayer(){
    return (
        <div id="videoEnVivo">
            <video id="sourceVideoEnVivo" autoPlay loop></video>
        </div>
    )
}

function BackgroundOpacityEnVivo(){
    return (
        <div id="background-envivo-opacity" className="background-opacity" style={{display: "none"}}></div>
    )
}

function LoaderSpinnerLiveTv(){
    return (
        <div id="loader-spinner-livetv" className="loader-spinner" style={{display: "none"}}>
            <div className="container">
                <div className="spinner"></div>
            </div>
        </div>
    )
}

function TitleChannel(){
    return (
        <div id="title-channel-livetv" className="title-channel p-overscan" style={{display: "none"}}>
            <div className="container">
                <h3 className="text-channel title">
                    Estás viendo:
                </h3>
                <h4 className="text-channel subtitle" id="info-name-channel"></h4>
            </div>
        </div>
    )
}

function ExtrasTizenTV(){
    return (
        <div id="extras-tizen-tv" className="extras-tizen-tv">
            <div className="container">
                <div className="extra-button">
                    <span>A</span>
                    <p>Más info</p>
                </div>
            </div>
        </div>
    )
}

function renderTitleChannelLiveTv(data){
    const element = (
        <div className="container">
            <h3 className="text-channel title">
                Estás viendo:
            </h3>
            <h4 className="text-channel subtitle" id="info-name-channel">{data.canal.Name}</h4>
        </div>
    )

    ReactDOM.render(element, document.getElementById(idTitleChannelLiveTv));
}

function renderTimeToStartEventLiveTv(data){
    var startTime = moment(data.canal.Inicio);
    var actualTime = moment();
    var h = startTime.diff(actualTime, 'hours');
    var minutes = startTime.diff(actualTime, 'minutes'); 
    var m = minutes - (h * 60);
    if(h == 0 && m == 0){
        var time = "Un momento";
    }else{
        if(h > 0){
            if(m > 0){
                var time = h+" horas y "+m+" minutos";
            }else{
                var time = h+" horas";
            }
        }else{
            var time = m+" minutos";
        }
    }
    const element = (
        <div className="container">
            <h3 className="text-channel title">
                Este evento comienza en:
            </h3>
    <h4 className="text-channel subtitle" id="info-name-channel">{time}</h4>
        </div>
    )

    // console.log(time);

    ReactDOM.render(element, document.getElementById(idTitleChannelLiveTv));
}

function GuideEnVivo(){
    return (
        <div className="guide" id="guide-tvenvivo"></div>
    )
}

function renderGuideEnVivo(response){
    const element = (
        <div id="guide-tvenvivo-container" className="container" style={{display: "none"}}>
            <ContCategory/>
            <IconsLive/>
            <FullScreenIcon/>
            <ul className="nav nav-tabs" id="liveTvTab" role="tablist">
                <CategoriesEnVivo categories={response}/>
            </ul>
            <div className="tab-content" id="liveTvTabContent">
                <CategoriesChannels categories={response}/>
            </div>
        </div>
    )

    ReactDOM.render(element, document.getElementById('guide-tvenvivo'));
}

function FullScreenIcon(){
    return (
        <div className="container-full-screen-icon">
            <span onClick={showInfoChannel}><i className="fas fa-info-circle"></i></span>
            <span>
                <i id="icon-full-screen-livetv" className="fas fa-expand" onClick={fullScreenVideoLiveTv}></i>
            </span>
        </div>
    )
}

function ContCategory(){
    return (
        <div className="container-cont">
            <h4 className="index-channel"></h4>
            <h4 className="text-channel-cont"></h4>
            <h4 className="total-channels"></h4>
        </div>
    )
}

class IconsLive extends React.Component {

    componentDidMount() {    
        document.getElementById('icon-volume-livetv').addEventListener('mouseover', function(e){
            if(isHidden('container-volume-livetv')){
                fadeInElement('container-volume-livetv', '0', '1', '0.15s');
            }
        })
    }  

    componentWillUnmount() { 
        document.getElementById('icon-volume-livetv').removeEventListener('mouseover');
    }

    render() {
        return (
            <div className="icons-live-container">
                <span>
                    <i id="icon-volume-livetv" className="fas fa-volume-up"></i>
                    <div id="container-volume-livetv" className="container-volume-livetv" style={{display: "none"}}>
                        <div className="content-volume-livetv">
                            <div id="progress-volume-livetv" className="progress-volume-livetv" onMouseDown={activateVolumeChangeLiveTv}>
                                <div id="current-volume-livetv" className="current-volume-livetv" >
                                    <div className="drop-volume-livetv">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </span>
                {/* <span><i id="icon-full-screen-livetv" className="fas fa-expand" onClick={fullScreenVideoLiveTv}></i></span> */}
            </div>
        )
    }
}

function CategoriesEnVivo(props){
    const categories = props.categories.map((category, index) =>
        <CategoryEnVivo key={category.category} index={index} category={category}/>
    );

    return categories;
}

function CategoryEnVivo(props){
    dataItemEnVivo['categoria'] = props.category;
    dataItemEnVivo['categoria']['id'] = "litvenvivo-" + props.index;
    var categoryId = "litvenvivo-" + props.index;
    var hrefCategory = "#tvenvivo-" + props.index;
    var ariaControlsCategory = "tvenvivo-" + props.index
   

    if(!lastSectionTv){
        lastSectionTv = "litvenvivo-" + props.index;
    }

    const onClick = () => {
        $(`${hrefCategory}-tab`).tab('show')
    }

    const category = (
        <li key={categoryId} className="nav-item" id={categoryId}>
            <a onClick={onClick} className="nav-link envivo-item" tabIndex="-1" id={`tvenvivo-${props.index}-tab`} data-toggle="tab" href={hrefCategory} role="tab" aria-controls={ariaControlsCategory} aria-selected="true">
                <h5>{props.category.category}</h5>
            </a>
        </li> 
    )

    return category;
}

function CategoriesChannels(props){
    
    const categories = props.categories.map((category, index) =>
        <CategoryChannels key={category.category} index={index} category={category}/>
    );

    return categories;
}

function CategoryChannels(props){
    dataItemEnVivo['categoria'] = props.category;
    dataItemEnVivo['categoria']['id'] = "litvenvivo-" + props.index;
    var idTabPane = "tvenvivo-" + props.index;
    var leftDirectionId = "left-arrrow-direction-"+dataItemEnVivo.categoria.id;
    var rightDirectionId = "right-arrrow-direction-"+dataItemEnVivo.categoria.id;
    var idList = "litvenvivo-list-channels-"+dataItemEnVivo.categoria.id;
    if(props.category.cmData.length){
        var currentRow = 1;
        var numRows = (props.category.cmData.length) / 6;
        if(numRows > 0){
            if(Number.isInteger(numRows)){
                numRows = numRows;
            }else{
                numRows = Math.trunc(numRows) + 1;
            }
        }else{
            numRows = Math.trunc(numRows);
        }
        return (
            <div key={idTabPane} className="tab-pane" id={idTabPane} role="tabpanel" aria-labelledby={`${idTabPane}-tab`}>
                <DirectionIcons category={props.category} index={props.index}/>
                <ul id={idList} className="list-channels">
                    <ChannelsEnVivo category={props.category} index={props.index}/>
                </ul>
                <ArrowsRowsLiveTV leftDirectionId={leftDirectionId} rightDirectionId={rightDirectionId} numRows={numRows} listId={idList}/>
            </div>
        )
    }else{
        return (
            <div key={idTabPane} className="tab-pane fade" id={idTabPane} role="tabpanel">
                <ul className="list-channels empty">
                    <li>No hay eventos en vivo por el momento</li>
                </ul>
            </div>
        )
    }

}

function ArrowsRowsLiveTV({leftDirectionId, rightDirectionId, numRows, listId}){ 
    var currentRow = 1;
    var displayLeft = "none";
    if(numRows == 0 || numRows == 1){
        var displayRight = "none";
    }else{
        var displayRight = "";
    }
    if(isWebBrowser()){
        return (
            <>
                <div id={leftDirectionId} className="direction left" onClick={moveLeftCatalogueLiveTV} rightDirectionId={rightDirectionId} leftDirectionId={leftDirectionId} currentRow={currentRow} numRows={numRows} listId={listId} style={{display: displayLeft}}><i class="fas fa-chevron-left"></i></div>
                <div id={rightDirectionId} className="direction right" onClick={moveRightCatalogueLiveTV} leftDirectionId={leftDirectionId} rightDirectionId={rightDirectionId} currentRow={currentRow} numRows={numRows} listId={listId} style={{display: displayRight}}><i class="fas fa-chevron-right"></i></div>
            </>
        )
    }

    return "";
}

function DirectionIcons(props){
    var directionsId = "direction-icons-litvenvivo-" + props.index;
    return (
        <div key={directionsId} id={directionsId} className="directions-icons">
            <div className="contenedor">
                <span className="chevron-left"><i className="fas fa-chevron-left"></i></span>
                <span className="chevron-right"><i className="fas fa-chevron-right"></i></span>
            </div>
        </div>
    )
}

function ChannelsEnVivo(props){
    const channels = props.category.cmData.map((channel, index) =>
        <ChannelEnVivo key={channel} indexChannel={index} indexCategory={props.index} category={props.category} channel={channel}/>
    );

    return channels;
}

function ChannelEnVivo(props){
    dataItemEnVivo['canal'] = props.channel;
    dataItemEnVivo['canal']['indexChannel'] = props.indexChannel + 1;
    dataItemEnVivo['canal']['totalChannels'] = props.category.cmData.length;
    dataItemEnVivo['canal']['lastChannelTv'] = 'tvenvivo-'+props.indexCategory+'-'+props.indexChannel;
    dataItemEnVivo['canal']['progressBarId'] = 'tvenvivo-'+props.indexCategory+'-'+props.indexChannel+"-progress-bar";

    if (!firstChannel && props.indexCategory == 0 && props.indexChannel == 0) {
        var data = new Object();
        data['categoria'] = props.category;
        data['canal'] = props.channel
        firstChannel = data;
    }
    // dataItemEnVivo.canal.Inicio = moment().add(2, 'm');

    var data = escape(JSON.stringify(dataItemEnVivo));
    var channelId = 'tvenvivo-'+props.indexCategory+'-'+props.indexChannel;
    var dataSnUp = "#tvenvivo-"+props.indexCategory+"-tab";
    var progressBarId = 'tvenvivo-'+props.indexCategory+'-'+props.indexChannel+"-progress-bar";

    if(isEvent(props.channel.ContentType)){

        var channel = (
            <li key={channelId} className="item channel-item" id={channelId} tabIndex='-1' data-sn-up={dataSnUp} data={data} onKeyDown={keyDownOnChannelEnVivo} onFocus={focusOnChannelLiveTv}>
                    <div className="post-content">
                        <img onError={errorPosterChannel} src={props.channel.Poster}/>
                        <div className="background-opacity"></div>
                        <GetProgressTimeEvent id={progressBarId} channel={props.channel} category={props.category}/>
                    </div>
                    <div className="info-channel">
                        <h3 className="fw-500">{props.channel.Name}</h3>
                        <GetEventTime channel={props.channel} category={props.category}/>
                        <h5 className="fw-400">{limitString(props.channel.Description, 120)}</h5>
                    </div>
                <div className="channel-content" onClick={clickOnChannelLiveTv} data={data}>
                </div>
            </li>
        )
    }else{
        var channel = (
            <li key={channelId} className="item channel-item" id={channelId} tabIndex='-1' data-sn-up={dataSnUp} data={data} onKeyDown={keyDownOnChannelEnVivo} onClick={clickOnChannelLiveTv} onFocus={focusOnChannelLiveTv}>
                <div className="post-content">
                    <img onError={errorPosterChannel} src={props.channel.Poster}/>
                </div>
                <div className="info-channel">
                    <h3 className="fw-500">{props.channel.Name}</h3>
                    <h5 className="fw-400">{limitString(props.channel.Description, 120)}</h5>
                </div>
                <div className="channel-content" onClick={clickOnChannelLiveTv} data={data}>
                </div>
            </li>
        )
    }
   

    return channel;
}

function errorPosterChannel(e){
    e.target.classList.add('image-recover');
    e.target.src = "app/assets/images/logos/guiahtv/guiahtvlogo.png"
}

function limitString(string, limit){
    if(string.length > limit){
        string = string.substring(0, limit);   
    }

    return string;
}

function GetProgressTimeEvent(props){
    if(isLive(dataItemEnVivo)){
        // console.log(dataItemEnVivo);
        var startTime = moment(props.channel.Inicio);
        var endTime = moment(props.channel.Fin);
        var duration = endTime.diff(startTime, 'm');
        var actualTime = moment();
        var position = actualTime.diff(startTime, 'm');
        var time = ((position * 100) / duration)+"%";
        
        return (
            <div className="progress-bar-content">
                <span id={props.id} className="progress-bar" style={{width: time}}></span>
            </div>
        )
    }
    return "";
}

function GetEventTime(props){
    // var resolvedOptions = Intl.DateTimeFormat().resolvedOptions();
    // var timezone = resolvedOptions.timeZone;
    var d = moment(props.channel.Inicio);
    
    var hh = moment(d).hours();
    var m = moment(d).minutes();
    var s = moment(d).seconds();
    var dd = " AM";
    var h = hh;

    if (h >= 12) {
    h = hh - 12;
    dd = " PM";
    }
    if (h == 0) {
    h = 12;
    }

    // h = h < 10 ? "0" + h : h;

    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    var StartTime = h + ":" + m + dd;

    var d = moment(props.channel.Fin);
    var hh = moment(d).hours();
    var m = moment(d).minutes();
    var s = moment(d).seconds();
    var dd = " AM";
    var h = hh;
    
    if (h >= 12) {
        h = hh - 12;
        dd = " PM";
    }
    if (h == 0) {
        h = 12;
    }

    // h = h < 10 ? "0" + h : h;

    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    var EndTime = h + ":" + m + dd;

    return (
        <div className="event-time-content">
            <i className="fas fa-clock"></i>
            <h4 className="fw-500">{StartTime + " - " + EndTime}</h4>
        </div>
    )
}

function getUtcOffsetLocal(){
    // if(moment().tz('America/Los_Angeles').utcOffset()/60 > 0){
    // if((moment().utcOffset())/60 > 0){
    //     var utcOffsetLocal = "UTC+"+(moment().utcOffset()/60);
    // }else{
    //     var utcOffsetLocal = "UTC"+(moment().utcOffset()/60);
    // }
    var utcOffsetLocal = "UTC"+(moment().utcOffset()/60);

    return utcOffsetLocal;
}

function InfoChannel(){
    return (
        <div id="more-info-channel" className="more-info-channel" style={{display: "none"}}>
            <div className="container">

            </div>
        </div>
    )
}

function getInfoChannel(data){
    const contactID = data.canal.ContactID;
    $.ajax({
        timeout: timeoutGetApi,
        url: "https://lap55.com/json/api/getinfo/contactid/"+contactID,
        success: function(response) {
          infoChannelLiveTV(response);
        },
        error: function(error) {
        infoChannelLiveTV(response, error);
        }
    });
    // const element = (
    //     <div className="container">
            
    //     </div>
    // );

    // ReactDOM.render(element, document.getElementById("more-info-channel"));
}

function infoChannelLiveTV(data, error){
    if(error){

    }else{
        const element = (
            <div className="container">
                <div className="close-channel">
                    <span onClick={hideInfoChannel}><i class="fas fa-times"></i></span>
                </div>
                <div className="title-channel">
                    <h3 className="text">{data.ContactTitle}</h3>
                </div>
                <div className="poster-channel">
                    <img src={data.ContactImg}/>
                </div>
                <div className="description-channel">
                    <h4 className="text">{data.ContactDescription}</h4>
                </div>
                <div className="contact-info-channel">
                    <div>
                        <i class="fas fa-phone-alt"></i>
                        <p>{data.ContactFon}</p>
                    </div>
                    <div>
                        <i class="fas fa-globe"></i>
                        <p>{data.ContactWeb}</p>
                    </div>
                    <div className="icon-tizen">
                        <i class="fab fa-facebook"></i>
                        <p>/{data.ContactFb}</p>
                    </div>
                    <div className="icon-tizen">
                        <i class="fab fa-instagram"></i>
                        <p>/{data.ContactIG}</p>
                    </div>
                    <div className="icon-tizen">
                        <i class="fab fa-twitter-square"></i>
                        <p>/{data.ContactTw}</p>
                    </div>
                </div>
                <div className="social-media-channel">
                    <a href={'https://www.facebook.com/'+data.ContactFb} target="_blank"><i class="fab fa-facebook-square"></i></a>
                    <a href={'https://www.instagram.com/'+data.ContactIG} target="_blank"><i class="fab fa-instagram-square"></i></a>
                    <a href={'https://twitter.com/'+data.ContactTw} target="_blank"><i class="fab fa-twitter-square"></i></a>
                </div>
            </div>
        )

        ReactDOM.render(element, document.getElementById("more-info-channel"));
    }

}