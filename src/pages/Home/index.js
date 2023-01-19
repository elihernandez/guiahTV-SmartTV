import React from 'react'
import useRouter from '../../hooks/useRouter'
import useAxios from '../../hooks/useAxios'
import { fadeInElement, fadeOutElement } from '../../utils/transition'
import { $ } from '../../utils/dom'

export default function HomePage() {
	const axios = useAxios(),
		route = 'home',
		onBefore = () => {
			fetchData()
		},
		onLeave = () => {
			const el = $('#home')
			fadeOutElement(el, '1', '0', '150')
			axios.reset()
		},
		fetchData = () => {
			const el = $('#home'), loader = $('.main-loader')
			fadeInElement(loader, '0', '1', '150')

			axios.get('spotlight')
				.then(response => {
					fadeInElement(el, '0', '1', '150')
					fadeOutElement(loader, '1', '0', '150', '1000')
				})
		}

	useRouter({ route, onBefore, onLeave })

	console.log('home')

	return (
		<div className="section-wrapper" id="home" style={{ 'opacity': '0', 'display': 'none' }}>
			<div className="welcome-message">Home</div>
		</div>
	)
}