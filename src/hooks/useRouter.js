import { router } from '../router'

export default function useRouter({ route, onBefore, onLeave }){
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
}