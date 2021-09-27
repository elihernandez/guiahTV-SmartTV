import transition from '../js/dist/transition'
import { isVisible, isHidden } from './visible'

function fadeInElement(el, opFrom, opTo, opSeconds, delaySeconds = 0) {
	setTimeout(() => {
		if(isHidden(el)){
			transition.begin(el, ['opacity', opFrom, opTo, `${opSeconds}ms`], {
				onBeforeChangeStyle: function(element) {
					element.style.display = ''
				}
			})
		}
	}, delaySeconds)
}

function fadeOutElement(el, opFrom, opTo, opSeconds, delaySeconds = 0) {
	setTimeout(() => {
		if(isVisible(el)){
			transition.begin(el, ['opacity', opFrom, opTo, `${opSeconds}ms`], {
				onTransitionEnd: function(element, finished) {
					if (!finished) return
					element.style.display = 'none'
				}
			})
		}
	}, delaySeconds)
}

export {
	fadeInElement,
	fadeOutElement
}