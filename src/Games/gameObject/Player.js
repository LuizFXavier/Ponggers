import Collision from "../math/Collision";
import Audeo from "../assets/Audeo"
class Player {
    constructor(x, y, width, height, speed, stand) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.elMundo = false;
        this.stand = stand;

        this.audios = new Map()

        this.audios.set("stop", new Audeo("./audio/ZWStop.mp3",0.2))
        this.audios.set("resume", new Audeo("./audio/ZWResume.mp3",0.2))
        
       this.cooldown = false
    }
    desenhar(ctx) {
        ctx.fillStyle = "#DEFF75"

        ctx.fillRect(this.x, this.y, this.width, this.height)

    }
    move(teclas, time) {
        if (teclas.get("f") && this.stand == "elMundo" && !this.cooldown) {
            this.cooldown = true;
            this.audios.get("stop").play()
            setTimeout(() => {
                
                time.stopTime = true;
            }, 1000);
            setTimeout(() => {
                time.stopTime = false
                this.audios.get("resume").play()
                this.cooldown = false
            }, 3000);
        }

        if(teclas.get("p") && this.stand == "made In Heaven"){
            time.xlr8 = true;

        }
        

        if (time.stopTime && !(this.stand == "elMundo")) return

        if (teclas.get("s") || teclas.get("ArrowDown")) {
            // console.log(teclas);
            this.y += this.speed
        }
        if (teclas.get("w") || teclas.get("ArrowUp")) {
            this.y -= this.speed
        }

    }
    colidirParede(parede) {
        if (Collision.rectangleCollision(this, parede)) {

            if (parede.y < this.y + this.speed) {

                this.y = parede.y + parede.height + 1

            }
            else {

                this.y = parede.y - this.height
            }
        }
    }

}
export default Player