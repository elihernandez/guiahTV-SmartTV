import userState from './userState'
import deviceState from './deviceState'
import { getLocalStorageWithExpiry, setLocalStorageWithExpiry } from '../utils/localStorage'

function setLoaderApp (set) {
	const expiry = 60 * 60 * 24 * 31
	let isShowVideo = getLocalStorageWithExpiry('isShowVideo')
	let isShowLogo = null

	if(!isShowVideo){
		setLocalStorageWithExpiry('isShowVideo', true, expiry)
		isShowVideo = true
		isShowLogo = false
	}else{
		isShowVideo = false
		isShowLogo = true
	}
    
	set(state => {
		return {
			appState: {
				...state.appState,
				isShowVideo,
				isShowLogo
			}
		}
	})

}

export default function appState(set){
	return {
		loadedApp: false,
		isShowVideo: null,
		isShowLogo: null,
		loadApp: async () => {
			setLoaderApp(set)
			const user = userState(set)
			const device = await deviceState()
			set({ userState: user })
			set({ deviceState: device })
			set(state => {
				return { 
					appState: { 
						...state.appState,
						loadedApp: true
					} 
				}
			})
		},
	}
}