/* eslint-disable no-undef */
export function isTizenOS() {
	if (typeof webapis !== 'undefined') {
		tizen.tvinputdevice.registerKey('ColorF0Red')
		return true
	}

	return false
}

export function getTizenType() {
	return newPromise(function(resolve){
		const deviceType = webapis.productinfo.getModel()
		// deviceFirmwareVersion = webapis.productinfo.getFirmware()
		// deviceSdkVersion = device.sdkVersion
		resolve(deviceType)
	})
}

export function getTizenUUID() {
	return newPromise(function(resolve){
		const deviceUUID = webapis.appcommon.getUuid()
       	resolve(deviceUUID)
	})
}