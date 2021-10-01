import { createEffect, createSignal, onMount, Show } from 'solid-js'
import useRouter from '../../hooks/useRouter'
import useAxios from '../../hooks/useAxios'
import { fadeInElement, fadeOutElement } from '../../utils/transition'
import { $ } from '../../utils/dom'

import Catalogue from './Catalogue'
import Error from '../../components/Error'
import './styles.css'

export default function Vod(){
	const [getData, setData] = createSignal(null),
		[getError, setError] = createSignal(null),
		axios = useAxios(),
		route = 'vod',
		onBefore = () => {
			fetchData()
		},
		onLeave = () => {
			const page = $(`#${route}`)
			fadeOutElement(page, '1', '0', '150')
			setData(null)
			axios.reset()
		},
		fetchData = async () => {	
			const page = $(`#${route}`), loader = $('.main-loader')

			try{
				setError(null)
				fadeInElement(loader, '0', '1', '150')
				const response = await axios.get('catalogue-vod')
				setData(response)
			}catch(e){
				setError(e)
			}finally{
				fadeInElement(page, '0', '1', '150')
				fadeOutElement(loader, '1', '0', '150', '1000')
			}
		}

	createEffect(() => {
		const currentCount = axios.count()
		console.log(currentCount)
		if(currentCount !== 0 && currentCount <= 3){
			fetchData()
		}
	})

	useRouter({ route, onBefore, onLeave })

	return(
		<div id={route} style={{'opacity': '0', 'display': 'none'}}>
			<div className="background-image" >
				<img id='background-image' />
			</div>
			<Show when={getData()}>
				<Catalogue data={getData()} />
			</Show>
			<Show when={getError()}>
				<Error
					count={axios.count} 
					code={axios.errorCode}
					message={axios.errorMessage}
					handleRequest={axios.incrementCount}
				/>
			</Show>
		</div>
	)
}