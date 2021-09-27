import { getState, subscribe } from './state'
import { router } from './router'
import HomePage from './pages/Home'
import { onMount } from 'solid-js'
// import LiveTvPage from './pages/LiveTv'
import VodPage from './pages/Vod'
// import RadioPage from './pages/Radio'
// import MusicPage from './pages/Music'
// import ZonaKids from './pages/ZonaKids'
import { MainLoader } from './components/Loader'
import { fadeInElement, fadeOutElement } from './utils/transition'
import { $ } from './utils/dom'
import './styles.css'

export const App = () => {
	const { isShowVideo } = getState().appState
	
	function loadedApp(){
		router.navigate('/home')
		fadeInElement($('.main-section'), '0', '1', '150', '150')

		isShowVideo
			? fadeOutElement($('.video-loader'), '1', '0', '150', '6500')
			: fadeOutElement($('.logo-loader'), '1', '0', '150', '1500')
	}

	onMount(() => {
		subscribe(loadedApp, state => state.appState.loadedApp)
	})

	const handleClick = (route) => {
		router.navigate(`/${route}`)
	}

	return (
		<div className="main-section" style={{ 'opacity': '0', 'display': 'none' }}>
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
		</div>
	)
}

export default App