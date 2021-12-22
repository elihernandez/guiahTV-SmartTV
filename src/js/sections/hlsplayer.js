var actualVideo,
	videoPlayer = 'video-player',
	rewindSeconds = 30,
	forwardSeconds = 30,
	stepRewindSeconds = 300,
	stepForwardSeconds = 300,
	idVideoPlayerControls = 'video-player-controls',
	videoPlayerActive = null,
	playingVideo = null,
	textTracksPanelActive = null,
	previousSection,
	timeHidePlayer = 5000,
	hidePlayer = null,
	idTextTracksContainer = 'text-tracks-container',
	idTextTracksBackground = 'text-tracks-background',
	idTextTracksPanel = 'text-tracks-panel',
	idAudioTracksPlayer = 'audio-tracks-player',
	idSubtitleTracksPlayer = 'subtitle-tracks-player', 
	idVideoButtonBack = 'video-button-back',
	videoTag = document.getElementById(videoPlayer),
	videoTagSrc,
	hls,
	timeoutErrorMovie = null,
	isShowInfoPlayer = false,
	timeToErrorMovie = 30000,
	errorVideo,
	dragVolume,
	timeIntervalReconectNetworkMovies = null
var config = {
	debug: true,
	defaultAudioCodec: 'avc1.4d401f, mp4a.40.2'
} 

// Se inicia la película
function playVideo(data, prevSection){
	hideMagicButtonBack()
	getVideoApi(data)
	actualVideo = data
	previousSection = prevSection
	videoPlayerActive = true
}

// Petición para obtener la película
function getVideoApi(data){
	$.ajax({
		timeout: timeoutGetApi,
		// url: 'https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8',
		url: urlGetApi+'cmd/getLinkLeon/'+data.movie.Registro+'/'+suscriberId,
		success: function(response) {
			if(validateStatusCode(response, idVideoALaCarta)){
				if(isM3U8(response.Url)){
					setupPlayer(response)
				}else{
					videoTag.src = response.Url
					videoTag.addEventListener('canplay',function() {
						videoTag.play()
						fadeOutElement(idLoaderSpinner, '1', '0', '0.3s')   
						fadeInElement(idVideoALaCarta, '0', '1', '0.3s')
					})
				}
				// if(response.StatusCode == 3){
				// }else{
				//     setupPlayer(response);
				// }
			}
		},
		error: function() {
			showErrorVideoStatus()
			errorVideo = true
		}
	})
}

// Muestra el mensaje de error cuando falló en la petición al video
function showErrorVideoStatus(){
	focusSection = idErrorVideoStatus
	fadeOutElement('video-player', '1', '0', '0.1s')
	fadeOutElement(idLoaderSpinner, '1', '0', '0.3s')
	fadeInElement(idErrorVideoStatus, '0', '1', '0.3s')
}

function playingVideoTag(){
	fadeOutElement(idLoaderSpinner, '1', '0', '0.3s')
	hidePlayerControls()
	clearTimeout(timeoutErrorMovie)
	playingVideo = true
}

function pauseVideoTag(){
	clearTimeout(hidePlayer)
	playingVideo = false 
}

function waitingVideoTag(){
	playingVideo = false
	onErrorMovie()
	fadeInElement(idLoaderSpinner, '0', '1', '0.3s')
	clearTimeout(hidePlayer)
}

function timeupdateVideoTag(){
	if(positionSeek == 0){
		var position = videoTag.currentTime
		var duration = videoTag.duration
		var time = (position * 100) / duration
		if(position == duration || position > duration){
			backToPreviousSection(13)
		}else{
			var hours = Math.floor(position / 3600)  
			var minutes = Math.floor((position % 3600) / 60)
			var seconds = Math.floor(position % 60)
    
			// Anteponiendo un 0 a los minutos si son menos de 10 
			minutes = minutes < 10 ? '0' + minutes : minutes
			// Anteponiendo un 0 a los segundos si son menos de 10 
			seconds = seconds < 10 ? '0' + seconds : seconds

			// $("#video-alacarta .player-controls .progress-bar-container .progress-time").css("width", time+"%");

			document.querySelector('.progress-time').style.width = time+'%'
            
			if (hours < 1) {
				// $("#video-alacarta .player-controls .buttons-container .time-movie .actual-time").html(minutes + ":" + seconds);
				document.querySelector('.actual-time').innerHTML = minutes + ':' + seconds
			}else{
				// $("#video-alacarta .player-controls .buttons-container .time-movie .actual-time").html(hours + ":" + minutes + ":" + seconds);
				document.querySelector('.actual-time').innerHTML = hours + ':' + minutes + ':' + seconds
			}
            
			var hours = Math.floor( duration / 3600 )  
			var minutes = Math.floor( (duration % 3600) / 60 )
			var seconds = Math.floor(duration % 60)
            
			// Anteponiendo un 0 a los minutos si son menos de 10 
			minutes = minutes < 10 ? '0' + minutes : minutes
			// Anteponiendo un 0 a los segundos si son menos de 10 
			seconds = seconds < 10 ? '0' + seconds : seconds

			if (hours < 1) {
				var result = minutes + ':' + seconds  // 41:30
				document.querySelector('.duration-movie-hls').innerHTML = result
				// $("#video-alacarta .player-controls .buttons-container .time-movie .duration-movie").html(result);
			}else{
				var result = hours + ':' + minutes + ':' + seconds  // 2:41:30
				document.querySelector('.duration-movie-hls').innerHTML = result
				// $("#video-alacarta .player-controls .buttons-container .time-movie .duration-movie").html(result);
			}
    
			if(!isShowInfoPlayer){
				// if(!errorVideo){
				resumeVideo()
				fadeOutElement('button-volume-container', '1', '0', '0.15s')
				fadeOutElement(idLoaderSpinner, '1', '0', '0.3s')   
				fadeInElement(idVideoALaCarta, '0', '1', '0.3s')
				showPlayerControls()
				isShowInfoPlayer = true
				setAudioTrack(hls.audioTracks)
				setSubtitlesTrack(hls.subtitleTracks)
				// }
			}
		}
        
	}
}

