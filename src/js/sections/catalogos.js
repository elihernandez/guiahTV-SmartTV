var moveElement = true;

// Función que detecta la tecla presionaa para hacer scroll
function animateScroll(e){  
    // if(moveElement){
        var element = document.getElementById(e.target.id); // li
        var listParentElement = element.parentElement; // div
        var categoryParentElement = listParentElement.parentElement; //ul
        var listElement = document.getElementById(categoryParentElement.parentElement.id); // list

        if(e.target.attributes.data){
            var data = e.target.attributes.data.value;
            data = JSON.parse(unescape(data));
            var firstIndexCategory = data.category.firstIndex;
            var lastIndexCategory = data.category.lastIndex;
            var indexCategory = data.category.index;
            var firstIndexMovie = data.movie.firstIndex;
            var lastIndexMovie = data.movie.lastIndex;
            var indexMovie = data.movie.index;
        }

        // Izquierda
        if(pressLeft(e)){
            if(indexMovie != firstIndexMovie){
                var nextElementId = document.getElementById(event.target.id).previousElementSibling.id;
                var nextElement = document.getElementById(nextElementId);
                var positionBefore = element.offsetLeft;
                var positionAfter = nextElement.offsetLeft;
                // console.log(positionBefore - positionAfter);
                animateScrollRight(listParentElement, positionBefore, positionAfter);
            }
        }
        
        // Derecha
        if(pressRight(e)){
            if(indexMovie != lastIndexMovie){
                var nextElementId = document.getElementById(event.target.id).nextElementSibling.id;
                var nextElement = document.getElementById(nextElementId);
                var positionBefore = element.offsetLeft;
                var positionAfter = nextElement.offsetLeft;
                // console.log(positionBefore - positionAfter);
                animateScrollLeft(listParentElement, positionBefore, positionAfter);
            }
        }
    
        // Arriba
        if(pressUp(e)){
            if(indexCategory != firstIndexCategory){
                var nextParentElementId = document.getElementById(categoryParentElement.id).previousElementSibling.id;
                var nextParentElement = document.getElementById(nextParentElementId);
                var positionBefore = categoryParentElement.offsetTop;
                var positionAfter = nextParentElement.offsetTop;
                animateScrollUp(listElement, nextParentElement, positionBefore, positionAfter);
            }
        }
    
        // Abajo
        if(pressDown(e)){
            if(indexCategory != lastIndexCategory){
                var nextParentElementId = document.getElementById(categoryParentElement.id).nextElementSibling.id;
                var nextParentElement = document.getElementById(nextParentElementId);
                var positionBefore = categoryParentElement.offsetTop;
                var positionAfter = nextParentElement.offsetTop;
                animateScrollDown(listElement, categoryParentElement, positionBefore, positionAfter);
            }
        }
    // }
}

// Animación del catálogo que hace scroll a la izquierda
function animateScrollLeft(element, positionBefore, positionAfter, stop) {
    const transitionTransform = typeTransition();
    transition.begin(element, [
        [transitionTransform, "translateX(-"+positionBefore+"px)", "translateX(-"+positionAfter+"px)", "0.0s", "linear"],], {
        onBeforeChangeStyle: function() {
            moveElement = true;
        },
        onAfterChangeStyle: function(){
            // SpatialNavigation.pause();
        },
        onTransitionEnd: function(finished) {
            if (!finished || stop) return;
            // SpatialNavigation.resume();
            moveElement = true;
        }
    });
}

// Animación del catálogo que hace scroll a la derecha
function animateScrollRight(element, positionBefore, positionAfter, stop) {
    const transitionTransform = typeTransition();
    transition.begin(element, [
        [transitionTransform, "translateX(-"+positionBefore+"px)", "translateX(-"+positionAfter+"px)", "0.0s", "linear"],], {
        onBeforeChangeStyle: function() {
            moveElement = true;
        },
        onAfterChangeStyle: function(){
            // SpatialNavigation.pause();
        },
        onTransitionEnd: function(finished) {
            if (!finished || stop) return;
            // SpatialNavigation.resume();
            moveElement = true;
        }
    });
}

// Animación del catálogo que hace scroll hacia abajo
function animateScrollDown(element, listElement, positionBefore, positionAfter, stop) {
    const transitionTransform = typeTransition();
    transition.begin(element, [
        [transitionTransform, "translateY(-"+positionBefore+"px)", "translateY(-"+positionAfter+"px)", "0.0s", "linear"],
    ], { 
        onBeforeChangeStyle: function() {
            moveElement = true;
        },
        onAfterChangeStyle: function(){
            // SpatialNavigation.pause();
        },
        onTransitionEnd: function(finished) {
            if (!finished || stop) return;
            // SpatialNavigation.resume();
            moveElement = true;
        }
    });
}

