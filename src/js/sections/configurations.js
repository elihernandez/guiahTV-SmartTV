var configurationsMenuActive = false;

function getConfigurationsMenu(){
    configurationsMenuActive = true;
    fadeInElement(idConfigurationsMenu, "0", "1", "0.1s");
    renderConfigurationsMenu();
    document.getElementById('conf-language').focus()
    // renderConfigurationsLanguage();
    // toggleClassActiveConfigurationsMenu("configurations-left-section", "conf-language");
    switchConfigurationsLeftSection("conf-language");
}

function clickOnConfigurationsLeftSection(e){
    var id = e.currentTarget.id;
    switchConfigurationsLeftSection(id);
}

function keyDownOnConfigurationsLeftSection(e){
    if(pressEnter(e.nativeEvent)){
        var id = e.nativeEvent.target.id;
        switchConfigurationsLeftSection(id);
    }
}

function switchConfigurationsLeftSection(id){
    switch (id) {
        case "conf-language":
            renderConfigurationsLanguage();
            setTimeout(function(){
                toggleClassActiveConfigurationsMenu("configurations-left-section", id);
                toggleClassActiveConfigurationsMenu("configurations-audios-list", localStorage.getItem('idAudio'));
                toggleClassActiveConfigurationsMenu("configurations-subtitles-list", localStorage.getItem('idSubtitles'));
            }, 1000)
            // console.log(localStorage);
            break;
        case "conf-logout":
            renderConfigurationsLogout()
            toggleClassActiveConfigurationsMenu("configurations-left-section", id);
            break;
        case "conf-exit":
            renderConfigurationsExit();
            toggleClassActiveConfigurationsMenu("configurations-left-section", id);
            break;
        case "conf-back":
            pressBackOnConfigurationsMenu(8);
            break;
        default:
            break;
    }
}

function clickOnConfigurationsLanguage(e){
    var id = e.nativeEvent.target.id;
    var attributes = e.nativeEvent.target.attributes;
    setConfigurationsLanguage(attributes, id)
}

function keyDownOnConfigurationsLanguage(e){
    if(pressEnter(e.nativeEvent)){
        var id = e.nativeEvent.target.id;
        var attributes = e.nativeEvent.target.attributes;
        setConfigurationsLanguage(attributes, id)
    }
}

function setConfigurationsLanguage(attributes, id){
    toggleClassActiveConfigurationsMenu("configurations-audios-list", id);
    if(attributes.languageAudio){
        localStorage.setItem('idAudio', id);
        localStorage.setItem('languageAudio', attributes.languageAudio.value);
    }else{
        toggleClassActiveConfigurationsMenu("configurations-subtitles-list", id);
        localStorage.setItem('idSubtitles', id);
        localStorage.setItem('languageSubtitles', attributes.languageSubtitles.value);
    }
}

function toggleClassActiveConfigurationsMenu(sectionId, elementId){
    $("#"+sectionId).children("ul").each(function () {
        $(this).children("li").each(function(){
            var id = $(this).attr('id');
            $("#"+id+"").removeClass('active');
        });
    });
    // $("#"+elementId).addClass('active');
    document.getElementById(elementId).classList.add('active');
}

function clickOnConfigurationsLogout(e){
    sectionMenuPrincipalActive = false;
    fadeInElement(idLoaderLogo, "0", "1" , "0.2s");
    fadeOutElements([idTopMenu, idMenuPrincipal, idRightMenu, idInfoLogout, idConfigurationsMenu], "1", "0", "0.2s");
    clearSectionConfigurationsMenu();
    logout();
    showMainPageLogin(13);
    fadeInElement(idLoginPage, "0", "1", "0.1s");
    focusSection = "main-info-login";  
    fadeOutElementDelay(idLoaderLogo, "1", "0", "0.2s", "1s");
    sectionLoginActive = true;
}

function keyDownOnConfigurationsLogout(e){
    if(pressEnter(e.nativeEvent)){
        sectionMenuPrincipalActive = false;
        fadeInElement(idLoaderLogo, "0", "1" , "0.2s");
        fadeOutElements([idTopMenu, idMenuPrincipal, idRightMenu, idInfoLogout, idConfigurationsMenu], "1", "0", "0.2s");
        clearSectionConfigurationsMenu();
		logout();
		showMainPageLogin(13);
		fadeInElement(idLoginPage, "0", "1", "0.1s");
		focusSection = "main-info-login";  
        fadeOutElementDelay(idLoaderLogo, "1", "0", "0.2s", "1s");
        sectionLoginActive = true;
    }
}

function clickOnConfigurationsExit(e){
    exitApp(13);
}

function keyDownOnConfigurationsExit(e){
    if(pressEnter(e.nativeEvent)){
        exitApp(13);
    }
}

function pressBackOnConfigurationsMenu(e){
    if(pressBack(e)){
        clearSectionConfigurationsMenu();
		fadeOutElement(idConfigurationsMenu, '1', "0", "0.1s");
		fadeInTranslateXElement("container-right-menu", '0', '1', '.3s', '100', '0', '.3s');
    }
}

function clearSectionConfigurationsMenu(){
    rightMenuActive = true;
    configurationsMenuActive = false;
    SpatialNavigation.enable(idTopMenu)
    SpatialNavigation.enable('menu-principal')
    SpatialNavigation.enable('spotlight')
    SpatialNavigation.enable('right-menu')
    SpatialNavigation.enable('info-logout')
    focusSection = 'right-menu';
}

function exitApp(e){
	if(pressEnter(e)){
		open(location, '_self').close();
	}
}