function errorVideoTag(event){
	// console.log(event)
}

function setupPlayer(response){
	videoTagSrc = response.Url
	// var re ='playlist.m3u8';
	// var str = videoTagSrc;
	// var url = str.replace(re, "manifest.mpd");
	// console.log(url);
	// videoTagSrc = 'http://amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest(format=m3u8-aapl)';

	if(Hls.isSupported()){
		hls = new Hls()
		hls.detachMedia()
		hls.attachMedia(videoTag)
		if(isHidden('video-player')){
			fadeInElement('video-player', '0', '1', '0.1s')
		}
		// videoTag.setAttribute("preload", "none");
		hls.on(Hls.Events.MEDIA_ATTACHED, function () {
			hls.loadSource(videoTagSrc)
			hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
				console.log(data)
				// console.log("Manifest Parsed");
				videoTag.addEventListener('playing', playingVideoTag)
				videoTag.addEventListener('pause', pauseVideoTag)
				videoTag.addEventListener('waiting', waitingVideoTag)
				videoTag.addEventListener('timeupdate', timeupdateVideoTag)
				videoTag.addEventListener('error', errorVideoTag)
				initVideoPlayer()
				resumeVideo() 
			})
		})
		hls.on(Hls.Events.ERROR, function(event, data){
			console.log(data)
			if(data.details == 'manifestLoadError'){
				validateErrorHlsMovies()
				errorVideo = true
			}
            
			if(data.details == 'internalException'){
				validateErrorHlsMovies()
				errorVideo = true
			}
		})

		hls.on(Hls.Events.BUFFER_CODECS, function(event, data){
			// console.log(event)
			// console.log(data)
		})

		hls.on(Hls.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR, function(event, data){
			// console.log(event)
			// console.log(data)
		})

		hls.on(Hls.ErrorDetails.BUFFER_ADD_CODEC_ERROR, function(event, data){
			// console.log(event)
			// console.log(data)
		})
	}

	hls.on(Hls.Events.MANIFEST_LOADED, function(event, data){
		// console.log(event)
		// console.log(data)
	})


	hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, function(event, data){
		clearAudios()
		renderAudios(hls.audioTracks)
	})

	hls.on(Hls.Events.AUDIO_TRACK_LOADED, function(event, data){
	})

	hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, function(event, data){
		clearSubtitles()
		renderSubtitles(hls.subtitleTracks)
	})

	// hls.on(Hls.Events.FRAG_BUFFERED, function(event, data){
	//     console.log(event)
	//     console.log(data);
	// })

	// hls.on(Hls.Events.FRAG_LOAD_PROGRESS, function(event, data){
	//     console.log(event)
	//     console.log(data);
	// })

	// hls.on(Hls.Events.FRAG_LOADED, function(event, data){
	//     console.log(event)
	//     console.log(data);
	// })

	// videoTag.oncanplay = function(){
	//     console.log("Can play")
	//     playVid();
	// }

	// videoTag.onplaying = function(){
	//     // console.log("Evento onplaying");
	//     fadeOutElement(idLoaderSpinner, "1", "0", "0.3s");
	//     hidePlayerControls();
	//     clearTimeout(timeoutErrorMovie);
	//     playingVideo = true;
	// }

	// videoTag.onpause = function(){
	//     clearTimeout(hidePlayer);
	//     playingVideo = false; 
	// }

	// videoTag.onwaiting = function(){
	//     playingVideo = false;
	//     onErrorMovie();
	//     fadeInElement(idLoaderSpinner, "0", "1", "0.3s");
	//     clearTimeout(hidePlayer);
	// }

	// videoTag.ontimeupdate = function(){
	//     if(positionSeek == 0){
	//         var position = videoTag.currentTime;
	//         var duration = videoTag.duration;
	//         var time = (position * 100) / duration;
	//         if(position == duration || position > duration){
	//             backToPreviousSection(13);
	//         }else{
	//             var hours = Math.floor(position / 3600);  
	//             var minutes = Math.floor((position % 3600) / 60);
	//             var seconds = Math.floor(position % 60);
        
	//             // Anteponiendo un 0 a los minutos si son menos de 10 
	//             minutes = minutes < 10 ? '0' + minutes : minutes;
	//             // Anteponiendo un 0 a los segundos si son menos de 10 
	//             seconds = seconds < 10 ? '0' + seconds : seconds;
                
	//             $("#video-alacarta .player-controls .progress-bar-container .progress-time").css("width", time+"%");
                
	//             if (hours < 1) {
	//                 $("#video-alacarta .player-controls .buttons-container .time-movie .actual-time").html(minutes + ":" + seconds);
	//             }else{
	//                 $("#video-alacarta .player-controls .buttons-container .time-movie .actual-time").html(hours + ":" + minutes + ":" + seconds);
	//             }
                
	//             var hours = Math.floor( duration / 3600 );  
	//             var minutes = Math.floor( (duration % 3600) / 60 );
	//             var seconds = Math.floor(duration % 60);
                
	//             // Anteponiendo un 0 a los minutos si son menos de 10 
	//             minutes = minutes < 10 ? '0' + minutes : minutes;
	//             // Anteponiendo un 0 a los segundos si son menos de 10 
	//             seconds = seconds < 10 ? '0' + seconds : seconds;
    
                
	//             if (hours < 1) {
	//                 var result = minutes + ":" + seconds;  // 41:30
	//                 $("#video-alacarta .player-controls .buttons-container .time-movie .duration-movie").html(result);
	//             }else{
	//                 var result = hours + ":" + minutes + ":" + seconds;  // 2:41:30
	//                 $("#video-alacarta .player-controls .buttons-container .time-movie .duration-movie").html(result);
	//             }
        
	//             if(!isShowInfoPlayer){
	//                 // if(!errorVideo){
	//                     resumeVideo();
	//                     fadeOutElement('button-volume-container', '1', '0', '0.15s');
	//                     fadeOutElement(idLoaderSpinner, "1", "0", "0.3s");   
	//                     fadeInElement(idVideoALaCarta, "0", "1", "0.3s");
	//                     showPlayerControls();
	//                     setAudioTrack(hls.audioTracks);
	//                     setSubtitlesTrack(hls.subtitleTracks);
	//                     isShowInfoPlayer = true;
	//                 // }
	//             }
	//         }
            
	//     }
	// };
}

