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
import { fadeInElement } from './utils/transition'
import { render } from 'solid-js/web'
// require('./js/dist/bcrypt')
// require('./js/dist/hls')
// require('./js/dist/js-cookie')

function Main(){
	const { isShowVideo } = getState().appState
	
	onMount(() => {
		let loader
		if(isShowVideo){
			loader = $('.video-loader')
			fadeInElement(loader, '0', '1', '150ms')
			$('#video-logo').play()
		}else{
			loader = $('.logo-loader')
			fadeInElement(loader, '0', '1', '150ms')
		}
	})

	return (
		<div className="main-loader-app">
			<LogoLoader />
			<VideoLoader />
		</div>
	)
}

render(
	() => (
		<>
			<Main />
			<App />
		</>
	),
	document.getElementById('app')
)