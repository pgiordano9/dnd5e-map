import * as React from "react"
import { useEffect } from "react"
import "../styles/main.css"

const IndexPage = () => {
  useEffect(() => { 
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    function drawGrid() {
      var x;
      var y;

      for (x = 0; x <= 1700; x = x + 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 900);
        ctx.stroke();
      }

      for (y = 0; y <= 900; y = y + 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(1700, y);
        ctx.stroke();
      }
    }

    drawGrid();

    let redX = 60;
    let redY = 60;

    function drawCircle() {
      ctx.beginPath();
      ctx.arc(redX, redY, 20, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "blue";
      ctx.fill();
    }

    drawCircle();
    
    document.addEventListener("keydown", listen);

//    let x = canvas.width / 2;
//    let y = canvas.height - 30;
//    let dx = 2;
//    let dy = -2;
//    
//    function draw() {
//      ctx.clearRect(0, 0, canvas.width, canvas.height);
//      drawGrid();
//      ctx.beginPath();
//      ctx.arc(x, y, 10, 0, Math.PI * 2);
//      ctx.fillStyle = "#0095DD";
//      ctx.fill();
//      ctx.closePath();
//      x += dx;
//      y += dy;
//    }

    //setInterval(draw, 1);
    function listen(e) {
      console.log(e.code);
      if (e.code === "KeyS") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redY += 40;
        drawCircle();
        drawGrid();
      } else if (e.code === "KeyD") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redX += 40;
        drawCircle();
        drawGrid();
      } else if (e.code === "KeyW") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redY -= 40;
        drawCircle();
        drawGrid();
      } else if (e.code === "KeyA") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redX -= 40;
        drawCircle();
        drawGrid();
      } else if (e.code === "KeyQ") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redX -= 40;
        redY -= 40;
        drawCircle();
        drawGrid();
      } else if (e.code === "KeyE") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redX += 40;
        redY -= 40;
        drawCircle();
        drawGrid();
      } else if (e.code === "KeyZ") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redX -= 40;
        redY += 40;
        drawCircle();
        drawGrid();
      } else if (e.code === "KeyC") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        redX += 40;
        redY += 40;
        drawCircle();
        drawGrid();
      }
    }

    });



  return (
      <canvas id="myCanvas" width="1700" height="900"></canvas>
  )
}

export default IndexPage

export const Head = () => <title>x0</title>
