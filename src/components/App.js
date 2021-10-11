import { getState, subscribe } from '../state'
import { router } from '../router'
import HomePage from '../pages/Home'
import { onMount } from 'solid-js'
import Menu from './Menu'
import VodPage from '../pages/Vod'
import LiveTvPage from '../pages/LiveTv'
// import RadioPage from './pages/Radio'
// import MusicPage from './pages/Music'
// import ZonaKids from './pages/ZonaKids'
import { MainLoader } from './Loader'
import { fadeInElement, fadeOutElement } from '../utils/transition'
import { $ } from '../utils/dom'

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

	return (
		<div className="main-section" style={{ 'opacity': '0', 'display': 'none' }}>
			<Menu />
			<HomePage />
			<LiveTvPage />
			<VodPage />
			{/* 
			<RadioPage />
			<MusicPage />
			<ZonaKids />
			 */}
			<MainLoader />
		</div>
	)
}

export default App