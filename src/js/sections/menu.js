var sectionMenuPrincipalActive = false,
    idSpotlight = "spotlight",
    idSectionsMenu = "sections",
    spotlight = null;

// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   if((config.url).includes('home_spotlight') || (config.url).includes('leon_home_bm')){
//     return config;
//   }else{
//       if((config.url).includes(Cookies.get('memclid'))){
//         return config;
//       }else{
//         console.log("Url invalida")
//       }
//   }
//   console.log((config.url).includes('home_spotlight'))
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// Función para mostrar el spotlight y botónes de secciones
  function getMenuPrincipal(idElementOut, clearElement){
    ReactDOM.render(<MenuPrincipal/>, document.getElementById(idMenuPrincipal));

    getSpotlight()
      .then(data => ReactDOM.render(<Spotlight elementOut={idElementOut} data={data}/>, document.getElementById(idSpotlight)))
      .then(() => getSectionsMenu())
      .then(data => ReactDOM.render(<Sections elementOut={idElementOut} data={data}/>, document.getElementById(idSectionsMenu)))
      .then(() => showMenuPrincipal(idElementOut))
      .catch(() => showErrorPageStatus(idElementOut));
  }
  
  // Se hace la petición al API para obtener el Spotlight
  function getSpotlight(){
    return new Promise(function(resolve, reject){
      axios.get(urlGetApi+'sl/leon/home_spotlight')
      .then(function (response) {
          resolve(response.data)
      })
      .catch(function (error) {
        reject(new Error());
      });
    })
  }

  // Se hace la petición al API para obtener las secciones del menú principal
  function getSectionsMenu(){
    return new Promise(function(resolve, reject){
      axios.get(urlGetApi+'cs/leon_home_bm')
      .then(function (response) {
          resolve(response.data);
      })
      .catch(function (error) {
        reject(new Error());
      });
    })
  }

  function spotlightControlPrev(e){
    spotlight.prev();
  }

  function spotlightControlNext(e){
    spotlight.next();
  }

  // Muestra el menú principal una vez que ya se insertó en el HTML
  function showMenuPrincipal(idElement, clearElement){
    fadeOutFadeInElements(idLoaderSpinner, idMenuPrincipal, "1", "0", "0.3s");
    fadeInElement(idTopMenu, "0", "1", "0.2s");
    focusSection = idSectionsMenu;
    fadeOutElementDelay(idElement, "1", "0", "0.1s", "1s");
    sectionMenuPrincipalActive = true;
    hideMagicButtonBack();
  }

  function keyDownOnSectionMenu(e){
    if (nativeEventValid(e)) {
      var sectionId = e.currentTarget.attributes.dataSectionId.value;
      sectionId = parseInt(sectionId, 0);
      getSectionApi(e.nativeEvent, sectionId, idMenuPrincipal, false);
      spotlight.stop();
    }
  }

  function keyDownOnSpotlight(e){
    if(pressLeft(e.nativeEvent)){
      spotlight.prev();
    }

    if(pressRight(e.nativeEvent)){
      spotlight.next();
    }
  }

  function keyDownSectionMenu(e){
    if (nativeEventValid(e)) {
      // console.log(sectionId = e.nativeEvent.attrs)
      // getSectionApi(e.nativeEvent, , idMenuPrincipal, false);
    }
  }

  function clickSectionMenu(e){
    var data = dataElementParent(e.nativeEvent);
    getSectionApi(13, data.idSection, idMenuPrincipal, false);
  }

  function clearMenuPrincipal(){
    sectionMenuPrincipalActive = false;
  }

  function pressBackOnSectionMenuPrincipal(e){
    if(pressBack(e)){
      if(elementIsVisible("container-right-menu")){
        hideRightMenu();
      }else{
        showRightMenu('13');
      }
    }
  }

  function elementIsVisible(elementId){
    var element = document.getElementById(elementId);
    if(element.style.display == "block" || element.style.opacity == 1 || element.style.visible == "show"){
      return true
    }

    return false
  }

  // document.getElementById(idMenuPrincipal).addEventListener("keydown", function(evt){
  //   console.log(evt);
  // })
