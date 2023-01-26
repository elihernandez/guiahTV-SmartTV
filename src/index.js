// require('./js/dist/bcrypt')
import './assets/iconcolor80x80.png'
import './assets/iconcolor130x130.png'
const topMenu = document.getElementById('top-menu')
topMenu.parentNode.removeChild(topMenu)
document.getElementById('app').innerHTML = ''

import 'babel-polyfill'
import MainLoaders from './components/MainLoaders'
import App from './components/App'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
// require('./js/dist/hls')
// require('./js/dist/js-cookie')

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

root.render(
	<>
		<App />
		<MainLoaders />
	</>
)