import useRouter from '../../hooks/useRouter'
import useAxios from '../../hooks/useAxios'
import { fadeInElement, fadeOutElement } from '../../utils/transition'
import { $ } from '../../utils/dom'

export default function LiveTv(){
	const axios = useAxios(),
		route = 'livetv',
		onBefore = () => {
			const el = $('#livetv')
			const loader  = $('.main-loader')
			fadeInElement(loader, '0', '1', '150ms')
			axios.get('livetv')
				.then(response => {
					console.log(response)
					fadeInElement(el, '0', '1', '150ms')
					fadeOutElement(loader, '1', '0', '150ms', '1000ms')
				})
		},
		onLeave = () => {
			const el = $('#livetv')
			fadeOutElement(el, '1', '0', '150ms')
		}

	useRouter({ route, onBefore, onLeave })

	return (
		<div className="section-wrapper" id="livetv" style={{ 'opacity': '0', 'display': 'none'}}>
			<div className="welcome-message">Live TV</div>
		</div>
	)
}