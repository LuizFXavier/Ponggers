class Audeo{
    constructor(src,volume){
        this.audio = new Audio(src)
        this.audio.volume = volume
    }
    play(){
        this.audio.play()
    }
}
export default Audeo