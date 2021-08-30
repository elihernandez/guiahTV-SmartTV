var rightMenuActive = false;

function keyDownOnBtnLogout(e){
	if(pressEnter(e)){
		showInfoLogout();
	}

	if(pressRight(e)){
		hideRightMenu()
	}
}

function showRightMenu(e){	
	if(pressEnter(e)){
		fadeInElement(idRightMenu, "0", "1", "0.2s");
		focusSection = 'right-menu';
		fadeInTranslateXElement("container-right-menu", '0', '1', '.3s', '100', '0', '.3s');
		rightMenuActive = true;
		spotlight.stop();
	}
}

function hideRightMenu(){
	fadeOutTranslateXElement("container-right-menu", '1', '0', '.5s', '0', '100', '.3s');
	fadeOutElement(idRightMenu, "1", "0", "0.2s");
	makeSectionFocus(idTopMenu);
	spotlight.init();
}

function showInfoLogout(){
	focusSection = 'info-logout';
	fadeInElement(idInfoLogout, "0", "1", "0.2s");
}

function hideInfoLogout(){
	fadeOutElement(idInfoLogout, "1", "0", "0.2s");
	showRightMenu('13');
}

function noLogout(e){
	if(pressBack(e) || pressEnter(e)){
		hideInfoLogout();
	}
}

function yesLogout(e){
	if(pressBack(e)){
		hideInfoLogout();
	}

	if(pressEnter(e)){
		sectionMenuPrincipalActive = false;
		fadeInElement(idLoaderLogo, "0", "1" , "0.2s");
		fadeOutElements([idTopMenu, idMenuPrincipal, idRightMenu, idInfoLogout, ], "1", "0", "0.2s");
		logout();
		showMainPageLogin(13);
		fadeInElement(idLoginPage, "0", "1", "0.1s");
		focusSection = "main-info-login";  
		fadeOutElementDelay(idLoaderLogo, "1", "0", "0.2s", "1s");
		sectionLoginActive = true;
	}
}

function showConfigurationApp(e){
	if(pressEnter(e)){
		rightMenuActive = false;
		configurationsMenuActive = true;
		SpatialNavigation.disable(idTopMenu)
		SpatialNavigation.disable('menu-principal')
		SpatialNavigation.disable('spotlight')
		SpatialNavigation.disable('right-menu')
		SpatialNavigation.disable('info-logout')
		focusSection = 'configurations-left-section';
		getConfigurationsMenu();	
	}

	if(pressRight(e)){
		hideRightMenu()
	}
}

function pressBackButtonRightMenu(e){
	if(pressEnter(e)){
		hideRightMenu();
	}

	if(pressRight(e)){
		hideRightMenu()
	}
}

document.getElementById('right-menu').addEventListener('click', function(e){
	if(e.target == document.getElementById(idRightMenu)){
		hideRightMenu();
	}
}, false);