// Animación del catálogo que hace scroll hacia arriba
function animateScrollUp(element, listElement, positionBefore, positionAfter, stop) {
    const transitionTransform = typeTransition();
    transition.begin(element, [
        [transitionTransform, "translateY(-"+positionBefore+"px)", "translateY(-"+positionAfter+"px)", "0.0s", "linear"],
    ], { 
        onBeforeChangeStyle: function() {
            moveElement = true;
        },
        onAfterChangeStyle: function(){
            // SpatialNavigation.pause();
        },
        onTransitionEnd: function(finished) {
            if (!finished || stop) return;
            // SpatialNavigation.resume();
            moveElement = true;
        }
    });
}

var changeBackground = true

// Animación para desaparecer el backgruond del catálogo
function fadeOutBackground(data) {
    var background = data.movie.HdBackgroundImageUrl;
    var idBackground = data.movie.idBackground;
    var actualBackground = document.getElementById(idBackground).src;
    var element = document.getElementById(idBackground);
    if(changeBackground){
        transition.begin(element, ["opacity 1 0.2 .5s"], {
            onBeforeChangeStyle: function() {
                changeBackground = false;
            },
            onTransitionEnd: function(finished) {
                if (!finished) return;
            }
        });
    }
}

// Animación para aparecer el backgruond del catálogo
function fadeInBackground(data) {
    clearTimeout(timeoutBackground);
    var background = data.movie.HdBackgroundImageUrl;
    var idBackground = data.movie.idBackground;
    var actualBackground = document.getElementById(idBackground).children[0].src;
    var element = document.getElementById(idBackground);
    timeoutBackground = setTimeout(function(){
        if(background != actualBackground){
            BackgroundCatalogue(idBackground, background, data);
        }
        var opacity = element.style.opacity;
        if(opacity < 1){
            transition.begin(element, ["opacity 0.2 1 .6s"], {
                  onBeforeChangeStyle: function() {
                      // document.getElementById(idBackground).src = background;
                      changeBackground = true;
                  },
                  onAfterChangeStyle: function(){
                     showInfoMovie(data);
                  },
                  onTransitionEnd: function(finished) {
                      if (!finished) return; 
                      // showInfoMovie(data);
                }
            });
        }else{
            showInfoMovie(data);
        }
      }, 1000);
}

//  Listener Keydown (Cuando se presiona un botón)
function addListenerKeydown(element){
    element.addEventListener('keydown', function(e){
        animateScroll(e);
    });
}

function addListenerWillmove(element){
    element.addEventListener('sn:willmove', function(e){
      animateScroll(e);
    });
}

//  Listener Willunfocus (Cuando el elemento pierde el foco)
function addListenerWillunfocus(element){
    element.addEventListener('sn:willunfocus', function(e){
        // var data = dataElement(e);
        // var background = data.movie.HdBackgroundImageUrl;
        // var idBackground = data.movie.idBackground;
        // if(changeBackground == false){
        //     changeBackground = true;
        //     setTimeout(function(){
        //         fadeOutBackground(idBackground, background);
        //     },500)
        // }
    });
}

//  Listener focused (Cuando el elemento tiene el foco)
function addListenerFocused(element){
    element.addEventListener('sn:focused', function(e){
       
    });
}

//  Listener Mouseover (Cuando el cursor pasa encima del elemento)
function addListenerMouseover(element){
    element.addEventListener('mouseover', function(e){
        var data = dataElementParent(e);
        var background = data.movie.HdBackgroundImageUrl;
        var idBackground = data.movie.idBackground;
        changeBackground = true;
        fadeOutBackground(idBackground, background);

        if(changeBackground == true){
            clearTimeout(timeoutBackground);
            timeoutBackground = setTimeout(function(){
                fadeInBackground(idBackground, background);
                showInfoMovie(data);
            }, 1000);
        }

        changeCountCategory(data);
        var posterType = data.category.poster_type;
        animatePosterFocusMovie(data);
    });
}

//  Listener Click (Cuando se hace click en el elemento)
function addListenerClick(element){
    element.addEventListener('click', function(e){
        var data = dataElementParent(e);
        verifySectionId(data);
    });
}

//  Cambia el contador de la categoría (Ex. 1/5)
function changeCountCategory(data){
    var index = data.movie.index + 1;
    var lastIndex = data.movie.lastIndex + 1;
    var idCountCategory = data.category.countId;
    var append = '<h3 id="'+idCountCategory+'" class="fs-2">('+index+' de '+lastIndex+')</h3>';
    document.getElementById(idCountCategory).innerHTML = append;
}

