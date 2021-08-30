// Variables globales de la sección Zona Kids
  var sectionZonaKidsActive = null,
      idCatalogueZonaKids = "catalogo-zonakids",
      idListZonaKids = "list-zonakids",
      idBackgroundZonaKids = 'background-zonakids',
      classFocusItemZonaKids = 'item-movie-zonakids',
      elementsZonaKidsWithListeners = document.getElementById(idCatalogueZonaKids).getElementsByClassName(classFocusItemZonaKids);

  function getZonaKids(response, idElementOut, clearElement){
    renderCatalogo(response, idListZonaKids, idCatalogueZonaKids, classFocusItemZonaKids, false);
    sectionZonaKidsActive = 1;
    focusFirstItemCatalogue('catalogo-zonakids-category-0-movie-0')
    arrayCatalogue = response;
    focusSection = idZonaKids;
    fadeInTranslateXElement(idZonaKids, '0', '1', '.2s', '100', '0', '.2s');
    fadeOutElements([idTopMenu, idMenuPrincipal], '1', '0', '0.2s'); 
    fadeOutElementDelay(idLoaderSpinner, "1", "0", "0.2s", "0.5s");
    validateCursorStateChange();
  }

  // function keyPressOnSectionZonaKids(e){
  //    // Botón back
  //   if (pressBack(e)) {
  //     clearSectionZonaKids();
  //   }

  //   // Botón enter
  //   if(pressEnter(e)){
  //     var data = dataElement(e);
  //     if(!isSerie(data)){
  //       fadeOutElement(idZonaKids, false);
  //       fadeInElement(idLoaderSpinner);
  //       playVideo(data, idZonaKids);
  //     }else{

  //     }
  //   }
  // }

// Cuando se presiona un botón en la sección
function pressBackOnSectionZonaKids(e){
  // Botón back
  if (pressBack(e)) {
    clearSectionZonaKids();
  }
}

// Se limpia la sección de A La Carta
function clearSectionZonaKids(){
  fadeInElement(idLoaderSpinner, "0", "1", "0.2s");
  fadeOutElement(idZonaKids, "1", "0", "0.2s");
  getMenuPrincipal([idLoaderSpinner], false);
  sectionZonaKidsActive = null;
  hideMagicButtonBack();
}

  // function addListenersZonaKids(callback){
  //   if(elementsZonaKidsWithListeners){
  //     for (var i = 0; i < elementsZonaKidsWithListeners.length; i++) {
  //       addListenerKeydown(elementsZonaKidsWithListeners[i]);
  //       addListenerWillunfocus(elementsZonaKidsWithListeners[i]);
  //       addListenerFocused(elementsZonaKidsWithListeners[i]);
  //       addListenerMouseover(elementsZonaKidsWithListeners[i]);
  //       addListenerClick(elementsZonaKidsWithListeners[i]);
  //     } 
  //   }
  //   return callback();
  // }


// Función que se ejecuta para volver al catálogo de Zona Kids
  function volverAZonaKids(fadeOptions) {
    navigableSections = ['zonakids']; 
    focusSection = 'zonakids';
    fadeIn(fadeOptions, 0, 0);
    fadeOut(fadeOptions, 250, 500, navigableSections, focusSection);
    sectionZonaKidsActive = 1;  
  }