function onErrorMovie(){
	clearTimeout(timeoutErrorMovie)
	timeoutErrorMovie = setTimeout(function() {
		validateErrorHlsMovies()
	}, timeToErrorMovie)
}

function validateErrorHlsMovies(){
	if(validateNetwork() === null){
		showErrorVideoStatus()
	}else{
		if(validateNetwork()){
			showErrorVideoStatus()
		}else{
			reconectNetworkMovie()
			showErrorNetkworkMovie()
		}
	}
	// console.log(validateNetwork());
}

function showErrorNetkworkMovie(){
	// hls.stopLoad();
	fadeOutElement('video-player', '1', '0', '0.3s')
	fadeOutElement(idLoaderSpinner, '1', '0', '0.3s')
	fadeInElement('error-network-movie', '0', '1', '0.3s')
}

function reconectNetworkMovie(){
	clearTimeout(timeIntervalReconectNetworkMovies)
	timeIntervalReconectNetworkMovies = setTimeout(function(){
		if(validateNetwork()){
			clearTimeout(timeIntervalReconectNetworkMovies)
			fadeOutElement('error-network-movie', '1', '0', '0.3s')
			fadeInElement('video-player', '0', '1', '0.3s')
			fadeInElement(idLoaderSpinnerLiveTv, '0', '1', '0.3s')
			hls.startLoad()
			videoTag.play()
		}else{
			reconectNetworkMovie()
		}
	}, 5000)
}

function setAudioTrack(tracks){
	if(!tracks){
		var assigned = false
		var defaultAudioLanguage = localStorage.getItem('languageAudio')
		tracks.forEach(function(track, index){
			// console.log(track, index);
			if(track.lang == defaultAudioLanguage){
				var id = 'audio-track-'+index
				hls.audioTrack = index
				toggleActiveTextTrack('.audio-tracks', id)
				assigned = true
			}
		})
		if(!assigned){
			var id = 'audio-track-'+tracks[0].id
			hls.audioTrack = tracks[0].id
			toggleActiveTextTrack('.audio-tracks', id)
		}
	}
}

function setSubtitlesTrack(tracks){
	// console.log(tracks)
	if(!tracks){
		var assigned = false
		var defaultSubtitlesLanguage = localStorage.getItem('languageSubtitles')
		tracks.forEach(function(track, index){
			if(track.lang == defaultSubtitlesLanguage){
				var id = 'subtitle-track-'+index
				hls.subtitleTrack = index
				toggleActiveTextTrack('.subtitle-tracks', id)
				assigned = true
			}
		})
    
		if(!assigned){
			var id = 'subtitle-track-deactivate'
			hls.audioTrack = -1
			toggleActiveTextTrack('.subtitle-tracks', id)
		}
	}
}

function convertToMil(time){
	return time * 1000
}

function initVideoPlayer(){
	// clearAudios();
	// clearSubtitles();
	// console.log("Init Video Player");
	console.log('Hola')
	isShowInfoPlayer = false
	fadeOutElement('bb-video-player', '1', '0', '0.3s')
	document.getElementById('info-name-movie').innerHTML = actualVideo.movie.Title
	document.getElementById('cover-player').src = actualVideo.movie.HDPosterUrlPortrait
	fadeOutTranslateXElement('title-movie-video', '1', '0', '.3s', '0', '0', '0.3s')
	document.querySelector('.button-play').style.display = 'none'
	document.querySelector('.button-pause').style.display = ''
	playVid()
}

