function transformSecondsToStringHour(duration) {
	let hours = Math.floor(duration / 3600)
	let minutes = Math.floor((duration % 3600) / 60)
	let seconds = Math.floor(duration % 60)

	// Anteponiendo un 0 a los minutos si son menos de 10 
	minutes = minutes < 10 ? '0' + minutes : minutes
	// Anteponiendo un 0 a los segundos si son menos de 10 
	seconds = seconds < 10 ? '0' + seconds : seconds

	if (hours < 1) {
		return minutes + ':' + seconds  // 41:30
	}
		
	return hours + ':' + minutes + ':' + seconds  // 2:41:30
}