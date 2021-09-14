import axios from '../utils/axios'
import { useState, useCallback } from 'react'
// import { useSelector } from 'react-redux'
// import * as ErrorComponent from '../components/ErrorMessage'
import { getURL } from '../api/endpoints'
import { validateSuscription } from '../utils/auth'
// import { setSuscriptionStatus } from '../redux/reducers/userReducer'

export default function useAxios(){
	// const userToken = useSelector(state => state.user.userToken)
	const userToken = ''
	const [loading, setLoading] = useState(true)
	const [count, setCount] = useState(0)

	const retryRequest = () => {
		if(count <= 2){
			setCount(count + 1)
		}
	}

	const get = useCallback(async (section, params = {}, body = {}) => {
		return await fetchData('get', section, params, body)
	}, [count])

	const fetchData = async (type, section, params, body) => {
		try{
			setLoading(true)
			const url = getURL(section, userToken, params)

			const listFetchs = {
				'get': await axios.get(url, body)
			}
		
			const response = listFetchs[type]
			const suscriptionStatus = validateSuscription(response)
			
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

			setLoading(false)
			return response
		}catch(e){
			// const code = parseInt(e.message)
			// const listErrors = {
			// 	0: 'No se pudo obtener la información, intente de nuevo.',
			// 	1: 'Sesión no válida, favor de iniciar nueva sesión.',
			// 	2: 'No se pudo obtener la información, intente de nuevo.',
			// 	3: 'No se pudo obtener la información, intente de nuevo.',
			// 	4: 'Hay un problema en la conexión a internet.',
			// 	5: 'Hay un problema en la conexión a internet.',
			// 	6: 'Hay un problema en la conexión a internet.',
			// }

			// const error = listErrors[code] || 'Error desconocido'
			// setLoading(false)

			// switch(code){
			// case 0: // error del api
			// 	throw(<ErrorComponent.ErrorMessage handleRequest={retryRequest} count={count} />)
			// case 1: // error de sesión
			// 	throw(<ErrorComponent.ErrorSession message={error} />)
			// case 2: // error del cliente
			// case 3: // error del servidor
			// case 4: // network error
			// case 5: // request aborted
			// case 6: // timeout
			// 	throw(<ErrorComponent.ErrorTimeout handleRequest={retryRequest} count={count} />)
			// default: // error desconocido
			// 	throw(<ErrorComponent.ErrorSession message={error} />)
			// }
		}
	}

	return {
		loading,
		count,
		get
	}
}