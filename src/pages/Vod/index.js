import { createSignal, Show } from 'solid-js'
import useRouter from '../../hooks/useRouter'
import useAxios from '../../hooks/useAxios'
import { fadeInElement, fadeOutElement } from '../../utils/transition'
import { $ } from '../../utils/dom'

import Catalogue from './Catalogue'

export default function Vod(){
	const [getData, setData] = createSignal(null),
		axios = useAxios(),
		route = 'vod',
		onBefore = () => {
			const el = $(`#${route}`), loader  = $('.main-loader')
			fadeInElement(loader, '0', '1', '150ms')
			axios.get('catalogue-vod')
				.then(response => {
					setData(response)
					fadeInElement(el, '0', '1', '150ms')
					fadeOutElement(loader, '1', '0', '150ms', '2000ms')
				})
		},
		onLeave = () => {
			const el = $(`#${route}`)
			fadeOutElement(el, '1', '0', '150ms')
			setData(null)
		}

	useRouter({ route, onBefore, onLeave })

	return(
		<div id="vod" style={{'opacity': '0', 'display': 'none'}}>
			<Show when={getData()}>
				<Catalogue data={getData()} />
			</Show>
		</div>
	)
}