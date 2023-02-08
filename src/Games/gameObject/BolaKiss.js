import Bola from "./Bola";

class BolaKiss extends Bola {
    constructor(canvas, bola) {
        super(canvas, bola.width, bola.height, bola.speed)
        
        this.moveY *= -1;
        this.x = bola.x;
        this.y = bola.y;
        console.log("kiss");
    }

}
export default BolaKiss;