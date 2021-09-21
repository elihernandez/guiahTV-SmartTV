export function isPressEnter(e){
	if(e.keyCode === 13 || e === 13 || e === '13' || e.type === 'click'){
		return true
	}

	return false
}

export function isPressLeft(e){
	if(e.keyCode == 37 || e.detail.direction == 'left'){
		return true
	}

	return false
}

export function isPressRight(e){
	if(e.keyCode == 39 || e.detail.direction == 'right'){
		return true
	}

	return false
}

export function isPressUp(e){
	if(e.keyCode == 38 || e.detail.direction == 'up'){
		return true
	}

	return false
}

export function isPressDown(e){
	if(e.keyCode == 40 || e.detail.direction == 'down'){
		return true
	}

	return false
}