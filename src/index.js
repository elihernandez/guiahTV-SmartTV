// require('./js/dist/bcrypt')
import './assets/iconcolor80x80.png'
import './assets/iconcolor130x130.png'
const topMenu = document.getElementById('top-menu')
topMenu.parentNode.removeChild(topMenu)
document.getElementById('app').innerHTML = ''

import 'babel-polyfill'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import MainLoaders from './components/MainLoaders'
// import { render } from 'solid-js/web'

import './styles.css'
require('./js/dist/hls')
require('./js/dist/js-cookie')

const root = createRoot(document.getElementById('app'))
root.render(
	<>
		<App />
		<MainLoaders />
	</>
)