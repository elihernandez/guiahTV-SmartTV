var Service = require('webos-service');
var service = new Service("com.guiahtv.smarttv.updateversioncode");
var fs = require('file-system');
const axios = require('axios');

service.register("updateVersion", function(message) {
	
});