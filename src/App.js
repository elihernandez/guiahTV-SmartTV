import './styles.css'
import { router } from './router'
import HomePage from './pages/Home'
import { onMount } from 'solid-js'
// import LiveTvPage from './pages/LiveTv'
import VodPage from './pages/Vod'
// import RadioPage from './pages/Radio'
// import MusicPage from './pages/Music'
// import ZonaKids from './pages/ZonaKids'
import { LogoLoader, MainLoader } from './components/Loader'
import { fadeOutElement } from './utils/transition'
import { $ } from './utils/dom'

export const App = () => {
	
	onMount(() =>{
		router.navigate('/home')
		const logo = $('.logo-loader')
		fadeOutElement(logo, '1', '0', '150ms', '2000ms')
	})

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
			<VodPage />
			{/* 
			<LiveTvPage />
			<RadioPage />
			<MusicPage />
			<ZonaKids />
			 */}
			<MainLoader />
			<LogoLoader />
		</div>
	)
}

export default App