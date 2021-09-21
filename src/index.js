
let topMenu = document.getElementById('top-menu')
topMenu.parentNode.removeChild(topMenu)

import { render } from 'solid-js/web'
import { createSignal, onCleanup, createEffect, createMemo, createResource } from 'solid-js'
// import 'babel-polyfill'
// import ReactDOM from 'react-dom'
// import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
// import App from './App'

// require('./js/dist/bcrypt')
// require('./js/dist/hls')
// require('./js/dist/jquery')
// require('./js/dist/js-cookie')
// require('./js/dist/slick')


const App = () => {
	const [getData, setData] = createSignal(0)
	console.log(getData())
	setData(2)
	console.log(getData())
	
	return <h1>Hola mundo</h1>
}

render(
	App,
	document.getElementById('app')
)

// ReactDOM.render(
// 	<App />,
// 	document.getElementById('app')
// )