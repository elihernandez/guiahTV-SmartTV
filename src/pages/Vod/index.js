import useRouter from '../../hooks/useRouter'
import useAxios from '../../hooks/useAxios'
import { fadeInElement, fadeOutElement } from '../../utils/transition'
import { $ } from '../../utils/dom'

export default function Vod(){
	const axios = useAxios(),
		route = 'vod',
		onBefore = () => {
			const el = $(`#${route}`)
			const loader  = $('.main-loader')
			fadeInElement(loader, '0', '1', '150ms')
			axios.get('catalogue-vod')
				.then(response => {
					console.log(response)
					fadeInElement(el, '0', '1', '150ms')
					fadeOutElement(loader, '1', '0', '150ms', '1000ms')
				})
		},
		onLeave = () => {
			const el = $(`#${route}`)
			fadeOutElement(el, '1', '0', '150ms')
		}

	useRouter({ route, onBefore, onLeave })

	return(
		<div id="vod" style={{ 'opacity': '0', 'display': 'none'}}>
			<div className="welcome-message">Vod</div>
		</div>
	)
}