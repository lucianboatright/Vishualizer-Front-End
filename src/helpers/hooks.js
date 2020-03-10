
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");



const helpers = {

  Circle: function() {

    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    var red = Math.random() * 255;
    var green = Math.random() * 255;
    var blue = Math.random() * 255;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = `rgba(${red}, ${green}, ${blue}, 0.8)`;
    c.stroke();

  },
 multiply: function(){
   console.log(i)
    for(var i = 0; i < 100; i++) {
    this.Circle();
    }
  }

}








export default helpers;