function playVid() {      
	// console.log("Hacer play");
	videoTag.play()
	setTimeout(function(){
		// console.log("Se hizo play");
	}, 150)
	// if (videoTag.paused && !playingVideo) {
	// }
} 

function pauseVid() {     
	videoTag.pause()
	// if (!videoTag.paused && playingVideo) {
	// }
}

function showPlayerControls(){
	navigableSections = ['buttons-container', 'progress-bar-container'] 
	focusSection = 'buttons-container'
	fadeInTranslateYElement(idVideoPlayerControls, '0', '1', '.3s', '0', '0', '.3s')
	fadeInTranslateYElement(idVideoButtonBack, '0', '1', '.3s', '0', '0', '.3s')
}

function hidePlayerControls(){
	clearTimeout(hidePlayer)
	hidePlayer = setTimeout(function(){
		fadeOutTranslateYElement(idVideoPlayerControls, '1', '0', '.3s', '0', '0', '.3s')
		fadeOutTranslateYElement(idVideoButtonBack, '1', '0', '.3s', '0', '0', '.3s')
		mouseActive = false
	}, timeHidePlayer)
}

function resumeVideo(){
	if(actualVideo.movie.ResumePos){
		var time = Math.floor(actualVideo.movie.ResumePos / 1000) 
		hls.startLoad(time)
		videoTag.volume = 0.4
		eInner.style.height = '40%'
		playVid()
	}
}

function showBackgroundVideoPlayer(){
	if(isHidden('bb-video-player')){
		fadeInElement('bb-video-player', '0', '1', '0.3s')
	}
}

function showTitleMovieVideo(){
	if(isHidden('title-movie-video')){
		fadeInTranslateXElement('title-movie-video', '0', '1', '.3s', '0', '0', '.3s')
	}
}

function hideBackgroundVideoPlayer(){
	if(isVisible('bb-video-player')){
		fadeOutElement('bb-video-player', '1', '0', '0.3s')
	}
}

function hideTitleMovieVideo(){
	if(isVisible('title-movie-video')){
		fadeOutTranslateXElement('title-movie-video', '1', '0', '.3s', '0', '0', '.3s')
	}
}

function backwardMovie(e){
	if(pressEnter(e)){
		videoTag.currentTime = 0
		document.querySelector('.button-play').style.display = 'none'
		document.querySelector('.button-pause').style.display = ''
		playVid()
	}
}

function pausePlayer(e){
	if(pressEnter(e)){
		pauseVid()
		document.querySelector('.button-pause').style.display = 'none'
		document.querySelector('.button-play').style.display = ''
		$('#video-alacarta .buttons-container .button-play').focus()
		playingVideo = false
		showBackgroundVideoPlayer()
		showTitleMovieVideo()
	}
}

function playPlayer(e){
	if(pressEnter(e)){
		playVid()
		document.querySelector('.button-play').style.display = 'none'
		document.querySelector('.button-pause').style.display = ''
		$('#video-alacarta .buttons-container .button-pause').focus()
		playingVideo = true
		hideBackgroundVideoPlayer()
		hideTitleMovieVideo()
	}
}

function rewindPlayer(e){
	if(pressEnter(e)){
		clearTimeout(timeOutSeek)
		if(!positionSeek){
			var positionVideo = videoTag.currentTime
		}else{
			var positionVideo = positionSeek
		}
		if(positionVideo < rewindSeconds){
			videoTag.currentTime = 0
		}else{
			// videoTag.currentTime = positionVideo - rewindSeconds;
			pauseVid()
			var position = positionVideo - rewindSeconds
			positionSeek = position
			// console.log(positionSeek);
			var duration = videoTag.duration
			var time = (position * 100) / duration
            
			var hours = Math.floor(position / 3600)  
			var minutes = Math.floor((position % 3600) / 60)
			var seconds = Math.floor(position % 60)

			// Anteponiendo un 0 a los minutos si son menos de 10 
			minutes = minutes < 10 ? '0' + minutes : minutes
			// Anteponiendo un 0 a los segundos si son menos de 10 
			seconds = seconds < 10 ? '0' + seconds : seconds
            
			$('#video-alacarta .player-controls .progress-bar-container .progress-time').css('width', time+'%')
            
			if (hours < 1) {
				$('#video-alacarta .player-controls .buttons-container .time-movie .actual-time').html(minutes + ':' + seconds)
			}else{
				$('#video-alacarta .player-controls .buttons-container .time-movie .actual-time').html(hours + ':' + minutes + ':' + seconds)
			}

			timeOutSeek = setTimeout(function(){
				videoTag.currentTime = positionVideo - rewindSeconds
				document.querySelector('.button-play').style.display = 'none'
				document.querySelector('.button-pause').style.display = ''
				playVid()
				positionSeek = 0
			}, 1000)
		}
		// setTimeout(function(){
		//     document.getElementById("button-rewind").focus();
		// }, 10)
	}
}

