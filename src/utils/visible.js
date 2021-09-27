export function isVisible(el){
	if(el.style.opacity == 1 || el.style.display == ''){
		return true
	}

	return false
}

export function isHidden(el){
	if(el.style.opacity == 0 || el.style.display == 'none'){
		return true
	}

	return false
}