export function validateSuscription(response){
	if(response.suscriptionStatus){
		return response.suscriptionStatus
	}else if(response[0]) {
		if(response[0].SuscriptionStatus){
			return response[0].SuscriptionStatus
		}
	}

	return null
}