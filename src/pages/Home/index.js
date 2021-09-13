import { useEffect } from 'react'
import useRouter from '../../hooks/useRouter'
import useAxios from '../../hooks/useAxios'
import { fadeInElement, fadeOutElement } from '../../utils/transition'
import { $ } from '../../utils/dom'

export default function HomePage(){
	const axios = useAxios()
	useRouter({ route: 'home', el: '#home', 'loader': '.main-loader'})

	useEffect(() => {
		const domLoader  = $('.main-loader')
		fadeInElement(domLoader, '0', '1', '150ms')
		axios.fetchData({ section: 'spotlight' })
			.then(response => {
				console.log(response)
				fadeOutElement(domLoader, '1', '0', '150ms')
			})
	}, [])

	return (
		<div className="section-wrapper" id="home" style={{ 'opacity': '0', 'display': 'none'}}>
			<div className="welcome-message">Home</div>
		</div>
	)
}