// Cambia el tamaño del rectángulo del focus de los elementos
function animatePosterFocusMovie(data){
    var idSection = data.category.section;
    var elements = document.getElementById(idSection).getElementsByClassName('rectangle-focus');
    if(data.category.poster_type == 0){
        elements[0].classList.remove("landscape");
        elements[0].classList.add("portrait");
    }else{
        elements[0].classList.remove("portrait");
        elements[0].classList.add("landscape");
    }
}

// Muestra la información de el elemento (Película, video, serie, etc)
function showInfoMovie(data){
    var idSection = data.category.section;
    // $("#"+idSection+" .title").html(data.movie.Title);
    // $("#"+idSection+" .imdb-movie").attr("src", 'app/assets/images/clasifications-movies/imdb.png');
    // $("#"+idSection+" .rating-movie").html(data.movie.StarRating);
    // $("#"+idSection+" .line-space").html("|");
    // $("#"+idSection+" .clasification-movie").attr("src", clasificationMovie(data.movie.Rating));
    // $("#"+idSection+" .clock").addClass("fa fa-clock-o");
    // $("#"+idSection+" .duration-movie").html(data.movie.Length);
    // $("#"+idSection+" .date-movie").html(data.movie.ReleaseDate);
    document.getElementById(idSection).getElementsByClassName("title")[0].innerHTML = data.movie.Title;
    document.getElementById(idSection).getElementsByClassName("imdb-movie")[0].src = data.movie.StarRating ? 'app/assets/images/clasifications-movies/imdb.png' : ''
    document.getElementById(idSection).getElementsByClassName("rating-movie")[0].innerHTML = data.movie.StarRating ? data.movie.StarRating : '';
    document.getElementById(idSection).getElementsByClassName("line-space")[0].innerHTML = data.movie.StarRating ? '|' : '';
    document.getElementById(idSection).getElementsByClassName("clasification-movie")[0].src = clasificationMovie(data.movie.Rating);
    document.getElementById(idSection).getElementsByClassName("clock")[0].classList.add('fa');
    document.getElementById(idSection).getElementsByClassName("clock")[0].classList.add('fa-clock-o');
    document.getElementById(idSection).getElementsByClassName("duration-movie")[0].innerHTML = data.movie.Length;
    document.getElementById(idSection).getElementsByClassName("date-movie")[0].innerHTML = data.movie.ReleaseDate;

    textHtmlMovie("Género: ", "categories", data.movie.Categories, idSection, "categories");
    textHtmlMovie("Actores: ", "actors", data.movie.Artist, idSection, "actors");
    textHtmlMovie("Director: ", "director", data.movie.Director, idSection, "director");
    descriptionHtmlMovie("Sinópsis: ", "description", data.movie.Description, idSection, "description");
}

// Imprime el rating de el elemento
function clasificationMovie(rating){
    if (rating.trim() == "PG-13") {
        return "app/assets/images/clasifications-movies/PG13.png";
    } else if (rating.trim() == "PG") {
        return "app/assets/images/clasifications-movies/PG.png";
    } else if (rating.trim() == "G"){
        return "app/assets/images/clasifications-movies/G.png";
    } else if (rating.trim() == "R") {
        return "app/assets/images/clasifications-movies/R.png";
    } else if (rating.trim() == "NR") {
        return "app/assets/images/clasifications-movies/NR.png";
    }else{
        return "app/assets/images/clasifications-movies/PG13.png";
    }
}

// Imprime en el documento la información de el elemento (Actores, Director, etc)
function textHtmlMovie(title, classText, string, id, className){
    var append = "";
    if(string != "" && string != "N/A"){
        append = append + '<h3 class="fw-500 fs-2 color-grey-2">'+title+'&nbsp;</h3>' +
                          '<h3 class="'+classText+'movie fw-400 fs-2 ml-1 color-grey-2">'+string+'</h3>';
    }

    document.getElementById(id).getElementsByClassName(className)[0].innerHTML = append;
}

//Imprime en el documento la sinópsis de el elemento
function descriptionHtmlMovie(title, classText, string, id, className){
    var append = '';
    if(string.length > 250){
        // string = string.substring(0, 250);
        // string = string +"...";
        append = append + '<h3 class="description-movie fw-400 fs-2-5 color-grey-1 ls-1-5">'+string+'</h3>';
    }else if(string.length > 0){
        append = append + '<h3 class="description-movie fw-400 fs-2-5 color-grey-1 ls-1-5">'+string+'</h3>';
    }else{
        string = "No hay descripción disponible."
    }

    document.getElementById(id).getElementsByClassName(className)[0].innerHTML = append;
}