function forwardPlayer(e){
	if(pressEnter(e)){
		clearTimeout(timeOutSeek)
		if(!positionSeek){
			var positionVideo = videoTag.currentTime
		}else{
			var positionVideo = positionSeek
		}
		// var positionVideo = videoTag.currentTime;
		var durationVideo = videoTag.duration
		if(positionVideo >= durationVideo){
		}else{
			pauseVid()
			var position = positionVideo + forwardSeconds
			positionSeek = position
			// console.log(positionSeek);
			var duration = videoTag.duration
			var time = (position * 100) / duration
            
			var hours = Math.floor(position / 3600)  
			var minutes = Math.floor((position % 3600) / 60)
			var seconds = Math.floor(position % 60)

			// Anteponiendo un 0 a los minutos si son menos de 10 
			minutes = minutes < 10 ? '0' + minutes : minutes
			// Anteponiendo un 0 a los segundos si son menos de 10 
			seconds = seconds < 10 ? '0' + seconds : seconds
            
			$('#video-alacarta .player-controls .progress-bar-container .progress-time').css('width', time+'%')
            
			if (hours < 1) {
				$('#video-alacarta .player-controls .buttons-container .time-movie .actual-time').html(minutes + ':' + seconds)
			}else{
				$('#video-alacarta .player-controls .buttons-container .time-movie .actual-time').html(hours + ':' + minutes + ':' + seconds)
			}

			timeOutSeek = setTimeout(function(){
				videoTag.currentTime = positionVideo + forwardSeconds
				document.querySelector('.button-play').style.display = 'none'
				document.querySelector('.button-pause').style.display = ''
				playVid()
				positionSeek = 0
			}, 1000)
		}
	}
}

var positionSeek = 0
var timeOutSeek

function rfPlayer(e){
	if(pressLeft(e)){
		clearTimeout(timeOutSeek)
		if(!positionSeek){
			var positionVideo = videoTag.currentTime
		}else{
			var positionVideo = positionSeek
		}
		if(positionVideo < stepRewindSeconds){
			videoTag.currentTime = 0
		}else{
			pauseVid()
			var position = positionVideo - stepRewindSeconds
			positionSeek = position
			// console.log(positionSeek);
			var duration = videoTag.duration
			var time = (position * 100) / duration
            
			var hours = Math.floor(position / 3600)  
			var minutes = Math.floor((position % 3600) / 60)
			var seconds = Math.floor(position % 60)

			// Anteponiendo un 0 a los minutos si son menos de 10 
			minutes = minutes < 10 ? '0' + minutes : minutes
			// Anteponiendo un 0 a los segundos si son menos de 10 
			seconds = seconds < 10 ? '0' + seconds : seconds
            
			$('#video-alacarta .player-controls .progress-bar-container .progress-time').css('width', time+'%')
            
			if (hours < 1) {
				$('#video-alacarta .player-controls .buttons-container .time-movie .actual-time').html(minutes + ':' + seconds)
			}else{
				$('#video-alacarta .player-controls .buttons-container .time-movie .actual-time').html(hours + ':' + minutes + ':' + seconds)
			}

			timeOutSeek = setTimeout(function(){
				videoTag.currentTime = positionVideo - stepForwardSeconds
				document.querySelector('.button-play').style.display = 'none'
				document.querySelector('.button-pause').style.display = ''
				playVid()
				positionSeek = 0
			}, 1000)
		}
	}


	if(pressRight(e)){
		clearTimeout(timeOutSeek)
		if(!positionSeek){
			var positionVideo = videoTag.currentTime
		}else{
			var positionVideo = positionSeek
		}
		var durationVideo = videoTag.duration
		if(positionVideo >= durationVideo){
		}else{
			pauseVid()
			var position = positionVideo + stepForwardSeconds
			positionSeek = position
			// console.log(positionSeek);
			var duration = videoTag.duration
			var time = (position * 100) / duration
            
			var hours = Math.floor(position / 3600)  
			var minutes = Math.floor((position % 3600) / 60)
			var seconds = Math.floor(position % 60)

			// Anteponiendo un 0 a los minutos si son menos de 10 
			minutes = minutes < 10 ? '0' + minutes : minutes
			// Anteponiendo un 0 a los segundos si son menos de 10 
			seconds = seconds < 10 ? '0' + seconds : seconds
            
			$('#video-alacarta .player-controls .progress-bar-container .progress-time').css('width', time+'%')
            
			if (hours < 1) {
				$('#video-alacarta .player-controls .buttons-container .time-movie .actual-time').html(minutes + ':' + seconds)
			}else{
				$('#video-alacarta .player-controls .buttons-container .time-movie .actual-time').html(hours + ':' + minutes + ':' + seconds)
			}

			timeOutSeek = setTimeout(function(){
				videoTag.currentTime = positionVideo + stepForwardSeconds
				document.querySelector('.button-play').style.display = 'none'
				document.querySelector('.button-pause').style.display = ''
				playVid()
				positionSeek = 0
			}, 1000)
		}
	}

}

function subtitles(e){
	if(pressEnter(e)){
		showTextTracksPanel()
	}   
}

function keyDownOnIconClosePanel(e){
	if(pressEnter(e)){
		hideTextTracksPanel()
	}
}

