function isTizenOS() {
    if (typeof webapis !== 'undefined') 
        // var downloadRequest = new tizen.DownloadRequest('http://download.tizen.org/tools/README.txt', 'downloads');

        // tizen.systeminfo.getPropertyValue('NETWORK', function(networkInfo) {
        //     if (networkInfo.networkType === 'NONE') {
        //         console.log('Network connection is not available. Download is not possible.');
        //         downloadRequest = null;
        //     }
        // });

        // var listener = {
        //     /* When the download progresses (interval is platform-dependent) */
        //     onprogress: function(id, receivedSize, totalSize) {
        //         console.log('Received with id: ' + id + ', ' + receivedSize + '/' + totalSize);
        //     },

        //     /* When the user pauses the download */
        //     onpaused: function(id) {
        //         console.log('Paused with id: ' + id);
        //     },

        //     /* When the user cancels the download */
        //     oncanceled: function(id) {
        //         console.log('Canceled with id: ' + id);
        //     },

        //     /* When the download is completed */
        //     oncompleted: function(id, fullPath) {
        //         console.log('Completed with id: ' + id + ', full path: ' + fullPath);
        //     },

        //     /* When the download fails */
        //     onfailed: function(id, error) {
        //         console.log('Failed with id: ' + id + ', error name: ' + error.name);
        //     }
        // };

        // downloadId = tizen.download.start(downloadRequest, listener); 
        // $.ajax({
        //     timeout: timeoutGetApi,
        //     url: urlGetApi+'cmd/getLinkLeon/17009/sBVUOUYodebALrhqWkcVAYlUIUaK_DKhRtHgyS6E9qg',
        //     success: function(response) {
        //         console.log(response)
        //         var objElem = document.createElement('object');
        //         objElem.type = 'application/avplayer';
        //         document.body.appendChild(objElem);
        //         webapis.avplay.open(response.Url);

        //         var successCallback = function() {
        //             webapis.avplay.play(); 
        //         }

        //         var errorCallback = function() {
        //         console.log('The media has failed to prepare');
        //         }

        //         webapis.avplay.prepare(successCallback,errorCallback);
        //     },
        //     error: function() {

        //     }
        // }); 
        tizen.tvinputdevice.registerKey('ColorF0Red');
        return true;
    }

    return false;
}

function getInfoTizen(callback) {
    try {
        listenerID = webapis.network.addNetworkStateChangeListener(onChange);
    } catch (e) {
        console.log("addNetworkStateChangeListener exception [" + e.code
            + "] name: " + e.name + " message: " + e.message);
    }

    if (listenerID > -1) {
        console.log("addNetworkStateChangeListener success listener ID [" + listenerID + "] ");
    }

    validateNetwork();
    getTizenDeviceInfo();
    deviceUUID = getTizenUUID();
    devicePlatform = "Samsung SmartTv";
    getVersionApp();
    return callback();
}

function getTizenUUID() {
    try {
        var value = webapis.appcommon.getUuid();
        console.log("Uuid value = " + value);
        return value;
    } catch (e) {
        if (e.message.indexOf('undefined') == -1) {
            // Error, such as a missing privilege
        } else {
            // Undefined error
            // Older firmware and models do not support this method
            // Consider using a legacy method
        }
    }
}

function getTizenDeviceInfo() {
    try {
        deviceType = webapis.productinfo.getModel();
        deviceFirmwareVersion = webapis.productinfo.getFirmware();
        // deviceSdkVersion = device.sdkVersion;
        console.log(" Model value = " + deviceType);
        console.log(" Firmware version = " + deviceFirmwareVersion);
    } catch (error) {
        console.log(" error code = " + error.code);
    }
}

var onChange = function (data) {
    console.log("[NetworkStateChangedCallback] data :" + data + " changed");
}

function getConnectionType() {
    var connType = null;
    var retVal = null;
    var data = null;

    try {
        retVal = webapis.network.getActiveConnectionType();
    } catch (e) {
        console.error("getActiveConnectionType exception [" + e.code + "] message: " + e.message);
    }

    if (null != retVal) {
        switch (retVal) {
            case webapis.network.NetworkActiveConnectionType.DISCONNECTED:
                connType = "DISCONNECTED";
                data = { value: 0, type: connType }
                break;
            case webapis.network.NetworkActiveConnectionType.WIFI:
                connType = "WIFI";
                data = { value: 1, type: connType }
                break;
            case webapis.network.NetworkActiveConnectionType.CELLULAR:
                connType = "CELLULAR";
                data = { value: 2, type: connType }
                break;
            case webapis.network.NetworkActiveConnectionType.ETHERNET:
                connType = "ETHERNET";
                data = { value: 3, type: connType }
                break;
            default:
                connType = "Error";
        }
        return data;
    }
}

var validate = 0;
function validateNetwork() {
    if (isTizenOS()) {
        var data = getConnectionType();
        console.log("Active Connection Type: " + data.type);
        switch (data.value) {
            case 0:
                return false;
            case 1:
                return true;
            case 2:
                return true;
            case 3:
                return true;
        }
    }

    // if(validate == 0){
    //     // validate++;
    //     console.log("Sin conexion de red")
    //     return false;
    // }else{
    //     console.log("Se establecio conexion de red")
    //     return true;
    // }

    return null;
}
