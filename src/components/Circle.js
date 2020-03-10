import React, { Component } from "react";
import "./App.css";

class Circle extends Components {
  constructor(props) {
    super(props);
    this.state = {
      x: "",
      y: "",
      dx: "",
      dy: "",
      radius: "",
      color: ""
    };
  }
}

Animation.canvasRef = React.createRef();
const canvas = Animation.canvasRef.current;

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined
};
var maxRadius = 20;
//var minRadius = 2;
var colorArray = ["#FFB7B3", "#FFCCBD", "#C0BAF7", "#B0CAFF", "#97B2F0"];

var colorSad = ["#384B66", "#C7D5EA", "#265698", "#7EA9E6", "#6284B3"];

var colorHappy = ["#FF8200", "#FF9300", "#FFC018", "#F28627", "#F26B1D"];

// window.addEventListener('mousemove',
//   function(event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
// })

// window.addEventListener('resize', function() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   init();
// })

export class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fill();
      c.fillStyle = this.color;
    };

    this.update = function() {
      if (
        this.x + this.radius > window.innerWidth ||
        this.x - this.radius < 0
      ) {
        this.dx = -this.dx;
      }

      if (
        this.y + this.radius > window.innerHeight ||
        this.y - this.radius < 0
      ) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      //  interactivity
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < maxRadius) {
          this.radius += 1;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    };
  }
}

var circleArray = [];

function init() {
  circleArray = [];
  for (var i = 0; i < 800; i++) {
    var radius = Math.random() * 7 + 1;
    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