function showTextTracksPanel(){
	pausePlayer('13')
	focusSection = 'text-track-panel'
	fadeInElement(idTextTracksContainer, '0', '1', '0.3s')
	fadeInTranslateXElement(idTextTracksPanel, '0', '1', '.3s', '0', '0', '.3s')
	textTracksPanelActive = true
	fadeOutTranslateYElement(idVideoPlayerControls, '1', '0', '.3s', '0', '0', '.3s')
	fadeOutTranslateYElement(idVideoButtonBack, '1', '0', '.3s', '0', '0', '.3s')
}

function hideTextTracksPanel(idElement){
	playPlayer('13')
	fadeOutTranslateXElement(idTextTracksPanel, '1', '0', '.3s', '0', '0', '.3s')
	fadeOutElement(idTextTracksContainer, '1', '0', '0.3s')
	$('#button-subtitles').focus()
	textTracksPanelActive = false
	fadeInTranslateYElement(idVideoPlayerControls, '0', '1', '.3s', '0', '0', '.3s', 'button-subtitles')
	fadeInTranslateYElement(idVideoButtonBack, '0', '1', '.3s', '0', '0', '.3s', 'button-subtitles')
}

function toggleActiveTextTrack(section, idTrack){
	$('#'+idVideoALaCarta+' '+section).children(section).each(function () {
		$(this).children('li').each(function(){
			var id = $(this).attr('id')
			$('#'+id+'').removeClass('active')
		})
	})
	$('#'+idTrack+'').addClass('active')
}

function clickAudioTrackPlayer(e){
	var data = dataNativeEvent(e)
	hls.audioTrack = -1
	hls.audioTrack = data.index
	toggleActiveTextTrack('.audio-tracks', data.id)
}

function clickSubtitleTrackPlayer(e){
	var data = dataNativeEvent(e)
	hls.subtitleTrack = data.index
	toggleActiveTextTrack('.subtitle-tracks', data.id)
}

function keyDownAudioTrackPlayer(e){
	if(pressEnter(e.nativeEvent)){
		var data = dataNativeEvent(e)
		hls.audioTrack = -1
		hls.audioTrack = data.index
		toggleActiveTextTrack('.audio-tracks', data.id)
	}
}

function keyDownSubtitleTrackPlayer(e){
	if(pressEnter(e.nativeEvent)){
		var data = dataNativeEvent(e)
		hls.subtitleTrack = data.index
		toggleActiveTextTrack('.subtitle-tracks', data.id)
	}
}

function keyPressOnSectionVideoPlayer(e){
	if(!errorVideo){
		if(pressBack(e)){
			if($('#'+idTextTracksPanel).is(':visible')){
				hideTextTracksPanel(idTextTracksPanel)
			}else{
				if($('#'+idVideoPlayerControls).is(':hidden')){
					backToPreviousSection(13)
				}else{
					fadeOutTranslateYElement(idVideoPlayerControls, '1', '0', '.3s', '0', '0', '.3s')
					fadeOutTranslateYElement(idVideoButtonBack, '1', '0', '.3s', '0', '0', '.3s')
				}
			}
		}else{
			if($('#'+idTextTracksPanel).is(':hidden')){
				if(playingVideo){
					if($('#'+idVideoPlayerControls).is(':hidden')){
						if(pressEnter(e)){
							pausePlayer('13')
							showPlayerControls()
						}else{
							showPlayerControls()
							hidePlayerControls()
						}
					}else{
						hidePlayerControls()
					}
				}else{
					if($('#'+idVideoPlayerControls).is(':hidden')){
						if(pressEnter(e)){
							playPlayer('13')
						}
						showPlayerControls()
						hidePlayerControls()
					}
				}
			}
		}
	}
}

function pressVideoButtonBack(e){
	if(pressEnter(e)){
		hideTextTracksPanel(idTextTracksPanel)
		backToPreviousSection(13)
	}
}

// Vuelve a la sección anterior (A la carta, Zona kids o Series)
function backToPreviousSection(e){
	if(pressEnter(e)){
		clearSectionVideoPlayer()
		errorVideo = false
		if (document.exitFullscreen) {
			document.exitFullscreen() 
			document.getElementById('icon-full-screen').classList.remove('fa-compress')
			document.getElementById('icon-full-screen').classList.add('fa-expand')
		}
		fadeOutElement(idVideoALaCarta, '1', '0', '0.2s')
		fadeOutElement(idErrorVideoStatus, '1', '0', '0.2s')
		fadeOutElement('error-network-movie', '1', '0', '0.2s')
		fadeOutTranslateYElement(idVideoPlayerControls, '1', '0', '.3s', '0', '0', '.3s')
		// fadeOutElement(idVideoPlayerControls, "1", "0", "0.3s");
		fadeOutElement(idLoaderSpinner, '1', '0', '0.3s')
    
		// Vuelve a la sección de A La Carta
		if(sectionALaCartaActive && !sectionTemporadasActive){
			focusSection = idALaCarta
			fadeInTranslateXElement(idALaCarta, '0', '1', '.5s', '0', '0', '.5s')
			// console.log(focusSection);
		}
    
		// Vuelve a la sección de Zona Kids
		if(sectionZonaKidsActive && !sectionTemporadasActive){
			focusSection = idZonaKids
			fadeInTranslateXElement(idZonaKids, '0', '1', '.5s', '0', '0', '.5s')
		}
    
		if(sectionTemporadasActive && sectionALaCartaActive){
			focusSection = ''
			fadeInElement(idSeries, '0', '1', '0.3s')
			SpatialNavigation.focus('chapters-serie')
		}

		if(sectionTemporadasActive && sectionZonaKidsActive){
			focusSection = ''
			fadeInElement(idSeries, '0', '1', '0.3s')
			SpatialNavigation.focus('chapters-serie')
		}
    
		videoPlayerActive = false
		showMagicButtonBack()
	}
}

