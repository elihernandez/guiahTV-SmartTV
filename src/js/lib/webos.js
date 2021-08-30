function isWebOS(){
	if(webOS.platform.tv === true){
		return true
	}

	return false
}

function getInfoWebOS(callback){
	getDeviceInfo()
	getSystemTv()
	getSystemId()  
	devicePlatform = 'LG SmartTv'
	getVersionApp()
	return callback()
}

function getDeviceInfo(){
	webOS.deviceInfo(function (device) {
		deviceType = device.modelName
		deviceFirmwareVersion = device.version
		deviceSdkVersion = device.sdkVersion
	})
}

function getSystemTv(){
	var request = webOS.service.request('luna://com.webos.service.tv.systemproperty', {
		method: 'getSystemInfo',
		parameters: { 
			'keys': ['modelName', 'firmwareVersion', 'UHD', 'sdkVersion']
		},
		onComplete: function (inResponse) {
			var isSucceeded = inResponse.returnValue
    
			if (isSucceeded){

				// console.log("TV Device Information: " + JSON.stringify(inResponse));
				// To-Do something
			} else {
				console.log('Failed to get TV device information')
				// To-Do something
				return
			}
		}
	})
}

function getSystemId(){
	var request = webOS.service.request('luna://com.webos.service.sm', {
		method: 'deviceid/getIDs',
		parameters: { 
			'idType': ['LGUDID']        
		},
		onSuccess: function (inResponse) {
			if(inResponse.idType){
				deviceUUID = inResponse.idType
			}else{
				deviceUUID = inResponse.idList[0].idValue
			}
			// console.log("System ID information: " + JSON.stringify(inResponse));
			// console.log(inResponse.idList[0].idValue);
			// To-Do something
		},
		onFailure: function (inError) {
			console.log('Failed to get system ID information')
			console.log('[' + inError.errorCode + ']: ' + inError.errorText)
			// To-Do something
			return
		}
	})
}