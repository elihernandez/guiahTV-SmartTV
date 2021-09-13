import transition from '../js/dist/transition'
import { isVisible, isHidden } from './visible'

function fadeInElement(el, opFrom, opTo, opS) {
	if(!isVisible(el)){
		transition.begin(el, ['opacity', opFrom, opTo, opS], {
			onBeforeChangeStyle: function(element) {
				element.style.display = ''
			}
		})
	}
}

function fadeOutElement(el, opFrom, opTo, opS) {
	if(!isHidden(el)){
		transition.begin(el, ['opacity', opFrom, opTo, opS], {
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