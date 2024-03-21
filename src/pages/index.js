import * as React from "react"
import { useEffect } from "react"
import "../styles/main.css"

// Constants.
let CANVAS_WIDTH = 1700;
let CANVAS_HEIGHT = 900;

// Dynamic globals.
let movement_speed = 40;
let drawCone = false;
let shifted = false;

let players = [];
let enemies = [];
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
  let enemy;
  let player

  for (enemy of enemies) {
    enemy.render();
  }

  for (player of players) {
    player.render();
  }
}

function drawShifted(ctx) {
  let output = null;

  if (shifted) {
    output = "Enemies"
  } else {
    output = "Players"
  }
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText(output, CANVAS_WIDTH - 200, CANVAS_HEIGHT - 100);
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

class Creature {
  constructor(ctx, colour, dx, dy) {
    this.x = 60 + dx;
    this.y = 60 + dy;
    this.selected = false;
    this.colour = colour;
    this.ctx = ctx;

    if (shifted) {
      this.colour = "black"
    }
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
    document.addEventListener("keydown", listen);
    document.addEventListener("mousedown", listenForClick);
    document.addEventListener("mousemove", listenForMouseMove);
    let allyColours = ["LightSeaGreen", "deepskyblue", "darkslategrey", "darkviolet", "white"];
    let allyColour;
    let dx = 720;
    let dy = 600;
    clearCanvas(ctx);

    for (allyColour of allyColours) {
        let creature = new Creature(ctx, allyColour, dx, dy);       
        players.push(creature);
        dx = dx + 40;
    }

    drawCreatures();

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

    function moveCreature(dx, dy) {
      clearCanvas(ctx);

      if (shifted) {
        enemies[selected_creature].move(dx, dy);
      } else {
        players[selected_creature].move(dx, dy);
      }

      drawCreatures();
    }

    function listen(e) {
      console.log(e.code);
      if (e.code === "KeyS") {
        moveCreature(0, movement_speed);
      } else if (e.code === "KeyD") {
        moveCreature(movement_speed, 0);
      } else if (e.code === "KeyW") {
        moveCreature(0, -movement_speed);
      } else if (e.code === "KeyA") {
        moveCreature(-movement_speed, 0);
      } else if (e.code === "KeyQ") {
        moveCreature(-movement_speed, -movement_speed);
      } else if (e.code === "KeyE") {
        moveCreature(movement_speed, -movement_speed);
      } else if (e.code === "KeyZ") {
        moveCreature(-movement_speed, movement_speed);
      } else if (e.code === "KeyC") {
        moveCreature(movement_speed, movement_speed);
      } else if (e.code === "Space") {
        clearCanvas(ctx);
        let creature = new Creature(ctx);

        if (shifted) {
          enemies.push(creature);
        } else {
          players.push(creature);
        }

        drawCreatures();
      } else if (e.code.match(/Digit./) !== null) {
        let creature_index = parseInt(e.code.split("Digit")[1]);

        if ((shifted && creature_index < enemies.length) || (!shifted && creature_index < players.length)) {
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
      } else if (e.code === "ShiftLeft") {
        shifted = !shifted;
        selected_creature = 0;

        clearCanvas(ctx)
        drawCreatures();
        drawShifted(ctx);
      }
    }
  });

  return(
      <canvas id="myCanvas" width="1700" height="900"></canvas>
  )
}

export default IndexPage

export const Head = () => <title>x0</title>
