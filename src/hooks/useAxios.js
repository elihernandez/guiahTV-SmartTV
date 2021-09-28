import axios from '../utils/axios'
// import { useState, useCallback } from 'react'
// import { useSelector } from 'react-redux'
import { createSignal } from 'solid-js'
import * as Error from '../components/Error'
// import { createSignal, createMemo } from 'solid-js'
import { getURL } from '../api/endpoints'
import { validateSuscription, validateError } from '../utils/auth'
// import { setSuscriptionStatus } from '../redux/reducers/userReducer'

export default function useAxios(){
	// const userToken = useSelector(state => state.user.userToken)
	[getCount, setCount] = createSignal(0)
	const userToken = ''
	// const [loading, setLoading] = createSignal(true)
	// const [count, setCount] = createSignal(0)

	// const retryRequest = () => {
	// 	if(count <= 2){
	// 		setCount(count + 1)
	// 	}
	// }

	const get = async (section, params = {}, body = {}) => {
		return await fetchData('get', section, params, body)
	}

	const incrementCount = () => {
		const currentCount = getCount()

		currentCount < 3
			? setCount(currentCount + 1)
			: setCount(0)

		// console.log(getCount())
	}

	const fetchData = async (type, section, params, body) => {
		try{
			const url = getURL(section, userToken, params)

			const listFetchs = {
				'get': await axios.get(url, body)
			}
		
			const response = listFetchs[type]
			validateSuscription(response)
			// setLoading(false)
			return response
		}catch(e){
			const { error, code } = validateError(e)
			// console.log(error)
			// console.log(code)

			switch(code){
			case 0: // error del api
				// throw(<ErrorComponent.ErrorMessage handleRequest={retryRequest} count={count} />)
			case 1: // error de sesión
				throw(<Error.ErrorSession handleRequest={incrementCount} message={error} />)
			case 2: // error del cliente
			case 3: // error del servidor
			case 4: // network error
			case 5: // request aborted
			case 6: // timeout
				// throw(<ErrorComponent.ErrorTimeout handleRequest={retryRequest} count={count} />)
			default: // error desconocido
				// throw(<ErrorComponent.ErrorSession message={error} />)
			}
		}
	}

	return {
		get,
		getCount
	}
}