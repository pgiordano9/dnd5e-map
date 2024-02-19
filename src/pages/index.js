import * as React from "react"
import { useEffect } from "react"

const IndexPage = () => {
  useEffect(() => { 
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
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
    }var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(60, 60, 20, 0, 2 * Math.PI);
ctx.stroke();
ctx.fillStyle = "red";
ctx.fill();

document.addEventListener("keydown", logKey);

  });

function logKey(e) {
  console.log(` ${e.code}`);
}

  return (
      <canvas id="myCanvas" width="10000" height="10000"></canvas>
  )
}

export default IndexPage

export const Head = () => <title>x0</title>
