import { React, useEffect, useRef } from "react";
import "../css/Canvas.css";
import Player from "../Games/gameObject/Player";
import Parede from "../Games/gameObject/Parede";
import Bola from "../Games/gameObject/Bola";

const Canvas = ({ voltarMenu }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 300;

    const time = {
      stopTime: false,
      xlr8: false,
    };

    const player1 = new Player(10, 20, 20, 50, 5, "made In Heaven");
    const player2 = new Player(canvas.width - 30, 20, 20, 50, 5, "kiss");

    const paredeCima = new Parede(0, 0, canvas.width, 5);
    const paredeBaixo = new Parede(0, canvas.height - 5, canvas.width, 5);
    const bolas = [new Bola(canvas, 15, 15, 4)];

    const placar = {
      player1: 0,
      player2: 0,
      render: () => {
        ctx.fillStyle = "#FFEB8C";
        ctx.font = "30px comic sans ms";
        ctx.fillText(
          `${placar.player1} | ${placar.player2}`,
          canvas.width * 0.45,
          40
        );
      },
    };

    const keys = new Map();

    keys.set("a", false);
    keys.set("d", false);
    keys.set("w", false);
    keys.set("s", false);

    const arrows = new Map();

    arrows.set("ArrowLeft", false);
    arrows.set("ArrowRight", false);
    arrows.set("ArrowUp", false);
    arrows.set("ArrowDown", false);
    arrows.set("p", false);

    function update() {
      player1.move(keys, time);
      player2.move(arrows, time);

      player1.stands(keys, time, bolas, player2, paredeBaixo, canvas);
      player2.stands(arrows, time, bolas, player1, paredeBaixo, canvas);

      player1.colidirParede(paredeCima);
      player1.colidirParede(paredeBaixo);

      player2.colidirParede(paredeCima);
      player2.colidirParede(paredeBaixo);

      bolas.forEach((bola) => {
        bola.colidirParede(paredeBaixo);
        bola.colidirParede(paredeCima);
        bola.colidirPlayer(player1);
        bola.colidirPlayer(player2);
        if (!time.stopTime) bola.movimento(time);
        bola.marcarGol(canvas, placar);
        console.log(bola)
      });
      // console.log(bolas)

    }

    function animate() {
      update();
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "#007879";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      player1.desenhar(ctx);
      player2.desenhar(ctx);

      paredeCima.desenhar(ctx);
      paredeBaixo.desenhar(ctx);

      bolas.forEach(bola =>{
        bola.desenhar(ctx);
      })
      
      placar.render();

      window.requestAnimationFrame(animate);
    }

    window.addEventListener("keydown", (e) => {
      if (keys.get(e.key.toLocaleLowerCase()) !== undefined)
        keys.set(e.key.toLocaleLowerCase(), true);

      if (arrows.get(e.key) !== undefined) arrows.set(e.key, true);
    });
    window.addEventListener("keyup", (e) => {
      if (keys.get(e.key.toLocaleLowerCase()) !== undefined)
        keys.set(e.key.toLocaleLowerCase(), false);

      if (arrows.get(e.key) !== undefined) arrows.set(e.key, false);
    });

    animate();
  });

  return (
    <>
      <canvas className="canvas-game" ref={canvasRef}></canvas>
    </>
  );
};

export default Canvas;
