function getMusicHome(){
    return axios.get(`https://api.guiah.tv/music/home/${suscriberId}/1`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error
    })
}

function getMyPlaylists(){
    return axios.get(`https://api.guiah.tv/get/myplaylist/${suscriberId}/1`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        return error
    })
}