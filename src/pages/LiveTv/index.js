import { useEffect } from 'react'
import { router } from '../../router'
import { $ } from '../../utils/dom'
import { fadeInElement, fadeOutElement } from '../../utils/transition'

export default function LiveTv(){

	useEffect(() => {
		const el = $('#livetv')
	
		router.on('/livetv', () => {}, {
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
		<div className="section-wrapper" id="livetv" style={{ 'opacity': '0', 'display': 'none'}}>
			<div className="welcome-message">Live TV</div>
		</div>
	)
}