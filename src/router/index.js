import Navigo from 'navigo'
export const url = window.location.href
export const router = new Navigo('/', {
	hash: true
})

// export const router = new Navigo('media/developer/apps/usr/palm/applications/com.guiahtv.smarttv/')
// export const router = new Navigo(`${window.location.href}/`)