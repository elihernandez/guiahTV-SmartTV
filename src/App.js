import { useEffect } from 'react'
import iconColor80 from './assets/iconcolor80x80.png'
import iconColor130 from './assets/iconcolor130x130.png'
import './styles.css'
import { router } from './router'
import HomePage from './pages/Home'
import LiveTvPage from './pages/LiveTv'
import VodPage from './pages/Vod'
import RadioPage from './pages/Radio'
import MusicPage from './pages/Music'
import ZonaKids from './pages/ZonaKids'
import { MainLoader } from './components/Loader'
export const App = () => {

	useEffect(() => {
		router.navigate('/home')
	}, [])

	const handleClick = (route) => {
		router.navigate(`/${route}`)
	}

	return (
		<div className="main-section">
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
			<MainLoader />
		</div>
	)
}

export default App