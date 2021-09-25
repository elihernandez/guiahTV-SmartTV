import { getState, subscribe } from './state'
import { router } from './router'
import HomePage from './pages/Home'
import { createSignal, onMount } from 'solid-js'
// import LiveTvPage from './pages/LiveTv'
import VodPage from './pages/Vod'
// import RadioPage from './pages/Radio'
// import MusicPage from './pages/Music'
// import ZonaKids from './pages/ZonaKids'
import { LogoLoader, MainLoader } from './components/Loader'
import { fadeInElement, fadeOutElement } from './utils/transition'
import { $ } from './utils/dom'
import './styles.css'

export const App = () => {
	const { isShowVideo, isShowLogo } = getState().appState
	
	function loadedApp(){
		let logo
		router.navigate('/home')
		console.log(isShowVideo)
		console.log(isShowLogo)
		
		if(isShowLogo){
			setTimeout(() => {
				logo = $('.logo-loader')
				fadeInElement($('.main-section'), '0', '1', '150ms')
				fadeOutElement(logo, '1', '0', '150ms')
			}, 1500)
		}
		
		if(isShowVideo){
			setTimeout(() => {
				logo = $('.video-loader')
				fadeInElement($('.main-section'), '0', '1', '150ms')
				fadeOutElement(logo, '1', '0', '150ms')
			}, 6500)
		}
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