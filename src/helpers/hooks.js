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
  ["#D91604", "#A60303", "#730202", "#400101", "#0D0D0D"],
  ["#E89BF2", "#F28705", "#D99177", "#A61103", "#730202"],
  ["#000000", "#000000", "#000000", "#000000", "#000000"],
  ["#D9D9D9", "#737373", "#404040", "#262626", "#0D0D0D"],
  ["#4A5559", "#4B732F", "#87BF34", "#B5F230", "#CCF244"],
  ["#C0D904", "#E8F299", "#EDF2C2", "#F27405", "#BF6E50"],
  ["#F2EB80", "#F2CF8D", "#591711", "#8C0303", "#260606"],
  ["#131A40", "#355B8C", "#081826", "#17AEBF", "#30F2F2"],
  ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]
];

function getColor(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const helpers = {
  init: function(key, danceability, energy, tempo, duration_ms, valence) {
    var array = getColor(0, colorArray.length);
    var duration = duration_ms;
    if (duration !== undefined) {
      var hexString = duration.toString(16);
      console.log("hexstring", hexString);

      if (hexString.length == 6) {
        let new_hex = "#" + hexString;
        colorArray[key].push(new_hex);
      } else if (hexString.length == 5) {
        let new_hex = "#" + hexString + "F";
        colorArray[key].pop();
        colorArray[key].push(new_hex);
      }
    }
    circleArray = [];
    for (var i = 0; i < danceability; i++) {
      var radius = Math.random() * (100 / valence) + 1;
      var x = Math.random() * (window.innerWidth - radius * 2) + radius;
      var y = Math.random() * (window.innerHeight - radius * 2) + radius;
      var dx = ((Math.random() - 0.5) * energy) / 3;
      var dy = ((Math.random() - 0.5) * energy) / 3;

      circleArray.push(new this.MovingCircle(x, y, dx, dy, radius, key));
    }
  },

  returnCircleArray: function() {
    return circleArray;
  },

  MovingCircle: function(x, y, dx, dy, radius, key) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = 200;
    this.colorChoice = colorArray[key];
    this.color = this.colorChoice[
      Math.floor(Math.random() * this.colorChoice.length)
    ];

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
