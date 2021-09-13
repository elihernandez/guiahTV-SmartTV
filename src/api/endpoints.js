// import config from '../../config'
// import { getUtcOffsetLocal } from '../js/Time'

export function getURL(section, { memclid = '' }, params) {
	const endpoints = {
		'spotlight': 'https://lap55.com/json/api/sl/leon/home_spotlight',
		// 'buttons-menu': `${config.API_URL}/cs/leon_home_bm`,
		// 'livetv': `${config.API_URL}/cmdata/leon/livetvplus/${memclid}/${getUtcOffsetLocal()}`,
		// 'catalogue-vod': `${config.API_URL}/cmdata/leon/entplus/${memclid}`,
		// 'catalogue-zonakids': `${config.API_URL}/cdata/leon/kids/${memclid}`,
		// 'radio': `${config.API_URL}/cdata/leon/radio/${memclid}`,
		// 'music-home': `https://api.guiah.tv/music/home/${memclid}/1`,
		// 'music-artist': `https://api.guiah.tv/get/artist/${params.artistID}`,
		// 'music-album': `https://api.guiah.tv/get/album/${params.albumID}`,
		// 'music-playlist': `https://api.guiah.tv/get/playlist/${params.playlistID}`,
		// 'track-link': `https://api.guiah.tv/get/trackLink/${params.trackId}/${memclid}`
	}

	return endpoints[section]
}
