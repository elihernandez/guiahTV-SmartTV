function renderConfigurationsMenu(){
    const element = (
        <div className="container-section">
            <LeftSectionConfigurations/>
            <RightSectionConfigurations/>
        </div>
    );
    ReactDOM.render(element, document.getElementById(idConfigurationsMenu));
}

function LeftSectionConfigurations(){
    return (
        <div className="left-section" id="configurations-left-section">
            <ul>
                <li id="conf-back" className="cls-item" tabIndex="-1" onClick={clickOnConfigurationsLeftSection} onKeyDown={keyDownOnConfigurationsLeftSection} data-sn-up="#">
                    <i className="fas fa-arrow-left"></i>
                    <h4>Regresar</h4>
                </li>
            </ul>
            <ul className="list-options">
                <li id="conf-language" className="cls-item active" tabIndex="-1" onClick={clickOnConfigurationsLeftSection} onKeyDown={keyDownOnConfigurationsLeftSection}>Audios y Subtítulos</li>
                <li id="conf-logout" className="cls-item" tabIndex="-1" onClick={clickOnConfigurationsLeftSection} onKeyDown={keyDownOnConfigurationsLeftSection}>Cerrar sesión</li>
                <li id="conf-exit" className="cls-item" tabIndex="-1" onClick={clickOnConfigurationsLeftSection} onKeyDown={keyDownOnConfigurationsLeftSection} data-sn-down="#">Salir de Guiah TV</li>
            </ul>
        </div>
    )
}

function RightSectionConfigurations(){
    return (
        <div className="right-section" id="configurations-right-section">
        </div> 
    )
}

function renderConfigurationsLanguage(){
    const element = (
        <div className="content-section">
            <h2 className="title-info">Preferencias de audios y subtítulos</h2>
            <h3 className="subtitle-info">El idioma que selecciones se usará cuando esté disponible, en audios y subtítulos para videos.</h3>
            <div className="lists">
                <div className="audios list" id="configurations-audios-list">
                    <h4>Audios</h4>
                    <ul>
                        <li id="configurations-audios-1" className="crs-item" tabIndex="-1" languageAudio="spa" onClick={clickOnConfigurationsLanguage} onKeyDown={keyDownOnConfigurationsLanguage} data-sn-up="#">
                            <h5 className="text">Español</h5>
                            <i className="fas fa-check"></i>
                        </li>
                        <li id="configurations-audios-2" className="crs-item" tabIndex="-1" languageAudio="eng" onClick={clickOnConfigurationsLanguage} onKeyDown={keyDownOnConfigurationsLanguage} data-sn-down="#">
                            <h5 className="text">Inglés</h5>
                            <i className="fas fa-check"></i>
                        </li>
                    </ul>
                </div>
                <div className="subs list" id="configurations-subtitles-list">
                    <h4>Subtítulos</h4>
                    <ul>
                        <li id="configurations-subtitles-1" className="crs-item" tabIndex="-1" languageSubtitles="-1" onClick={clickOnConfigurationsLanguage} onKeyDown={keyDownOnConfigurationsLanguage} data-sn-up="#">
                            <h5 className="text">Desactivados</h5>
                            <i className="fas fa-check"></i>
                        </li>
                        <li id="configurations-subtitles-2" className="crs-item" tabIndex="-1" languageSubtitles="spa" onClick={clickOnConfigurationsLanguage} onKeyDown={keyDownOnConfigurationsLanguage}>
                            <h5 className="text">Español</h5>
                            <i className="fas fa-check"></i>
                        </li>
                        <li id="configurations-subtitles-3" className="crs-item" tabIndex="-1" languageSubtitles="eng" onClick={clickOnConfigurationsLanguage} onKeyDown={keyDownOnConfigurationsLanguage} data-sn-down="#">
                            <h5 className="text">Inglés</h5>
                            <i className="fas fa-check"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )

    ReactDOM.render(element, document.getElementById("configurations-right-section"));
}

function renderConfigurationsLogout(){
    const element = (
        <div className="content-section">
            <h2 className="title-info">Cerrar sesión</h2>
            <h3 className="subtitle-info">¿Seguro que deseas cerrar sesión en Guíah TV?</h3>
            <span className="btn-span crs-item" tabIndex="-1" onClick={clickOnConfigurationsLogout} onKeyDown={keyDownOnConfigurationsLogout}>Cerrar sesión</span>
        </div>
    )

    ReactDOM.render(element, document.getElementById("configurations-right-section"));
}

function renderConfigurationsExit(){
    const element = (
        <div className="content-section">
            <h2 className="title-info">Salir</h2>
            <h3 className="subtitle-info">¿Seguro que deseas salir de Guíah TV?</h3>
            <span className="btn-span crs-item" tabIndex="-1" onClick={clickOnConfigurationsExit} onKeyDown={keyDownOnConfigurationsExit}>Salir</span>
        </div>
    )

    ReactDOM.render(element, document.getElementById("configurations-right-section"));
}

