import { useEffect } from 'react'
import { router } from '../../router'
import { $ } from '../../utils/dom'
import { fadeInElement, fadeOutElement } from '../../utils/transition'

export default function HomePage(){

	useEffect(() => {
		const el = $('#home')
	
		router.on('/home', () => {}, {
			after() {
				fadeInElement(el, '0', '1', '.1s')
			},
			leave(done){
				fadeOutElement(el, '1', '0', '.1s')
				done()
			}
		})
	}, [])

	return (
		<div className="section-wrapper" id="home" style={{ 'opacity': '0', 'display': 'none'}}>
			<div className="welcome-message">Home</div>
		</div>
	)
}