// Variables A la Carta
var sectionALaCartaActive = null,
    idCatalogueALaCarta = "catalogo-alacarta",
    idListALaCarta = "list-alacarta",
    idBackgroundALaCarta = 'background-alacarta',
    classFocusItemALaCarta = 'item-movie-alacarta',
    changeBackground = true,
    timeoutBackground = false,
    arrayCatalogue;

// Función para abrir A la carta
function getALaCarta(response) {
  renderALaCarta();
  renderCatalogo(response, idListALaCarta, idCatalogueALaCarta, classFocusItemALaCarta, true);
  showSectionALaCarta(response);
}

function showSectionALaCarta(response){
  sectionALaCartaActive = 1;
  focusFirstItemCatalogue('catalogo-alacarta-category-0-movie-0')
  arrayCatalogue = response;
  focusSection = idALaCarta;
  fadeOutElements([idTopMenu, idMenuPrincipal], '1', '0', '0.2s'); 
  fadeInTranslateXElement(idALaCarta, '0', '1', '.2s', '0', '0', '.3s');
  fadeOutElementDelay(idLoaderSpinner, "1", "0", "0.2s", "0.5s");
  validateCursorStateChange();
}

// Cuando se presiona un botón en la sección
function pressBackOnSectionALaCarta(e){
  // Botón back
  if (pressBack(e)) {
    clearSectionALaCarta();
  }
}

// Se limpia la sección de A La Carta
function clearSectionALaCarta(){
  // fadeInElement(idLoaderSpinner);
  sectionALaCartaActive = false;
  fadeInElement(idLoaderSpinner, "0", "1", "0.2s");
  fadeOutElement(idALaCarta, "1", "0", "0.1s");
  getMenuPrincipal([idLoaderSpinner], false);
  hideMagicButtonBack();
}

document.getElementById("alacarta").addEventListener("keydown", function(event){
  // console.log(event);
})

