let topMenu = document.getElementById('top-menu')
topMenu.parentNode.removeChild(topMenu)

import ReactDOM from 'react-dom'
import App from './App'

require('./js/dist/bcrypt')
require('./js/dist/hls')
// require('./js/dist/jquery')
require('./js/dist/js-cookie')
require('./js/dist/spatial-navigation')
require('./js/dist/transition')
require('./js/dist/slick')

ReactDOM.render(
	<App />,
	document.getElementById('app')
)
