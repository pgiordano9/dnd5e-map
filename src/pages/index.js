import * as React from "react"
import { useEffect } from "react"
import "../styles/main.css"

let canvas_width = 1700;
let canvas_height = 900;

function drawGrid(ctx) {
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

class Creature {
  constructor(ctx) {
    this.x = 60;
    this.y = 60;
    this.selected = false;
    this.colour = "red";
    this.ctx = ctx;
  }

  move(dx, dy) {
    this.x = this.x + dx;
    this.y = this.y + dy;
  }

  render() {
    this.ctx.clearRect(0, 0, canvas_width, canvas_height);
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fillStyle = this.colour;
    this.ctx.fill();
    drawGrid(this.ctx);
  }
}

const IndexPage = () => {
  useEffect(() => { 
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    drawGrid(ctx);
    const first = new Creature(ctx);
    first.render();
    document.addEventListener("keydown", listen);

    function listen(e) {
      console.log(e.code);
      if (e.code === "KeyS") {
        first.move(0, 40);
        first.render();
      } else if (e.code === "KeyD") {
        first.move(40, 0);
        first.render();
      } else if (e.code === "KeyW") {
        first.move(0, -40);
        first.render();
      } else if (e.code === "KeyA") {
        first.move(-40, 0);
        first.render();
      } else if (e.code === "KeyQ") {
        first.move(-40, -40);
        first.render();
      } else if (e.code === "KeyE") {
        first.move(40, -40);
        first.render();
      } else if (e.code === "KeyZ") {
        first.move(-40, 40);
        first.render();
      } else if (e.code === "KeyC") {
        first.move(40, 40);
        first.render();
      }
    }

//setInterval(draw, 1);
////    let x = canvas.width / 2;
////    let y = canvas.height - 30;
////    let dx = 2;
////    let dy = -2;
////    
////    function draw() {
////      ctx.clearRect(0, 0, canvas.width, canvas.height);
////      drawGrid();
////      ctx.beginPath();
////      ctx.arc(x, y, 10, 0, Math.PI * 2);
////      ctx.fillStyle = "#0095DD";
////      ctx.fill();
////      ctx.closePath();
////      x += dx;
////      y += dy;
////    }

    });



  return (
      <canvas id="myCanvas" width="1700" height="900"></canvas>
  )
}

export default IndexPage

export const Head = () => <title>x0</title>
