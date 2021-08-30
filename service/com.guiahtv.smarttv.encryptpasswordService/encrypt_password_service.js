const bcrypt = require('bcryptjs')
const Service = require('webos-service')
const service = new Service("com.guiahtv.smarttv.encryptpasswordservice")

service.register("encryptPassword", function(message) {
	bcrypt.genSalt(12, function(_err, salt) {
		bcrypt.hash(message.payload.string, salt, function(_err, hash) {
			// Store hash in your password DB.
			message.respond({
				username: message.payload.username,
				password: hash
			});
		});
	});
});