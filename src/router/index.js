console.log(window.location.href)

import Navigo from 'navigo'
export const url = window.location.href
export const router = new Navigo('/', {
	hash: true
})
// export const router = new Navigo('media/developer/apps/usr/palm/applications/com.guiahtv.smarttv/')
// export const router = new Navigo(`${window.location.href}/`)

// import Router from 'vanilla-router'

// export const router = new Router({
// 	mode: 'history',
// 	page404: function (path) {
// 		console.log('"/' + path + '" Page not found')
// 	}
// })