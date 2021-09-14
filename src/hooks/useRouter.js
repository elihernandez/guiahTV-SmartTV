import { useEffect } from 'react'
import { router } from '../router'

export default function useRouter({ route, onBefore, onLeave }){
	useEffect(() => {
		router.on(`/${route}`, () => {}, {
			before(done) {
				onBefore()
				done()
			},
			leave(done){
				onLeave()
				done()
			}
		})
	}, [])
}