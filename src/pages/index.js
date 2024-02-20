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

    ctx.beginPath();
    ctx.arc(60, 60, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();
    
    document.addEventListener("keydown", logKey);

    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2;
    let dy = -2;
    
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
      x += dx;
      y += dy;
    }

    setInterval(draw, 1);

    });

  function logKey(e) {
    console.log(` ${e.code}`);
  }


  return (
      <canvas id="myCanvas" width="1700" height="900"></canvas>
  )
}

export default IndexPage

export const Head = () => <title>x0</title>
