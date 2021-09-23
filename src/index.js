import './assets/iconcolor80x80.png'
import './assets/iconcolor130x130.png'
import { $ } from './utils/dom'

$('#top-menu').parentNode.removeChild($('#top-menu'))
$('#app').innerHTML = ''

import 'babel-polyfill'
import { render } from 'solid-js/web'
import App from './App'

// require('./js/dist/bcrypt')
// require('./js/dist/hls')
// require('./js/dist/js-cookie')
// require('./js/dist/jquery')
// require('./js/dist/slick')

render(
	() => <App />,
	document.getElementById('app')
)

// render(
// 	<App />,
// 	document.getElementById('app')
// )