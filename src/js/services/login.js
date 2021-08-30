function requestLogin(){
    axios
    .get(urlGetApi + "cmd/logusr/" + username + "/" + suscriberPassword, {
      params: {
        DevicePlatform: devicePlatform,
        DeviceType: deviceType,
        DeviceUUID: deviceUUID,
        DeviceVersion: versionApp,
      }
    })
    .then(function (response) {
      validateSuscriptionStatusCode(response.data, username);
    })
    .catch(function (error) {
      showMessageLoginFailed(response.data);
    });
}