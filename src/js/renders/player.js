var dataMovie = new Object();
function renderAudios(tracks){
    if(tracks.length){
        var element = (
            <ul id="audio-tracks-player" className="audio-tracks">
                {tracks.map((track, index) => AudioTrack(tracks, track, index)) }
            </ul>
        );
    
        ReactDOM.render(element, document.getElementById(idAudioTracksPlayer));
    }
}

function AudioTrack(tracks, track, index){
    var id = 'audio-track-'+index;
    var data = new Object();
    data['index'] = track.id;
    data['id'] = id;
    data['track'] = track;
   
    return (
        <li key={track.url} id={id} className="text-track-item" tabIndex="-1" data={escape(JSON.stringify(data))} onKeyDown={keyDownAudioTrackPlayer} onClick={clickAudioTrackPlayer}>
            <h4>{MaysPrimera((track.name).toLowerCase())}</h4>
            <i class="fas fa-check"></i>
        </li>
    );
}

function clearAudios(){
    var element = (
        <ul id="audio-tracks-player" className="audio-tracks">
            <li id="audio-track-0" class="text-track-item active" tabindex="-1">
                <h4>Español</h4>
                <i class="fas fa-check"></i>
            </li>
        </ul>
    );
    ReactDOM.render(element, document.getElementById(idAudioTracksPlayer));
}

function renderSubtitles(tracks){
    if(tracks.length){
        var id = 'subtitle-track-deactivate';
        var data = new Object();
        data['index'] = -1;
        data['id'] = id;

        var element = (
            <ul id="subtitle-tracks-player" class="subtitle-tracks">
                <li key={id} id={id} className="text-track-item" tabIndex="-1" data={escape(JSON.stringify(data))} onKeyDown={keyDownSubtitleTrackPlayer} onClick={clickSubtitleTrackPlayer}>
                    <h4>Desactivados</h4>
                    <i class="fas fa-check"></i>
                </li>
                {tracks.map((track, index) => SubtitleTrack(track, index)) }
            </ul>
        );
    
        ReactDOM.render(element, document.getElementById(idSubtitleTracksPlayer));
    }
}

function SubtitleTrack(track, index){
    var id = 'subtitle-track-'+index;
    var data = new Object();
    data['index'] = track.id;
    data['id'] = id;
    data['track'] = track;

    return (
        <li key={track.url} id={id} className="text-track-item" tabIndex="-1" data={escape(JSON.stringify(data))} onKeyDown={keyDownSubtitleTrackPlayer} onClick={clickSubtitleTrackPlayer}>
            <h4>{MaysPrimera((track.name).toLowerCase())}</h4>
            <i class="fas fa-check"></i>
        </li>
    );
}

function clearSubtitles(){
    var element = (
        <ul id="subtitle-tracks-player" class="subtitles-tracks">
            <li class="">
                <h4>No hay subtítulos disponibles</h4>
            </li>
        </ul>
    );
    ReactDOM.render(element, document.getElementById(idSubtitleTracksPlayer));
}

function MaysPrimera(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}