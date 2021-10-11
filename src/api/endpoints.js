// import config from '../../config'
import { getUtcOffsetLocal } from '../utils/time'

const API_URL = 'https://lap55.com/json/api'

export function getURL(section, { memclid = '' }, params) {
	memclid = 'FJNAxIVsyIalE5_ScCtR6hcJ6h6tXcQwHhlB48WKwnI' 

	const endpoints = {
		'spotlight': `${API_URL}/sl/leon/home_spotlight`,
		'live-tv': `${API_URL}/cmdata/leon/livetvplus/${memclid}/${getUtcOffsetLocal()}`,
		'catalogue-vod': `${API_URL}/cmdata/leon/entplus/${memclid}`,
		'link-vod': `${API_URL}/cmd/getLinkLeon/${params.linkID}/${memclid}`
		// 'buttons-menu': `${config.API_URL}/cs/leon_home_bm`,
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
