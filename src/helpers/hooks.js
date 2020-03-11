var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  helpers.init();
});

var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

var circleArray = [];

var colorArray = [
  ["#FF8200", "#FF9300", "#FFC018", "#F28627", "#F26B1D"],
  ["#FFB7B3", "#FFCCBD", "#C0BAF7", "#B0CAFF", "#97B2F0"],
  ["#384B66", "#C7D5EA", "#265698", "#7EA9E6", "#6284B3"],
  ["#15244E", "#592D86", "#982C8F", "#FF2E9C", "#FF9D28"],
  ["#D91604", "#A60303", "#730202", "#400101", "#0D0D0D"]
];

function getColor(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// var array =
//   colorArray[
//     Math.floor(Math.random() * colorArray.length  + colorArray.length];
// console.log("array", array);

const helpers = {
  init: function(key, danceability, energy, tempo, duration_ms) {
    var array = getColor(0, colorArray.length);
    var duration = duration_ms;
    console.dir("duration", duration);
    if (duration !== undefined) {
      var hexString = duration.toString(16);
      console.log("hexstring", hexString);

      if (hexString.length == 6) {
        let new_hex = "#" + hexString;
        colorArray.push(new_hex);
      } else if (hexString.length == 5) {
        let new_hex = "#" + hexString + "F";
        colorArray.pop();
        colorArray.push(new_hex);
      }
    }
    circleArray = [];
    for (var i = 0; i < energy; i++) {
      var radius = Math.random() * tempo + 1;
      var x = Math.random() * (window.innerWidth - radius * 2) + radius;
      var y = Math.random() * (window.innerHeight - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * danceability;
      var dy = (Math.random() - 0.5) * danceability;

      circleArray.push(new this.MovingCircle(x, y, dx, dy, radius, array));
    }
  },

  returnCircleArray: function() {
    return circleArray;
  },

  MovingCircle: function(x, y, dx, dy, radius, array) {
    console.log("ARRAY!!!", array);
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = 200;
    this.count = colorArray.length;
    this.random = Math.floor(Math.random() * this.count);
    this.color =
      colorArray[Math.floor(Math.random() * array)][
        Math.floor(Math.random() * colorArray.length)
      ];

    console.log("color", this.color);
    console.log("rand", colorArray);
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

      // interactivity;
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < this.maxRadius) {
          this.radius += 1;
        }
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }
      this.draw();
    };
    this.draw();
  },

  animate: function() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
    requestAnimationFrame(() => this.animate());
  }
};

export default helpers;
