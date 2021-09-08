class Album {
    constructor (album) {
        this.trackInPlay = null
        this.album = album
        this.listTracks = null
        this.listRandom = []
        this.trackToPlaylist = null
        this.trackDelete = null
    }

    infoTrackListener(val) {}
    listTracksListener(val) {}
    deleteTrackListener(val) {}

    setTrackInPlay(val) {
      this.trackInPlay = val
      this.listTracksListener(val)
      this.infoTrackListener(val)
    }

    setDeleteTrack(val){
        const tracks = this.listTracks.tracks
        const index = tracks.findIndex(element => element.regID === val)
        const newList = tracks.filter( function( e ) {
            return e.regID !== val
        })

        this.listTracks.tracks = newList
        this.listTracks.totalItems = this.listTracks.totalItems - 1

        this.deleteTrackListener(this.listTracks)
    }

    get prevTrack(){
        const isTrack = (element) => element.regID === this.trackInPlay.regID
        const index = this.listTracks.tracks.findIndex(isTrack)

        if(index === 0){
            return
        }

        const length = this.listTracks.tracks.length - 1
        const prevTrack = this.listTracks.tracks[index - 1]
        
        return prevTrack
    }

    get nextTrack(){
        const isTrack = (element) => element.regID === this.trackInPlay.regID
        const index = this.listTracks.tracks.findIndex(isTrack)  
        const length = this.listTracks.tracks.length - 1

        if(index === length){
            return
        }

        const nextTrack = this.listTracks.tracks[index + 1]

        return nextTrack
    }

    get randomTrack(){
        const lengthTracks = this.listTracks.tracks.length
        const lengthRandom = this.listRandom.length
        if(lengthRandom !== lengthTracks){
            let find
            let random
            let found = true
            
            while(found){
                random = Math.floor(Math.random() * lengthTracks)
                find = this.listRandom.find(element => element === random)
                
                if(find === undefined){
                    found = false
                }
                console.log(random)
                console.log(find)
            }
            
            this.listRandom.push(random)
            const tracks = this.listTracks.tracks
            return tracks[random]
        }

        return
    }

    changeInfoTrack(listener) {
      this.infoTrackListener = listener
    }

    changeListTracks(listener) {
        this.listTracksListener = listener
    }

    changeDeleteTrack(listener) {
        this.deleteTrackListener = listener
    }
}