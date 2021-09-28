import { createEffect, createSignal, Show } from 'solid-js'
import useRouter from '../../hooks/useRouter'
import useAxios from '../../hooks/useAxios'
import { fadeInElement, fadeOutElement } from '../../utils/transition'
import { $ } from '../../utils/dom'

import Catalogue from './Catalogue'
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
			const el = $(`#${route}`)
			fadeOutElement(el, '1', '0', '150')
			setData(null)
		},
		fetchData = () => {
			const el = $(`#${route}`), loader = $('.main-loader')
			fadeInElement(loader, '0', '1', '150')
			axios.get('catalogue-vod')
				.then(response => {
					setData(response)
				})
				.catch(error => {
					setError(error)
				})
				.finally(() => {
					fadeInElement(el, '0', '1', '150')
					fadeOutElement(loader, '1', '0', '150', '1000')
				})
		}

	createEffect(() => {
		if(axios.getCount() <= 3){
			console.log(axios.getCount())
			fetchData()
		}
	})

	useRouter({ route, onBefore, onLeave })

	return(
		<div id="vod" style={{'opacity': '0', 'display': 'none'}}>
			<div className="background-image" >
				<img id='background-image' />
			</div>
			<Show when={getData()}>
				<Catalogue data={getData()} />
			</Show>
			<Show when={getError()}>
				{getError()}
			</Show>
		</div>
	)
}