function setResumePosLink(){
	// var positionVideo = jwplayer(videoPlayer).getPosition();
	var positionVideo = videoTag.currentTime
	var durationVideo = videoTag.duration
	if(positionVideo){
		if(positionVideo == durationVideo || positionVideo > durationVideo){
			var positionVideoMil = 0
		}else{
			var positionVideoMil = Math.round(positionVideo * 1000)
		}
    
		$.ajax({
			url: urlGetApi+'cmd/sCmResPos/'+actualVideo.movie.Registro+'/'+positionVideoMil+'/'+suscriberId,
			success: function() {
			},
			error: function() {
			}
		})
		setProgressMovie()
	}
}

function setProgressMovie(){
	var timePercent = getProgressMovie(actualVideo)
	var position = videoTag.currentTime
	var duration= videoTag.duration
   
	if(sectionALaCartaActive){
		arrayCatalogue.forEach(function(catalogue, indexC){
			catalogue.cmData.forEach(function(movie, indexM){
				if(actualVideo.movie.Registro == movie.Registro){
					if(position == duration || position > duration){
						var positionVideo = 0
					}else{
						var positionVideo = videoTag.currentTime
					}
					var positionVideoMil = Math.round(positionVideo * 1000)
					arrayCatalogue[indexC].cmData[indexM].ResumePos = positionVideoMil
				}
			})
		})
		renderCatalogo(arrayCatalogue, idListALaCarta, idCatalogueALaCarta, classFocusItemALaCarta, true)
	}
    
	if(sectionZonaKidsActive){
		arrayCatalogue.forEach(function(catalogue, indexC){
			catalogue.cmData.forEach(function(movie, indexM){
				if(actualVideo.movie.Registro == movie.Registro){
					if(position == duration || position > duration){
						var positionVideo = 0
					}else{
						var positionVideo = videoTag.currentTime
					}
					var positionVideoMil = Math.round(positionVideo * 1000)
					arrayCatalogue[indexC].cmData[indexM].ResumePos = positionVideoMil
				}
			})
		})
		renderCatalogo(arrayCatalogue, idListZonaKids, idCatalogueZonaKids, classFocusItemZonaKids, true)
	}

	if(sectionTemporadasActive){
		chaptersSerie.forEach(function(movie, indexM){
			if(actualVideo.movie.Registro == movie.Registro){
				if(position == duration || position > duration){
					var positionVideo = 0
				}else{
					var positionVideo = videoTag.currentTime
				}
				var positionVideoMil = Math.round(positionVideo * 1000)
				chaptersSerie[indexM].ResumePos = positionVideoMil
			}
		})
		renderChapters(dataSerie, chaptersSerie)
	}
}

function clearSectionVideoPlayer(){
	if(!errorVideo){
		if(hls !== undefined){
			setResumePosLink()
			hls.stopLoad()
			pauseVid()
			hls.destroy()
			hls = ''
		}
	}
}

document.getElementById('video-alacarta').onclick = function(e) {
	if(textTracksPanelActive){
		if(e.target == document.getElementById(idTextTracksContainer)) {
			hideTextTracksPanel(idTextTracksPanel)
		} 
	}

	if(e.target == document.getElementById('bb-video-player')){
		if($('#'+idVideoPlayerControls).is(':visible')){
			fadeOutTranslateYElement(idVideoPlayerControls, '1', '0', '.3s', '0', '0', '.3s') 
		}else{
			showPlayerControls()
		}
	}

	if(e.target == document.getElementById('video-player')){
		if($('#'+idVideoPlayerControls).is(':visible')){
			fadeOutTranslateYElement(idVideoPlayerControls, '1', '0', '.3s', '0', '0', '.3s') 
		}else{
			showPlayerControls()
		}
	}
}

document.getElementById('video-alacarta').addEventListener('keydown', function(event){
	switch(event.keyCode){
	case 415:
		playPlayer(13)
		$('#button-play').focus()
		break
	case 19:
		pausePlayer(13)
		$('#button-pause').focus()
		break
	case 412:
		rewindPlayer(13)
		$('#button-rewind').focus()
		break
	case 417:
		forwardPlayer(13)
		$('#button-forward').focus()
		break
	case 10252:
		if(playingVideo){
			pausePlayer(13)
			$('#button-pause').focus()
			break
		}else{
			playPlayer(13)
			$('#button-play').focus()
			break
		}
	case 10232:
		rewindPlayer(13)
		$('#button-rewind').focus()
		break
	case 10233:
		forwardPlayer(13)
		$('#button-forward').focus()
		break
	}
})

