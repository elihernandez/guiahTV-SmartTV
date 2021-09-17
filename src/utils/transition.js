import transition from '../js/dist/transition'
import { isVisible, isHidden } from './visible'

function fadeInElement(el, opFrom, opTo, opSeconds, delaySeconds = 0) {
	if(!isVisible(el)){
		transition.begin(el, ['opacity', opFrom, opTo, opSeconds, delaySeconds], {
			onBeforeChangeStyle: function(element) {
				element.style.display = ''
			}
		})
	}
}

function fadeOutElement(el, opFrom, opTo, opSeconds, delaySeconds = 0) {
	if(!isHidden(el)){
		transition.begin(el, ['opacity', opFrom, opTo, opSeconds, delaySeconds], {
			onTransitionEnd: function(element, finished) {
				if (!finished) return
				element.style.display = 'none'
			}
		})
	}
}

export {
	fadeInElement,
	fadeOutElement
}