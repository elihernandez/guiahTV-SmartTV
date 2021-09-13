import { useEffect } from 'react'
import { router } from '../router'
import { $ } from '../utils/dom'
import { fadeInElement, fadeOutElement } from '../utils/transition'

export default function useRouter({ route, el, loader }){
    
	useEffect(() => {
		const domElement = $(el)
		// const domLoader  = $(loader)
	
		router.on(`/${route}`, () => {}, {
			after() {
				fadeInElement(domElement, '0', '1', '150ms')
				// setTimeout(() => {
				// 	fadeOutElement(domLoader, '1', '0', '150ms')
				// }, 3000)
			},
			leave(done){
				// fadeInElement(domLoader, '0', '1', '150ms')
				fadeOutElement(domElement, '1', '0', '150ms')
				done()
			}
		})
	}, [])

}