var mouseActive = false
document.getElementById('video-alacarta').addEventListener('mousemove', function(e){
	if($('#'+idTextTracksPanel).is(':hidden')){
		if(playingVideo){
			if($('#'+idVideoPlayerControls).is(':hidden')){
				if(!mouseActive){
					mouseActive = true
					showPlayerControls()
				}
				hidePlayerControls()
			}else{
				hidePlayerControls()
			}
		}else{
			if($('#'+idVideoPlayerControls).is(':hidden')){
				showPlayerControls()
				hidePlayerControls()
			}else{
				hidePlayerControls()
			}
		}
	}

	if(dragVolume){
		updateVolumePlayer(e)  
	}

	if(dragTime){
		updateTimePlayer(e)  
	}

	toogleProgressVolume(e)
})

document.getElementById('video-alacarta').addEventListener('touchmove', function(e){
	if(dragTime){
		updateTimePlayer(e)  
	}

})

document.getElementById('video-alacarta').addEventListener('dblclick', function(){
	toggleFullScreen()
})

document.addEventListener('mouseup',function(e){
	dragVolume = false
	dragTime = false
})

var dragTime = false
function activateTimeChange(e){
	pauseVid()
	dragTime = true
	updateTimePlayer(e)
}

function updateTimePlayer(e){
	clearTimeout(timeOutSeek)
	var eInner = document.querySelector('.progress-time')
	var element = document.querySelector('.progress-bar-player') 
	var offsetLeft = document.querySelector('.progress-bar-container').offsetLeft
	var clientWidth = element.clientWidth
	var position =  e.clientX - offsetLeft
	var percentage = 100 * position / clientWidth

	if (percentage >= 100) {
		percentage = 100
	}
	if (percentage <= 0) {
		percentage = 0
	}

	var durationVideo = videoTag.duration
	var time = (percentage * durationVideo) / 100

	var hours = Math.floor(time / 3600)  
	var minutes = Math.floor((time % 3600) / 60)
	var seconds = Math.floor(time % 60)

	// Anteponiendo un 0 a los minutos si son menos de 10 
	minutes = minutes < 10 ? '0' + minutes : minutes
	// Anteponiendo un 0 a los segundos si son menos de 10 
	seconds = seconds < 10 ? '0' + seconds : seconds
     
	eInner.style.width = percentage +'%'
	if (hours < 1) {
		$('#video-alacarta .player-controls .buttons-container .time-movie .actual-time').html(minutes + ':' + seconds)
	}else{
		$('#video-alacarta .player-controls .buttons-container .time-movie .actual-time').html(hours + ':' + minutes + ':' + seconds)
	}


	timeOutSeek = setTimeout(function(){
		videoTag.currentTime = time
		document.querySelector('.button-play').style.display = 'none'
		document.querySelector('.button-pause').style.display = ''
		playVid()
	}, 1000)
}

function activateVolumeChange(e){
	dragVolume = true
	updateVolumePlayer(e)
}

var element = document.querySelector('.progress-volume')
var eInner = document.querySelector('.current-volume')

function updateVolumePlayer(e){
	var offsetTop = document.getElementById('video-player-controls').offsetTop
	offsetTop = offsetTop + element.offsetTop
	var height = (5 * document.querySelector('.button-volume-container').clientHeight) / 100
	height = height * 7
	offsetTop = offsetTop - height
	var clientHeight = element.clientHeight
	var y = e.clientY
	var offset = offsetTop
	var position = y - offset
	var percentage = 100 * position / clientHeight
	percentage = 100 - percentage

	if (percentage >= 100) {
		percentage = 100
	}

	if (percentage <= 0) {
		percentage = 0
		document.getElementById('icon-volume-player').classList.remove('fa-volume-down')
		document.getElementById('icon-volume-player').classList.add('fa-volume-mute')
	}

	if (percentage > 0 && percentage < 50) {
		document.getElementById('icon-volume-player').classList.remove('fa-volume-mute')
		document.getElementById('icon-volume-player').classList.remove('fa-volume-up')
		document.getElementById('icon-volume-player').classList.add('fa-volume-down')
	}

	if (percentage >= 50) {
		document.getElementById('icon-volume-player').classList.remove('fa-volume-down')
		document.getElementById('icon-volume-player').classList.add('fa-volume-up')
	}

	videoTag.volume = (percentage / 100)
	eInner.style.height = percentage +'%'
}

document.getElementById('button-volume').addEventListener('mouseover', function(e){
	if(isHidden('button-volume-container')){
		fadeInElement('button-volume-container', '0', '1', '0.15s')
	}
})

function toogleProgressVolume(e){
	// console.log(e.target);
	var element = e.target
	if(element.classList.contains('button-volume') || element.classList.contains('fa-volume-down') || element.classList.contains('fa-volume-up') || element.classList.contains('fa-volume-mute') || element.classList.contains('text-button-volume') || element.classList.contains('button-volume-container') || element.classList.contains('volume-container') || element.classList.contains('progress-volume') || element.classList.contains('current-volume') || element.classList.contains('drop-volume')){
	}else{
		if(isVisible('button-volume-container')){
			fadeOutElement('button-volume-container', '1', '0', '0.15s')
		}

	}
}

function fullScreenVideo(e){
	toggleFullScreen()
}

function toggleFullScreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen()
		document.getElementById('icon-full-screen').classList.remove('fa-expand')
		document.getElementById('icon-full-screen').classList.add('fa-compress')
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen() 
			document.getElementById('icon-full-screen').classList.remove('fa-compress')
			document.getElementById('icon-full-screen').classList.add('fa-expand')
		}
	}
}