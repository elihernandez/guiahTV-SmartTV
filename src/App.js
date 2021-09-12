import { useEffect } from 'react'
import iconColor80 from './assets/iconcolor80x80.png'
import iconColor130 from './assets/iconcolor130x130.png'
import './styles.css'
import { $ } from './utils/dom'
import Navigo from 'navigo'
const router = new Navigo('/')

export const App = () => {
	const { pathname } = window.location
	console.log(pathname)

	useEffect(() => {
		router.navigate('/home')
	}, [])

	const handleClick = (route) => {
		router.navigate(`/${route}`)
	}

	router.on('/home', () => {}, {
		after() {
			$('#home').style.opacity = 1
			$('#home').style.display = ''
		},
		leave(done){
			$('#home').style.opacity = 0
			$('#home').style.display = 'none'
			done()
		}
	})

	router.on('/livetv', () => {}, {
		after() {
			$('#livetv').style.opacity = 1
			$('#livetv').style.display = ''
		},
		leave(done){
			$('#livetv').style.opacity = 0
			$('#livetv').style.display = 'none'
			done()
		}
	})

	return (
		<>
			<div className="top-menu">
				<ul className="list-links">
					<li className="link-menu" onClick={() => handleClick('home')}>Home</li>
					<li className="link-menu" onClick={() => handleClick('livetv')}>Live tv</li>
					<li className="link-menu" onClick={() => handleClick('vod')}>Vod</li>
					<li className="link-menu" onClick={() => handleClick('radio')}>Radio</li>
					<li className="link-menu" onClick={() => handleClick('music')}>Music</li>
					<li className="link-menu" onClick={() => handleClick('zonakids')}>Zona kids</li>
				</ul>
			</div>
			<div id="home" style={{ 'opacity': '0', 'display': 'none'}}>
				<div className="welcome-message">Home</div>
			</div>
			<div id="livetv" style={{ 'opacity': '0', 'display': 'none'}}>
				<div className="welcome-message">Live TV</div>
			</div>
			<div id="vod" style={{ 'opacity': '0', 'display': 'none'}}>
				<div className="welcome-message">Vod</div>
			</div>
			<div id="radio" style={{ 'opacity': '0', 'display': 'none'}}>
				<div className="welcome-message">Radio</div>
			</div>
			<div id="music" style={{ 'opacity': '0', 'display': 'none'}}>
				<div className="welcome-message">Music</div>
			</div>
			<div id="zonakids" style={{ 'opacity': '0', 'display': 'none'}}>
				<div className="welcome-message">Zona Kids</div>
			</div>
		</>
	)
}

export default App