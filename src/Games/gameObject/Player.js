import Collision from "../math/Collision";
import Audeo from "../assets/Audeo"
import BolaKiss from "./BolaKiss";
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

        this.audios.set("stop", new Audeo("./audio/ZWStop.mp3", 0.1))
        this.audios.set("resume", new Audeo("./audio/ZWResume.mp3", 0.1))
        this.audios.set("rapidin", new Audeo("./audio/mih.mp3", 0.15))
        this.audios.set("a mão", new Audeo("./audio/zaHando.mp3", 0.1))

        this.cooldown = false
        this.accelerator = 1

        this.freeze = false;
    }
    desenhar(ctx) {
        ctx.fillStyle = "#DEFF75"

        ctx.fillRect(this.x, this.y, this.width, this.height)

    }
    move(teclas, time) {

        if (time.stopTime && !(this.stand == "elMundo")) return

        if (this.freeze) return;

        this.accelerator = time.xlr8 && this.stand == "made In Heaven" ? 2.5 : 1


        if (teclas.get("s") || teclas.get("ArrowDown")) {

            this.y += this.speed * this.accelerator
        }
        if (teclas.get("w") || teclas.get("ArrowUp")) {
            this.y -= this.speed * this.accelerator
        }

    }
    stands(teclas, time, bolas, outroP, paredeBaixo, canvas) {
        if ((teclas.get("d") || teclas.get("ArrowLeft")) && !this.cooldown) {

            switch (this.stand) {
                case "elMundo":
                    this.cooldown = true;
                    this.audios.get("stop").play()
                    setTimeout(() => {

                        time.stopTime = true;
                    }, 500);
                    setTimeout(() => {
                        time.stopTime = false
                        this.audios.get("resume").play()
                        this.cooldown = false
                    }, 3000);
                    break;

                case "made In Heaven":
                    this.cooldown = true;
                    setTimeout(() => {

                        time.xlr8 = true;
                        
                    }, 1500);
                    this.audios.get("rapidin").play()
                    setTimeout(() => {
                        this.cooldown = false;
                        time.xlr8 = false
                    }, 10000);
                    break;

                case "za Hando":
                    this.audios.get("a mão").play()
                    this.cooldown = true
                    setTimeout(() => {
                        this.cooldown = false
                    }, 2000);
                    bolas.forEach(bola => {

                        bola.x = this.x + this.width;
                        bola.y = this.y;
                    });

                    break;
                case "echo act3":
                    outroP.freeze = true;
                    this.cooldown = true
                    outroP.y = paredeBaixo.y - outroP.height;
                    setTimeout(() => {
                        outroP.freeze = false;
                        this.cooldown = false;
                    }, 2000);
                    break;
                case "little feat":
                    this.cooldown = true
                    let temp = outroP.height;
                    outroP.height /= 2
                    setTimeout(() => {
                        outroP.height = temp;
                        this.cooldown = false;
                    }, 5000);
                    break;
                case "kiss":
                    
                    bolas.push(new BolaKiss(canvas, bolas[0]))
                    this.cooldown = true
                    setTimeout(() => {
                        bolas[1].x = bolas[0].x
                        bolas[1].y = bolas[0].y
                        bolas[1].moveX = bolas[0].moveX
                        bolas[1].moveY = bolas[0].moveY
                    }, 7500);
                    setTimeout(() => {
                        bolas.pop();
                        this.cooldown = false;
                    }, 8000);
                default:
                    break;
            }
        }
    }
    colidirParede(parede) {
        if (Collision.rectangleCollision(this, parede)) {

            if (parede.y < this.y + this.speed * this.accelerator) {

                this.y = parede.y + parede.height + 1

            }
            else {

                this.y = parede.y - this.height
            }
        }
    }

}
export default Player