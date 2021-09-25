import { getLocalStorage, setLocalStorage } from '../utils/localStorage'
import { isWebOS, getWebosType, getWebosUUID } from '../utils/webos'
import { isTizenOS, getTizenType, getTizenUUID } from '../utils/tizen'
import { v4 as uuidv4 } from 'uuid'
import browserInfo from 'browser-info'
const browserName = browserInfo().name
const browserVersion = browserInfo().version

function getDeviceUUID(){
	if(getLocalStorage('deviceUUID')){
		return getLocalStorage('deviceUUID')
	}else{
		const uuid = uuidv4()
		setLocalStorage('deviceUUID', uuid)
		return uuid
	}
}

export default async function deviceState(){
	let devicePlatform
	let deviceType
	let deviceUUID
	let deviceVersion = '2.0.1'

	if (isWebOS()) {
		devicePlatform = 'LG SmartTv'
		deviceType = await getWebosType()
		deviceUUID = await getWebosUUID()
	} else if(isTizenOS()){ 
		devicePlatform = 'Samsung SmartTv'
		deviceType = await getTizenType()
		deviceUUID = await getTizenUUID()
	}else {
		devicePlatform = 'Web Browser'
		deviceType = `${browserName} ${browserVersion}`
		deviceUUID = getDeviceUUID()
	}

	return {
		devicePlatform,
		deviceType,
		deviceUUID,
		deviceVersion
	}
}