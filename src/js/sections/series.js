var sectionTemporadasActive = null,
    dataSerie,
    chaptersSerie;

function getSerie(data, idSection){
  previousSection = idSection;
  dataSerie = data;
  $.ajax({
    timeout: timeoutGetApi,
    url: urlGetApi+'season/leon/'+data.movie.ContentTypeOrder,
    success: function(response) {
      renderSerie(data, response);
      getChapters(data, response[0]);
      showSectionSeries();
    },
    error: function() {  
    }
  });
}

function showSectionSeries(){
  fadeInElement(idSeries, "0", "1", "0.2s");
  validateCursorStateChange();
}

function keyDownOnTitleSeason(e){
  if(nativeEventValid(e)){
    var data = dataElement(e.nativeEvent);
    showChaptersSeason(e, data);
    toogleClassListNode(e);
  }
}

function toogleClassListNode(e){
  if(!($("#"+e.nativeEvent.target.id).hasClass('active'))){
    var parentElement = document.getElementById(e.nativeEvent.target.parentElement.id);
    for (var i = 0; i < parentElement.children.length; i++) {
      var children = document.getElementById(parentElement.children[i].id);
      children.classList.remove("active")
    }
    var element = document.getElementById(e.nativeEvent.target.id);
    element.classList.add("active");
  }
}

function showChaptersSeason(e, data){
  if(!($("#"+e.nativeEvent.target.id).hasClass('active'))){
    var element = document.getElementById("list-chapters");
    transition.begin(element, [
      ["opacity", "1", "0.25", "0.3s"]
    ], {
      onBeforeChangeStyle: function(element) {
        getChapters(data.serie, data.season);
      },
      onAfterChangeStyle: function(element) {
          
      }
    });
  }
}

function keyDownItemSeries(e){
  if(nativeEventValid(e)){
    var data = dataNativeEvent(e);
    if(sectionALaCartaActive){
      fadeOutElements([idALaCarta, idSeries], "1", "0", "0.3s")
    }
    
    if(sectionZonaKidsActive){
      fadeOutElements([idZonaKids, idSeries], "1", "0", "0.3s")
    }
    fadeInElement(idLoaderSpinner, "0", "1", "0.3s");
    playVideo(data, idSeries);
  }else{
    animateScrollSeries(e.nativeEvent);
  }
}

function pressBackOnSectionSeries(e){
  if(pressBack(e)){
    fadeOutElement(idSeries, "1", "0", "0.3s");
    fadeOutElement('list-chapters', "1", "0", "0.3s");
    // document.getElementById('list-chapters').innerHTML = "";

    if(sectionALaCartaActive){
      navigableSections = [idALaCarta]; 
      focusSection = idALaCarta;
      fadeInTranslateXElement(idALaCarta, '0', '1', '.3s', '0', '0', '.3s');
      fadeInTranslateXElement('info-movie-alacarta', '0', '1', '.3s', '0', '0', '.3s');
      // fadeInElement('rectangle-focus-alacarta');
    }

    if(sectionZonaKidsActive){
      navigableSections = [idZonaKids]; 
      focusSection = idZonaKids;
      fadeInTranslateXElement(idZonaKids, '0', '1', '.3s', '0', '0', '.3s');
      fadeInTranslateXElement('info-movie-zonakids', '0', '1', '.3s', '0', '0', '.3s');
      // fadeInElement('rectangle-focus-zonakids');
    }

    sectionTemporadasActive = false;
    ReactDOM.render("", document.getElementById('series'))
  }
}

// Función que detecta la tecla presionaa para hacer scroll
function animateScrollSeries(e){  
  var element = document.getElementById(event.target.id); // li
  var listParentElement = element.parentElement; // div
  // Arriba
  if(pressUp(e)){
    var nextElementId = element.previousElementSibling.id;
    var nextElement = document.getElementById(nextElementId);
    var positionBefore = element.offsetTop;
    var positionAfter = nextElement.offsetTop;
    animateScrollDownSeries(listParentElement, positionBefore, positionAfter);
  }

  // Abajo
  if(pressDown(e)){
    var nextElementId = element.nextElementSibling.id;
    var nextElement = document.getElementById(nextElementId);
    var positionBefore = element.offsetTop;
    var positionAfter = nextElement.offsetTop;
    animateScrollUpSeries(listParentElement, positionBefore, positionAfter);
  }
}

// Animación del catálogo que hace scroll hacia arriba
function animateScrollUpSeries(element, positionBefore, positionAfter, stop) {
  const transitionTransform = typeTransition();
  transition.begin(element, [
      [transitionTransform, "translateY(-"+positionBefore+"px)", "translateY(-"+positionAfter+"px)", "0.0s", "linear"],
  ], { 
      onBeforeChangeStyle: function(element) {
          // element.style.display = "block";
          // $("#ul-list li:last").insertAfter('#ul-list li:first');
          // transition.begin(listElement, [
          //     ["opacity", "0", "1", "0.5s"]
          // ]);
      },
      onTransitionEnd: function(element, finished) {
          if (!finished || stop) return;
          // $("#ul-list li:first").insertAfter('#ul-list li:last');
          // animateLeft(element, 0, 0, true);
      }
  });
}

// Animación del catálogo que hace scroll hacia arriba
function animateScrollDownSeries(element, positionBefore, positionAfter, stop) {
  const transitionTransform = typeTransition();
  transition.begin(element, [
      [transitionTransform, "translateY(-"+positionBefore+"px)", "translateY(-"+positionAfter+"px)", "0.0s", "linear"],
  ], { 
      onBeforeChangeStyle: function(element) {
          // element.style.display = "block";
          // $("#ul-list li:last").insertAfter('#ul-list li:first');
          // transition.begin(listElement, [
          //     ["opacity", "0", "1", "0.5s"]
          // ]);
      },
      onTransitionEnd: function(element, finished) {
          if (!finished || stop) return;
          // $("#ul-list li:first").insertAfter('#ul-list li:last');
          // animateLeft(element, 0, 0, true);
      }
  });
}


