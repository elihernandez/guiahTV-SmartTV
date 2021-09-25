require('../webOSTVjs-1.2.3/webOSTV.js')
require('../webOSTVjs-1.2.3/webOSTV-dev.js')

/* eslint-disable no-undef */
export function isWebOS(){
	if(typeof webOS !== 'undefined' && webOS.platform.tv === true){
		return true
	}

	return false
}

export function getWebosType(){
	// eslint-disable-next-line no-unused-vars
	return new Promise(function(resolve, reject){
		webOS.deviceInfo(function (device) {
			const deviceType = device.modelName
			// deviceFirmwareVersion = device.version
			// deviceSdkVersion = device.sdkVersion
			resolve(deviceType)
		})
	})
}

export function getWebosUUID(){
	return new Promise(function(resolve){
		webOS.service.request('luna://com.webos.service.sm', {
			method: 'deviceid/getIDs',
			parameters: { 
				'idType': ['LGUDID']        
			},
			onSuccess: function (inResponse) {
				const deviceUUID = inResponse.idType ? inResponse.idType : inResponse.idList[0].idValue
				resolve(deviceUUID)
			},
			onFailure: function (inError) {
				console.log('Failed to get system ID information')
				console.log('[' + inError.errorCode + ']: ' + inError.errorText)
				resolve('UUID-Emulator')
			}
		})
	})
}