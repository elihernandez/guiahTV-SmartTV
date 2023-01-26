import React from 'react'
import useRouter from '../../hooks/useRouter'
import { $ } from '../../utils/dom'
import { fadeInElement, fadeOutElement } from '../../utils/transition'

export default function RadioPage() {
	const route = 'radio',
		onBefore = () => {
			fetchData()
		},
		onLeave = () => {
			const el = $('#radio')
			fadeOutElement(el, '1', '0', '150')
			axios.reset()
		},
		fetchData = () => {
			const loader = $('.main-loader')
			fadeInElement(loader, '0', '1', '150')
		}

	useRouter({ route, onBefore, onLeave })

	return (
		<div id="radio" style={{ 'opacity': '0', 'display': 'none' }}>
			<div className="welcome-message">Radio</div>
		</div>
	)
}