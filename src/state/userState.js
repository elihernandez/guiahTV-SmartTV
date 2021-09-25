import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export default function userState(set){
	return {		
		userID: getLocalStorage('userID') || null,
		userEmail: getLocalStorage('userEmail') || null,
		userSuscription: getLocalStorage('userSuscription') || null,
		setUserData: ({ key, value }) => {
			set(state => {
				setLocalStorage(key, value)

				return { 
					userState: { 
						...state.userState,
						[key]: value 
					}
				}
			})
		}
	}
}