import * as React from "react"
import { useEffect } from "react"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const IndexPage = () => {
  useEffect(() => { 
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var x = 0;
    var y = 0;

    ctx.moveTo(0, 0);
    ctx.lineTo(0, 100);
    ctx.stroke();
  });

  return (
    <main style={pageStyles}>
      <canvas id="myCanvas" width="200" height="100"></canvas>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
