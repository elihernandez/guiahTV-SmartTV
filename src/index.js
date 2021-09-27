import './assets/iconcolor80x80.png'
import './assets/iconcolor130x130.png'
const topMenu = document.getElementById('top-menu')
topMenu.parentNode.removeChild(topMenu)
document.getElementById('app').innerHTML = ''

import 'babel-polyfill'
import MainLoaders from './components/MainLoaders'
import App from './components/App'
import { render } from 'solid-js/web'
import './styles.css'
// require('./js/dist/bcrypt')
// require('./js/dist/hls')
// require('./js/dist/js-cookie')

render(
	() => (
		<>
			<App />
			<MainLoaders />
		</>
	),
	document.getElementById('app')
)