import axios from '../utils/axios'
// import { useState, useCallback } from 'react'
// import { useSelector } from 'react-redux'
// import * as ErrorComponent from '../components/ErrorMessage'
// import { createSignal, createMemo } from 'solid-js'
import { getURL } from '../api/endpoints'
import { validateSuscription, validateError } from '../utils/auth'
// import { setSuscriptionStatus } from '../redux/reducers/userReducer'

export default function useAxios(){
	// const userToken = useSelector(state => state.user.userToken)
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

	const fetchData = async (type, section, params, body) => {
		try{
			// setLoading(true)
			const url = getURL(section, userToken, params)

			const listFetchs = {
				'get': await axios.get(url, body)
			}
		
			const response = listFetchs[type]
			// validateSuscription(response)
			// setLoading(false)
			return response
		}catch(e){
			const error = validateError(e)
			console.log(error)
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
		get
	}
}