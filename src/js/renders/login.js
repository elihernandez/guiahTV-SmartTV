function MainInfoLogin(){

	React.useEffect(() => {
		makeSectionFocus('main-info-login')
	}, [])

	return (
		<div className="container-section">
			<div className="info main-info" id="main-info-login">
				<div className="el message">
					<div className="el logo">
						<img src="app/assets/images/logos/guiahtv/guiahtvlogo2.png"/>
					</div>
					<div className="el message-text">
						<h2 className="fw-900">UN ESPACIO DE FE</h2>
						<h4 className="fw-400">Disfruta en donde quieras, cancela cuando quieras.</h4>
					</div>
				</div>
				<div className="el buttons">
					<span className="el buttons-wpage" tabIndex="-1" onClick={showRegisterPageLogin} onKeyDown={showRegisterPageLogin}>
						<h4 className="">REGISTRARSE</h4>
					</span>
					<span id="button-show-form-login" className="el buttons-wpage" tabIndex="-1" onClick={showFormPageLogin} onKeyDown={showFormPageLogin}>
						<h4 className="">INICIAR SESIÓN</h4>
					</span>
				</div>
			</div>
			<div className="footer-info">
				<h5 className="ls-1">MÚSICA | TV EN VIVO | PELÍCULAS | CONCIERTOS | CLÍNICAS | SERIES | ZONA KIDS | PPV Y MUCHO MÁS</h5>
			</div>
		</div>
	)
}

function RegisterInfoLogin(){

	React.useEffect(() => {
		makeSectionFocus('register-info-login')
	}, [])

	return (
		<div className="container-section">
			<div className="info register-info" id="register-info-login">
				<div className="el message">
					<div className="el logo">
						<img src="app/assets/images/logos/guiahtv/guiahtvlogo2.png"/>
					</div>
					<div className="el message-text">
						<h2 className="fw-900">UN ESPACIO DE FE</h2>
						<h4 className="fw-400">Para registrarte ingresa a: <b>www.guiah.tv/axs/registro</b></h4>
					</div>
				</div>
				<div className="el buttons">
					<span className="undo-button buttons-rpage" tabIndex="-1" onClick={showMainPageLogin} onKeyDown={showMainPageLogin}>
						<h4 className="small-info2-title fw-500">REGRESAR</h4>
					</span>
				</div>
			</div>
			<div className="footer-info">
				<h5 className="ls-1">MÚSICA | TV EN VIVO | PELÍCULAS | CONCIERTOS | CLÍNICAS | SERIES | ZONA KIDS | PPV Y MUCHO MÁS</h5>
			</div>
		</div>
	)
}

function FormLogin() {
	React.useEffect(() => {
		document.getElementById('username-login').focus()
		clearInpustFormLogin()
	}, [])

	return (
		<div className="container-section">
			<div className="info form-login" id="form-info-login">
				<div className="buttons">
					<span id="back-button-form-login" className="undo-button buttons-lpage" tabIndex="-1" onClick={showMainPageLogin} onKeyDown={showMainPageLogin}>
						<h4>REGRESAR</h4>
					</span>
				</div>
				<div className="el message">
					<div className="el logo">
						<img src="app/assets/images/logos/guiahtv/guiahtvlogo2.png"/>
					</div>
					<div className="el message-text">
						<h2 className="fw-700">Inicio de sesión</h2>
						<h4 className="fw-400">Ingresa los siguientes datos:</h4>
					</div>
				</div>
				<form>
					<div className="input-group-form">
						<div className="form-group">
							<label htmlFor="username-login">
								<h4>Ingresa tu email</h4>
							</label>
							{/* <input type="text" className="form-control buttons-lpage button-username" id="username-login" onKeyDown={pressButtonLogin} tabIndex="-1"/> */}
							<input type="text" className="form-control button-username" onKeyDown={pressButtonLogin} id="username-login" onFocus={focusButtonFormLogin}/>
						</div>
						<div className="form-group">
							<label htmlFor="password-login">
								<h4>Ingresa tu contraseña</h4>
							</label>
							<input type="password" className="form-control button-password" id="password-login" onKeyDown={pressButtonLogin} onFocus={focusButtonFormLogin}/>
						</div>
					</div>
					<div className="input-group-form button">
						<div className="info-web form-group">
							<h4 className="fw-700">¿Necesitas ayuda para iniciar sesión?</h4>
							<h4 className="fw-400">Visita https://guiah.tv</h4>
						</div>
						<div className="form-group">
							<span id="button-login" className="buttons-lpage button-login" tabIndex="-1" onClick={pressButtonLogin} onKeyDown={pressButtonLogin}>
								<h4 className="small-info2-title fw-500">INICIAR SESIÓN</h4>
							</span>
						</div>
					</div>         
				</form>
			</div>
			<div className="footer-info">
				<h5 className="ls-1">MÚSICA | TV EN VIVO | PELÍCULAS | CONCIERTOS | CLÍNICAS | SERIES | ZONA KIDS | PPV Y MUCHO MÁS</h5>
			</div>
		</div>
	)
}

function LoginMessageFailed({ message, responseCode }) {
	return (
		<div className="container-section">
			<div className="logo">
				<i className="fas fa-times"></i>
			</div>
			<div className="title">
				<h2 id="message-failed-login" className="fw-700 message-failed">{message}</h2>
			</div>
			{responseCode != 7 ?
				<div className="subtitle">
					<h3 className="fw-400">Lo sentimos, tu nombre de usuario o contraseña es incorrecto. <br/>Por favor intenta otra vez.</h3>
				</div>
				:
				<div className="subtitle">
					<h3 className="fw-400">Por favor intenta otra vez.</h3>
				</div>
			}
			<div className="message">
				<span className="buttons-mlf" tabIndex="-1" onClick={backLoginFailed} onKeyDown={backLoginFailed}>
					<h4>REGRESAR</h4>
				</span>
			</div>
		</div>
	)
}

  