// Valida la data del elemento obtenida en el evento
function validateData(e){
    if(e.target.attributes.data){
      return true;
    }

    return false;
}

// Devuelve la data del elemento directamente del evento
function dataNativeEvent(e){
    return JSON.parse(unescape(e.currentTarget.attributes.data.value));
}

// Devuelve la data del elemento directamente del evento
function dataElement(e){
    return JSON.parse(unescape(e.target.attributes.data.value));
}

// Devuelve la data del parent element
function dataElementParent(e){
    return JSON.parse(unescape(e.target.parentElement.attributes.data.value));  
}

function dataOffsetParent(e){
    return JSON.parse(unescape(e.target.offsetParent.attributes.data.value));  
}

function dataRelatedTarget(e){
    return JSON.parse(unescape(e.relatedTarget.attributes.data.value));  
}

// Valida si la sección es de películas
function isSerie(data){
    var stringSerie = "series";
    var stringPack = "pack"; 
    var string = data.movie.ContentType;
    if(string.indexOf(stringSerie) !== -1 || string.indexOf(stringPack) !== -1){
      return true;
    }

    return false;
}

// Se verifica si es película, video o serie
function verifySectionId(data, idPrevSection){
    // Si es película o video
    if(!isSerie(data)){
        fadeOutElement(idPrevSection, false);
        fadeInElement(idLoaderSpinner);
        playVideo(data, idPrevSection);
    }else{
    //   console.log("Mostrar serie");
      getSerie();
    }
}

function keyDownItemCatalogue(e){
    if(pressEnter(e)){
        var data = dataElement(e);
        if(sectionALaCartaActive){
            if(!isSerie(data)){
                fadeOutTranslateXElement(idALaCarta, '1', '0', '.3s', '0', '0', '.3s');
                // fadeInElement(idLoaderSpinner, "0", "1", "0.2s");
                playVideo(data, idALaCarta);
            }else{
                fadeOutTranslateXElement('info-movie-alacarta', '1', '0', '.2s', '0', '0', '.2s');
                fadeOutTranslateXElement(idALaCarta, '1', '0', '.2s', '0', '0', '.2s');
                // fadeOutElement('rectangle-focus-alacarta');
                getSerie(data, idALaCarta, classFocusItemALaCarta);
                sectionTemporadasActive = true;
            }
        }
  
        if(sectionZonaKidsActive){
            if(!isSerie(data)){
                fadeOutTranslateXElement(idZonaKids, '1', '0', '.3s', '0', '0', '.3s');
                // fadeInElement(idLoaderSpinner, "0", "1", "0.2s");
                playVideo(data, idZonaKids);
            }else{
                fadeOutTranslateXElement(idZonaKids, '1', '0', '.2s', '0', '0', '.2s');
                fadeOutTranslateXElement('info-movie-zonakids', '1', '0', '.2s', '0', '0', '.2s');
                // fadeOutElement('rectangle-focus-zonakids');
                getSerie(data, idZonaKids, classFocusItemZonaKids);
                sectionTemporadasActive = true;
            }
        }
  
        if(sectionRadioActive){
            keyDownItemRadio(data);
        }
    }else{
        if(sectionALaCartaActive || sectionZonaKidsActive){
            animateScroll(e.nativeEvent);
            var data = dataElement(e.nativeEvent);
            fadeOutBackground(data);
        }
    
        if(sectionRadioActive){
            animateScroll(e.nativeEvent);
        }
    }
}
  
function clickItemCatalogue(e){
    var data = dataOffsetParent(e.nativeEvent);
    if(sectionALaCartaActive){
        if(!isSerie(data)){
            fadeInTranslateXElement(idALaCarta, '1', '0', '.3s', '0', '0', '.3s');
            // fadeInElement(idLoaderSpinner, "1", "0", "0.5s");
            playVideo(data, idALaCarta);
        }else{
            fadeOutTranslateXElement(idALaCarta, '1', '0', '.2s', '0', '0', '.2s');
            fadeOutTranslateXElement('info-movie-alacarta', '1', '0', '.2s', '0', '0', '.2s');
            fadeOutElement('rectangle-focus-alacarta');
            getSerie(data, idALaCarta, classFocusItemALaCarta);
            sectionTemporadasActive = true;
        }
    }

    if(sectionZonaKidsActive){
        if(!isSerie(data)){
            fadeInTranslateXElement(idZonaKids, '1', '0', '.3s', '0', '0', '.3s');
            // fadeInElement(idLoaderSpinner, "1", "0", "0.2s");
            playVideo(data, idZonaKids);
        }else{
            fadeOutTranslateXElement(idZonaKids, '1', '0', '.2s', '0', '0', '.2s');
            fadeOutTranslateXElement('info-movie-zonakids', '1', '0', '.2s', '0', '0', '.2s');
            fadeOutElement('rectangle-focus-zonakids');
            getSerie(data, idZonaKids, classFocusItemZonaKids);
            sectionTemporadasActive = true;
        }
    }

    if(sectionRadioActive){
        var data = dataNativeEvent(e);
        keyDownItemRadio(data);
    }
}
  
