import './assets/iconcolor80x80.png'
import './assets/iconcolor130x130.png'
import { $ } from './utils/dom'

$('#top-menu').parentNode.removeChild($('#top-menu'))
$('#app').innerHTML = ''

import 'babel-polyfill'
import { getState } from './state'
import App from './App'
import { LogoLoader, VideoLoader } from './components/Loader'
import { onMount } from 'solid-js'
import { render } from 'solid-js/web'
import { fadeInElement } from './utils/transition'
// require('./js/dist/bcrypt')
// require('./js/dist/hls')
// require('./js/dist/js-cookie')

function Main(){
	const { isShowVideo } = getState().appState
	
	onMount(() => {

		function showVideo(){
			fadeInElement($('.video-loader'), '0', '1', '150')
			$('#video-logo').play()
		}

		isShowVideo
			? showVideo()
			: fadeInElement($('.logo-loader'), '0', '1', '150')
	})

	return (
		<>
			<LogoLoader />
			<VideoLoader />
		</>
	)
}

render(
	() => (
		<>
			<App />
			<Main />
		</>
	),
	document.getElementById('app')
)