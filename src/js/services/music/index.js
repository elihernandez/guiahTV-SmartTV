function getMusicHome(profileID = 1){
    return axios.get(`https://api.guiah.tv/music/home/${suscriberId}/${profileID}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error
    })
}

function getMyPlaylists(profileID = 1){
    return axios.get(`https://api.guiah.tv/get/myplaylist/${suscriberId}/${profileID}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error
    })
}

function getMusicAlbum(albumID){
    return axios.get(`https://api.guiah.tv/get/album/${albumID}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error
    })
}

function getMusicPlaylist(playlistID){
    return axios.get(`https://api.guiah.tv/get/playlist/${playlistID}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error
    })
}

function getTrackLink(trackID){
    return axios.get(`https://api.guiah.tv/get/trackLink/${trackID}/${suscriberId}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error
    })
}