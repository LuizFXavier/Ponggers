import Collision from "../math/Collision"

class Bola {
    constructor(canvas, width, height, speed) {

        this.width = width
        this.height = height
        this.speed = speed

        this.resetar(canvas)

    }
    movimento(time) {
        let acelarador = time.xlr8 ? 1.5:1
        this.x += this.speed * this.moveX * acelarador
        this.y += this.speed * this.moveY * acelarador
    }

    desenhar(ctx) {
        ctx.fillStyle = "#FFFFFF"

        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    colidirParede(parede) {
        if (Collision.rectangleCollision(this, parede)) {
            if (parede.y < this.y + this.speed) {

                this.y = parede.y + parede.height
            }
            else {

                this.y = parede.y - this.height
            }
            this.moveY *= -(Math.random() + 0.2)

        }
    }
    colidirPlayer(player) {
        if (Collision.rectangleCollision(this, player)) {
            this.moveX *= -1

            this.moveY = this.moveY > 0 ? (0.1 + Math.random()) : -(0.1 + Math.random())
           
        }
    }
    marcarGol(canvas, placar) {
        if (this.x < -this.width) {
            placar.player2++
            this.resetar(canvas)
        }
        else if (this.x > canvas.width) {
            placar.player1++
            this.resetar(canvas)
        }
    }
    resetar(canvas) {
        this.x = canvas.width / 2
        this.y = canvas.height / 2
        this.directions = [1, -1]
        this.moveX = this.directions[Math.floor(Math.random() * 2)]
        this.moveY = this.directions[Math.floor(Math.random() * 2)] * (Math.random() + 0.2)
    }
}
export default Bola