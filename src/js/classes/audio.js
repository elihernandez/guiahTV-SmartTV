class Audio {
    constructor(element){
        this.element = element
        this.play = false
        this.pause = false
        this.random = false
        this.muted = false
    }

    setPlay(){
        this.element.play()
        this.play = true
        this.pause = false
    }

    setPause(){
        this.element.pause()
        this.play = false
        this.pause = true
    }

    setRandom(){
        if(this.random){
            this.random = false
        }else{
            this.random = true 
        }
    }
}