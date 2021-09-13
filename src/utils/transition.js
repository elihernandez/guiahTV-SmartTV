import transition from '../js/dist/transition'

/* eslint-disable no-undef */
function fadeInElement(el, opFrom, opTo, opS) {
	transition.begin(el, ['opacity', opFrom, opTo, opS], {
		onBeforeChangeStyle: function(element) {
			element.style.display = ''
		}
	})
}

function fadeOutElement(el, opFrom, opTo, opS) {
	transition.begin(el, ['opacity', opFrom, opTo, opS], {
		onTransitionEnd: function(element, finished) {
			if (!finished) return
			element.style.display = 'none'
		}
	})
}

export {
	fadeInElement,
	fadeOutElement
}