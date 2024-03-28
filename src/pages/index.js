import * as React from 'react';
import {useEffect} from 'react';
import '../styles/main.css';

// Constants.
const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 1000;

// Dynamic globals.
let movementSpeed = 40;
let drawCone = false;
let shifted = false;
let clicked = false;
let enemiesCount = 1;

const players = [];
const enemies = [];
let selectedCreature = 0;

let clickX = null;
let clickY = null;
let currentX = null;
let currentY = null;

function drawGrid(ctx) {
  let x;
  let y;

  for (x = 0; x <= 2000; x = x + 40) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1000);
    ctx.stroke();
  }

  for (y = 0; y <= 1000; y = y + 40) {
    ctx.moveTo(0, y);
    ctx.lineTo(2000, y);
    ctx.stroke();
  }
}

function drawCreatures() {
  let enemy;
  let player;

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
    output = 'Enemies';
  } else {
    output = 'Players';
  }
  ctx.fillStyle = 'black';
  ctx.font = '30px Merriweather';
  ctx.fillText(output, CANVAS_WIDTH - 200, CANVAS_HEIGHT - 100);
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

class Creature {
  constructor(ctx, colour, dx, dy, text = '') {
    this.x = 60 + dx;
    this.y = 60 + dy;
    this.selected = false;
    this.colour = colour;
    this.ctx = ctx;
    this.text = text;

    if (shifted) {
      this.colour = 'black';
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
    this.ctx.fillStyle = 'white';
    this.ctx.font = '16px Merriweather';
    this.ctx.fillText(this.text, this.x - 10, this.y + 10);
    drawGrid(this.ctx);
  }
}

const IndexPage = () => {
  useEffect(() => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    drawGrid(ctx);
    document.addEventListener('keydown', listen);
    document.addEventListener('mousedown', listenForClick);
    document.addEventListener('mousemove', listenForMouseMove);
    const allyColours = ['Yellow', 'deepskyblue', 'Crimson', 'darkviolet', 'white'];
    let allyColour;
    let dx = 720;
    const dy = 600;
    clearCanvas(ctx);

    for (allyColour of allyColours) {
      const creature = new Creature(ctx, allyColour, dx, dy);
      players.push(creature);
      dx = dx + 40;
    }

    drawCreatures();

    function listenForMouseMove(e) {
      if (clicked) {
        if (drawCone) {
          currentX = e.clientX;
          currentY = e.clientY;
          const dx = currentX - clickX;
          const dy = currentY - clickY;
          const alpha = Math.atan(dy / dx)
          const pixelLength = Math.abs(Math.sqrt(dx * dx + dy * dy));
          const halfLength = pixelLength / 2;
          const increaseX = halfLength * Math.sin(alpha);
          const increaseY = halfLength * Math.cos(alpha);
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
          const feetLength = pixelLength / 8;
          ctx.fillStyle = 'black';
          ctx.font = '30px Merriweather';
          ctx.fillText(feetLength.toFixed(2) + 'ft', clickX + 10, clickY + 10);
        } else {
          currentX = e.clientX;
          currentY = e.clientY;
          clearCanvas(ctx);
          drawCreatures();
          ctx.moveTo(clickX, clickY);
          ctx.lineTo(currentX, currentY);
          ctx.stroke();
          const dx = currentX - clickX;
          const dy = currentY - clickY;
          const pixelLength = Math.abs(Math.sqrt(dx * dx + dy * dy));
          const feetLength = pixelLength / 8;
          ctx.fillStyle = 'black';
          ctx.font = '30px Merriweather';
          ctx.fillText(feetLength.toFixed(2) + 'ft', clickX + 10, clickY + 10);
        }
      }
    }

    function listenForClick(e) {
      clicked = !clicked;
      clearCanvas(ctx);
      drawCreatures();
      clickX = e.clientX;
      clickY = e.clientY;
    }

    function moveCreature(dx, dy) {
      clearCanvas(ctx);

      if (shifted) {
        enemies[selectedCreature].move(dx, dy);
      } else {
        players[selectedCreature].move(dx, dy);
      }

      drawCreatures();
    }

    function listen(e) {
      console.log(e.code);
      if (e.code === 'KeyS') {
        moveCreature(0, movementSpeed);
      } else if (e.code === 'KeyD') {
        moveCreature(movementSpeed, 0);
      } else if (e.code === 'KeyW') {
        moveCreature(0, -movementSpeed);
      } else if (e.code === 'KeyA') {
        moveCreature(-movementSpeed, 0);
      } else if (e.code === 'KeyQ') {
        moveCreature(-movementSpeed, -movementSpeed);
      } else if (e.code === 'KeyE') {
        moveCreature(movementSpeed, -movementSpeed);
      } else if (e.code === 'KeyZ') {
        moveCreature(-movementSpeed, movementSpeed);
      } else if (e.code === 'KeyC') {
        moveCreature(movementSpeed, movementSpeed);
      } else if (e.code === 'Space') {
        clearCanvas(ctx);
        const enemy = new Creature(ctx, 'black', 720 + (enemiesCount * 40 - 40), 0, enemiesCount);
        enemiesCount = enemiesCount + 1;
        enemies.push(enemy);
        drawCreatures();
      } else if (e.code.match(/Digit./) !== null) {
        const creatureIndex = parseInt(e.code.split('Digit')[1]);

        if ((shifted && creatureIndex < enemies.length) || (!shifted && creatureIndex < players.length)) {
          selectedCreature = creatureIndex;
        }
      } else if (e.code === 'Enter') {
        if (movementSpeed === 40) {
          movementSpeed = 20;
        } else {
          movementSpeed = 40;
        }
      } else if (e.code === 'Comma') {
        drawCone = !drawCone;
      } else if (e.code === 'ShiftLeft') {
        shifted = !shifted;
        selectedCreature = 0;

        clearCanvas(ctx);
        drawCreatures();
        drawShifted(ctx);
      }
    }
  });

  return (
    <canvas id='myCanvas' width='2000' height='1000'></canvas>
  );
};

export default IndexPage;

export const Head = () => <title>x0</title>;
