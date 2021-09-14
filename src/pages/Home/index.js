import useRouter from '../../hooks/useRouter'
import useAxios from '../../hooks/useAxios'
import { fadeInElement, fadeOutElement } from '../../utils/transition'
import { $ } from '../../utils/dom'

export default function HomePage(){
	const axios = useAxios()
	const route = 'home'
	useRouter({ route, onBefore, onLeave })
	
	function onBefore(){
		const el = $('#home')
		const loader  = $('.main-loader')
		fadeInElement(loader, '0', '1', '150ms')
		axios.get('spotlight')
			.then(response => {
				console.log(response)
				fadeInElement(el, '0', '1', '150ms')
				fadeOutElement(loader, '1', '0', '150ms')
			})
	}

	function onLeave() {
		const el = $('#home')
		fadeOutElement(el, '1', '0', '150ms')
	}

	return (
		<div className="section-wrapper" id="home" style={{ 'opacity': '0', 'display': 'none'}}>
			<div className="welcome-message">Home</div>
		</div>
	)
}