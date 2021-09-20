export function getSuscription(response){
	if(response.suscriptionStatus){
		return response.suscriptionStatus
	}else if(response[0]) {
		if(response[0].SuscriptionStatus){
			return response[0].SuscriptionStatus
		}
	}

	return null
}

export function validateSuscription(response){
	const suscriptionStatus = getSuscription(response)

	switch(suscriptionStatus){
	case 0: // 0 Suscripción expirada
		console.log('Suscripción expirada')
		break
	case 1:  // 1 Suscripción válida
		console.log('Suscripción válida')
		break
	case 2: // 2 Suscripción periodo de gracia
		console.log('Suscripción en periodo de gracia')
		break
	case 3: // 3 Suscripción gratuita
		console.log('Suscripción gratuita')
		break
	case 4: // 4 Sesión no válida
		throw new Error(1)
	default:
		console.log('No se envió suscripción')
	}
}

export function validateError(e){
	const code = parseInt(e.message)

	const listErrors = {
		0: 'No se pudo obtener la información, intente de nuevo.',
		1: 'Sesión no válida, favor de iniciar nueva sesión.',
		2: 'No se pudo obtener la información, intente de nuevo.',
		3: 'No se pudo obtener la información, intente de nuevo.',
		4: 'Hay un problema en la conexión a internet.',
		5: 'Hay un problema en la conexión a internet.',
		6: 'Hay un problema en la conexión a internet.',
	}

	return listErrors[code] || 'Error desconocido'
}