function focusItemCatalogue(e){
    var data = dataElement(e);
    if(sectionALaCartaActive || sectionZonaKidsActive){
        changeCountCategory(data);
        // animatePosterFocusMovie(data);
        fadeInBackground(data);
    }

    if(sectionRadioActive){
        focusItemRadio(data);
    }
}

function focusFirstItemCatalogue(element){
    var e = document.getElementById(element);
    var data = JSON.parse(unescape(e.attributes.data.value));
    if(sectionALaCartaActive || sectionZonaKidsActive){
        changeCountCategory(data);
        fadeInBackground(data);
    }

    if(sectionRadioActive){
        focusItemRadio(data);
    }
}
  
function mouseoverItemCatalogue(e){
    if(sectionALaCartaActive || sectionZonaKidsActive){
        var data = dataOffsetParent(e.nativeEvent);
        changeCountCategory(data);
        fadeInBackground(data);
    }

    if(sectionRadioActive){
        var data = dataNativeEvent(e);
        focusItemRadio(data);
    }
}

function moveRightCatalogue(e){
    var listId = e.currentTarget.attributes.listId.value;
    var currentRow = parseInt(e.currentTarget.attributes.currentRow.value);
    var numRows = e.currentTarget.attributes.numRows.value;
    var leftDirectionId = e.currentTarget.attributes.leftdirectionid.value;
    var rightDirectionId = e.currentTarget.attributes.rightdirectionid.value;
    var element = document.getElementById(listId);
    if(currentRow < numRows){
      var positionBefore = 95 * (currentRow-1);
      var positionAfter = 95 * currentRow;
      transition.begin(element, [
        ["transform", "translateX(-"+positionBefore+"%)", "translateX(-"+positionAfter+"%)", ".7s", "ease-in-out"],], {
        onBeforeChangeStyle: function() {
          currentRow = currentRow + 1;
          var leftDirection = document.getElementById(leftDirectionId);
          leftDirection.setAttribute("currentRow", currentRow);
          var rightDirection = document.getElementById(rightDirectionId);
          rightDirection.setAttribute("currentRow", currentRow);
          if(currentRow == numRows){
            rightDirection.style.display = "none";
          }
    
          if(currentRow > 1){
            leftDirection.style.display = "";
          }
        },
        onAfterChangeStyle: function(){
        },
        onTransitionEnd: function(finished) {
            if (!finished || stop) return;
        }
      });
    }
}

function moveLeftCatalogue(e){
    var listId = e.currentTarget.attributes.listId.value;
    var currentRow = parseInt(e.currentTarget.attributes.currentRow.value);
    var numRows = e.currentTarget.attributes.numRows.value;
    var leftDirectionId = e.currentTarget.attributes.leftdirectionid.value;
    var rightDirectionId = e.currentTarget.attributes.rightdirectionid.value;
    var element = document.getElementById(listId);
    if(currentRow > 1){
      var positionBefore = 95 * (currentRow-1);
      var positionAfter = 95 * (currentRow-2);
      transition.begin(element, [
        ["transform", "translateX(-"+positionBefore+"%)", "translateX(-"+positionAfter+"%)", ".7s", "ease-in-out"],], {
        onBeforeChangeStyle: function() {
          currentRow = currentRow - 1;
          var leftDirection = document.getElementById(leftDirectionId);
          leftDirection.setAttribute("currentRow", currentRow);
          var rightDirection = document.getElementById(rightDirectionId);
          rightDirection.setAttribute("currentRow", currentRow);
          if(currentRow != numRows){
            rightDirection.style.display = "";
          }
    
          if(currentRow == 1){
            leftDirection.style.display = "none";
          }
        },
        onAfterChangeStyle: function(){
        },
        onTransitionEnd: function(finished) {
          if (!finished || stop) return;
        }
      });
    }
}