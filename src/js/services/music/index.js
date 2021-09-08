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

function createMusicPlaylist(title, description, isPublic){

    const body = {
        title, description, isPublic
    }

    return axios.post(`https://api.guiah.tv/post/playlist/${suscriberId}/1`, body)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error
    })
}

function postMusicTrackToPlaylist(playlistID, trackID){
    
    const body = {
        "PlayListID": playlistID,
        "TrackID": trackID    
    }

    return axios.post(`https://api.guiah.tv/post/track/${suscriberId}/1`, body)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error
    })
}

function deleteMusicTrackToPlaylist(playlistID, trackID){

    const body = {
        "PlayListID": playlistID,
        "TrackID": trackID    
    }

    return axios.delete(`https://api.guiah.tv/delete/track/${suscriberId}/1`, {
        data: body
    })
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error
    })
}