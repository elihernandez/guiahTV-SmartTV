import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import iconColor80 from './assets/iconcolor80x80.png'
import iconColor130 from './assets/iconcolor130x130.png'
import './styles.css'
import Navigo from 'navigo'
const router = new Navigo('/')
import $ from 'jquery'
import store, { CHANGE_CURRENT_URL, CHANGE_PREV_URL } from './store'

export const App = () => {
	const { pathname } = window.location

	useEffect(() => {
		store.on(CHANGE_PREV_URL, () => {})
	
		store.on(CHANGE_CURRENT_URL, ({ history }) => {
			console.log(history)
			// document.getElementById(currentUrl).style.opacity = 1
			// document.getElementById(currentUrl).style.display = ''
		})
	
		store.emit(CHANGE_CURRENT_URL, ({ history }) =>  {
			const { routes } = history
			console.log(routes)
			history.routes.push('home')
			const currentIndex = history.routes.length
			// return ({ history: { ...history, routes, currentIndex }})
		})

		window.onhashchange = function() {
			console.log('back')
		}
	}, [])

	const handleClick = (route) => {
		router.navigate(`${pathname}${route}`)

		// store.emit(CHANGE_PREV_URL, ({ history }) =>  {
		// 	const currentUrl = history.currentUrl
		// 	return ({ history: { ...history, prevUrl: currentUrl }})
		// })

		store.emit(CHANGE_CURRENT_URL, ({ history }) =>  {
			const routes = []
			routes.concat(history.routes)
			routes.push(route)
			const currentIndex = routes.length
			return ({ history: { ...history, routes, currentIndex }})
		})
	}

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
			<div id="home">
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