import { createSignal } from 'solid-js'
import axios from '../utils/axios'
import { getURL } from '../api/endpoints'
import { validateSuscription, validateError } from '../utils/auth'
import ErrorSession, { ErrorNetwork } from '../components/Error'
// import { setSuscriptionStatus } from '../redux/reducers/userReducer'

export default function useAxios(){
	// const userToken = useSelector(state => state.user.userToken)
	const userToken = '',
		[getCount, setCount] = createSignal(0),
		[getErrorCode, setErrorCode] = createSignal(null),
		[getErrorMessage, setErrorMessage] = createSignal(null)

	const get = async (section, params = {}, body = {}) => {
		return await fetchData('get', section, params, body)
	}

	const incrementCount = () => {
		const currentCount = getCount()
		currentCount < 3 && setCount(currentCount + 1)
	}

	const resetCount = () => {
		setCount(0)
	}

	const fetchData = async (type, section, params, body) => {
		try{
			setErrorCode(null)
			setErrorMessage(null)
			const url = getURL(section, userToken, params)

			const listFetchs = {
				'get': await axios.get(url, body)
			}
		
			const response = listFetchs[type]
			validateSuscription(response)
			return response
		}catch(e){
			const { error, code } = validateError(e)
			setErrorCode(2)
			setErrorMessage(error)
			throw('error')

			// switch(code){
			// case 0: // error del api
			// 	throw(<ErrorNetwork handleRequest={incrementCount} message={error} count={getCount} />)
			// case 1: // error de sesión
			// 	throw(<ErrorSession handleRequest={incrementCount} message={error} count={getCount} />)
			// case 2: // error del cliente
			// 	throw(<ErrorNetwork handleRequest={incrementCount} message={error} count={getCount} />)
			// case 3: // error del servidor
			// 	throw(<ErrorNetwork handleRequest={incrementCount} message={error} count={getCount} />)
			// case 4: // network error
			// 	throw(<ErrorNetwork handleRequest={incrementCount} message={error} count={getCount} />)
			// case 5: // request aborted
			// 	throw(<ErrorNetwork handleRequest={incrementCount} message={error} count={getCount} />)
			// case 6: // timeout
			// 	throw(<ErrorNetwork handleRequest={incrementCount} message={error} count={getCount} />)
			// default: // error desconocido
			// 	throw(<ErrorSession handleRequest={incrementCount} message={error} count={getCount} />)
			// }
		}
	}

	return {
		get,
		incrementCount,
		count: getCount,
		reset: resetCount,
		errorCode: getErrorCode,
		errorMessage: getErrorMessage
	}
}