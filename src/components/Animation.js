import React, { Component } from 'react';
import Canvas from './Canvas.js'
import './App.css';

class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    if (canvas !== undefined) {
      this.setState({
        canvas: canvas
      })
    }
    console.log('canvas', canvas)
    console.log('state canvas', this.state.canvas)
    const c = canvas.getContext('2d');
    gradient.addColorStop(0,"rgba(35, 7, 77, 1)");
    gradient.addColorStop(1,"rgba(204, 83, 51, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);    c.fillRect(0,0, canvas.width, canvas.height);
    // var x = Math.random() * window.innerWidth;
    // var y = Math.random() * window.innerHeight;
    for (var i = 0; i < 800; i++) {
      c.beginPath();
      c.arc(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 30, 0, Math.PI * 2, false);
      var red = Math.random() * 255;
      var green = Math.random() * 255;
      var blue = Math.random() * 255;
      c.strokeStyle = `rgba(${red}, ${green}, ${blue}, 0.8)`;
      c.stroke();
    }
    
  }

  render() {
    return (
      <div className="canvasrender">
        <canvas width={window.innerWidth} height={window.innerHeight} ref={this.canvasRef} />
      </div>
    );
  }
}

export default Animation;