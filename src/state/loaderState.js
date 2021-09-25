import { getLocalStorageWithExpiry, setLocalStorageWithExpiry } from '../utils/localStorage'

export default function loaderState(set){

	const expiry = 60 * 60 * 24 * 31

	return {		
		isShowVideo: null,
		setLoaderApp: () => {
			let loaderVideo = getLocalStorageWithExpiry('loaderVideo')
                
			if(!loaderVideo){
				setLocalStorageWithExpiry('loaderVideo', true, expiry)
				loaderVideo = true
			}

			set(state => {
				return {
					loaderState: {
						...state.loaderState,
						loaderVideo
					}
				}
			})
		}
 	}
}