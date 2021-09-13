import { useEffect } from 'react'
import iconColor80 from './assets/iconcolor80x80.png'
import iconColor130 from './assets/iconcolor130x130.png'
import './styles.css'
import { $ } from './utils/dom'
import Navigo from 'navigo'
const router = new Navigo('/')
import HomePage from './pages/Home'
import LiveTvPage from './pages/LiveTv'
import VodPage from './pages/Vod'
import RadioPage from './pages/Radio'
import MusicPage from './pages/Music'
import ZonaKids from './pages/ZonaKids'

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
			<HomePage />
			<LiveTvPage />
			<VodPage />
			<RadioPage />
			<MusicPage />
			<ZonaKids />
		</>
	)
}

export default App