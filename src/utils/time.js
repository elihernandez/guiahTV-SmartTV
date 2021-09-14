const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
const utc = require('dayjs/plugin/utc')

export function getEventTime(inicio, fin) {
	dayjs.extend(customParseFormat)
	const startTime = dayjs(inicio).format('hh:mm A')
	const endTime = dayjs(fin).format('hh:mm A')

	return `${startTime} - ${endTime}`
}

export function isLive(inicio, fin){
	dayjs.extend(isSameOrAfter)
	dayjs.extend(isSameOrBefore)

	if(dayjs().isSameOrAfter(inicio) && dayjs().isSameOrBefore(fin)){
		return true
	}

	return false
}

export function isEvent(type){
	if(type == 'leon_livetv_Event'){
		return true
	}

	return false
}

export function timerEvent(Inicio){
	const h = dayjs(Inicio).diff(dayjs(), 'h')
	const m = (dayjs(Inicio).diff(dayjs(), 'm')) - (h * 60)
	let time

	if(h === 0 && m === 0){
		time = 'Un momento'
	}else{
		if(h > 0){
			if(m > 0){
				if(h === 1){
					if(m === 1){
						time = h+' hora y '+m+' minuto'
					}else{
						time = h+' hora y '+m+' minutos'
					}
				}else{
					if(m === 1){
						time = h+' horas y '+m+' minuto'
					}else{
						time = h+' horas y '+m+' minutos'
					}
				}
                        
			}else{
				if(h === 1){
					time = h+' hora'
				}else{
					time = h+' horas'
				}
			}
		}else{
			if(m === 1){
				time = m+' minuto'
			}else{
				time = m+' minutos'
			}
		}
	}
     
	return time
}

export function getProgressTimeEvent(Inicio, Fin){
	const duration = dayjs(Fin).diff(dayjs(Inicio), 'm')
	const position = dayjs().diff(dayjs(Inicio), 'm')
	const time = ((position * 100) / duration)+'%'

	return time
}

export function getUtcOffsetLocal(){
	dayjs.extend(utc)
	const utcOffsetLocal = 'UTC'+(dayjs().utcOffset()/60)

	return utcOffsetLocal
}

export function getProgressMovie(ResumePos, Length){
	let position = ResumePos / 1000
	let duration = (Length).replace(' min', '')
	duration = parseInt(duration, 10) * 60
	let time = (position * 100) / duration

	return time
}

function updateData(movie, data, positionVideoMil){
	const contentType = movie.ContentType
	const movieId = movie.Registro
	data.map(({cmData}, indexC) => {
		cmData.map(({Registro, ContentType}, indexM) => {
			if(movieId == Registro && contentType == ContentType){
				data[indexC].cmData[indexM].ResumePos = positionVideoMil
			}
		})
	})

	return data
}

export function setProgressMovie(currentTime, movie, data, dispatch){
	let positionVideoMil = Math.round(currentTime * 1000)
	dispatch({type: 'setData', payload: updateData(movie, data, positionVideoMil)})
	movie.ResumePos = positionVideoMil
	dispatch({type: 'setMovie', payload: movie})
}

export function secondsToString(seconds) {
	let time
	let hour = Math.floor(seconds / 3600)
	hour = (hour < 10)? '0' + hour : hour

	let minute = Math.floor((seconds / 60) % 60)
	minute = (minute < 10)? '0' + minute : minute

	let second =  Math.floor(seconds % 60)
	second = (second < 10)? '0' + second : second

	if(hour != '00'){
		time = hour + ':' + minute + ':' + second
	}else{
		if(minute != '00'){
			time = minute + ':' + second
		}else{
			time =  '0:' + second
		}
	}

	return time
}

export function minutesToHoursString(seconds){
	let string
	// let seconds = minutes * 60
	let minutes = Math.floor((seconds / 60) % 60)
	let hours = Math.floor(minutes / 60)

	if(hours > 0){
		if(minutes > 0){
			string = `${hours} h ${minutes} min`
		}else{
			string = `${hours} h`
		}
	}else{
		string = `${minutes} min`
	}

	return string
}

export function getYearDate(date){
	return dayjs(date).year()
}