import * as React from "react"
import { useEffect } from "react"
import "../styles/main.css"

let canvas_width = 1700;
let canvas_height = 900;
let movement_speed = 40;

let drawCone = false;

let creatures = [];
let selected_creature = 0;

let clickX = null;
let clickY = null;
let currentX = null;
let currentY = null;

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

function drawCreatures() {
  let creature;

  for (creature of creatures) {
    creature.render();
  }
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
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
    let creature = new Creature(ctx);
    creatures.push(creature);
    creatures[selected_creature].render();
    document.addEventListener("keydown", listen);
    document.addEventListener("mousedown", listenForClick);
    document.addEventListener("mousemove", listenForMouseMove);

    function listenForMouseMove(e) {
      if (drawCone) {
        currentX = e.clientX;
        currentY = e.clientY;
        let dx = currentX - clickX;
        let dy = currentY - clickY;
//        let lambda = (Math.abs(Math.atan(dy / dx)) * (180 / Math.PI));
        let alpha = Math.atan(dy / dx)
        console.log(alpha);
        let pixel_length = Math.abs(Math.sqrt(dx * dx + dy * dy));
        let half_length = pixel_length / 2;

        let increaseX = half_length * Math.sin(alpha);
        let increaseY = half_length * Math.cos(alpha);
        clearCanvas(ctx);
        drawCreatures();
        ctx.beginPath();
        ctx.moveTo(clickX, clickY);

        if (alpha > 0) {
          ctx.lineTo(currentX - increaseX, currentY + increaseY);
          ctx.lineTo(currentX + increaseX, currentY - increaseY);
          ctx.fill();
        } else {
          ctx.lineTo(currentX + increaseX, currentY - increaseY);
          ctx.lineTo(currentX - increaseX, currentY + increaseY);
          ctx.fill();
        }
        let feet_length = pixel_length / 8;
        //console.log(feet_length);
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText(feet_length.toFixed(2) + "ft", clickX + 10, clickY + 10);
      } else {
        currentX = e.clientX;
        currentY = e.clientY;
        clearCanvas(ctx);
        drawCreatures();
        ctx.moveTo(clickX, clickY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        let dx = currentX - clickX;
        let dy = currentY - clickY;
        let pixel_length = Math.abs(Math.sqrt(dx * dx + dy * dy));
        let feet_length = pixel_length / 8;
        //console.log(feet_length);
        ctx.font = "30px Arial";
        ctx.fillText(feet_length.toFixed(2) + "ft", clickX + 10, clickY + 10);
      }
    }

    function listenForClick(e) {
      clickX = e.clientX;
      clickY = e.clientY;
    }

    function listen(e) {
      console.log(e.code);
      if (e.code === "KeyS") {
        clearCanvas(ctx);
        creatures[selected_creature].move(0, movement_speed);
        drawCreatures();
      } else if (e.code === "KeyD") {
        clearCanvas(ctx);
        creatures[selected_creature].move(movement_speed, 0);
        drawCreatures();
      } else if (e.code === "KeyW") {
        clearCanvas(ctx);
        creatures[selected_creature].move(0, -movement_speed);
        drawCreatures();
      } else if (e.code === "KeyA") {
        clearCanvas(ctx);
        creatures[selected_creature].move(-movement_speed, 0);
        drawCreatures();
      } else if (e.code === "KeyQ") {
        clearCanvas(ctx);
        creatures[selected_creature].move(-movement_speed, -movement_speed);
        drawCreatures();
      } else if (e.code === "KeyE") {
        clearCanvas(ctx);
        creatures[selected_creature].move(movement_speed, -movement_speed);
        drawCreatures();
      } else if (e.code === "KeyZ") {
        clearCanvas(ctx);
        creatures[selected_creature].move(-movement_speed, movement_speed);
        drawCreatures();
      } else if (e.code === "KeyC") {
        clearCanvas(ctx);
        creatures[selected_creature].move(movement_speed, movement_speed);
        drawCreatures();
      } else if (e.code === "Space") {
        clearCanvas(ctx);
        creature = new Creature(ctx);
        creatures.push(creature);
        drawCreatures();
      } else if (e.code.match(/Digit./) !== null) {
        let creature_index = parseInt(e.code.split("Digit")[1]);

        if (creature_index < creatures.length) {
          selected_creature = creature_index;
        }
      } else if (e.code === "Enter") {
        if (movement_speed === 40) {
          movement_speed = 20;
        } else {
          movement_speed = 40;
        }
      } else if (e.code === "Comma") {
        drawCone = !drawCone;
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
