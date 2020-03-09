// import React from 'react';

// class PlayerController extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       song: '',
//       command: '',
//     };
//   }
//   initAudio(url) {
//     this.audioContext = new AudioContext();
//     this.audio = new Audio();
//     this.analyser = this.audioContext.createAnalyser();
//     this.analyser.minDecibels = -85;
//     this.analyser.maxDecibels = -10;
//     this.analyser.smoothingTimeConstant = 0.77;
//     this.analyser.fftSize = 2048;
//     this.audio.src = url;
//     this.audio.crossOrigin = "Anonymous";
//     this.source = this.audioContext.createMediaElementSource(this.audio);
//     this.source.connect(this.analyser);
//     this.analyser.connect(this.audioContext.destination);
//   }

//   static getDerivedStateFromProps(props, state) {
//     if (props.song.length > 0) {
//       return {
//         song: props.song,
//         command: props.command,
//       };
//     }
//     return state;
//   }

//   playSong(url) {
//     this.initAudio(url);
//     const context = this;
//     this.audioContext.resume().then((a) => {
//       context.source.mediaElement.play();
//       context.props.startSpectrum(context.analyser);
//     });
//   }


//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.command === 'play' & prevProps.command !== 'play') {
//       this.playSong(this.state.song);
//     }

//     if (this.state.command === 'stop' && prevProps.command !== 'stop') {
//       this.stopSong(this.state.song);
//     }
//   }

//   nextSong() {

//   }

//   prevSong() {

//   }

//   stopSong(url) {
//     this.source.mediaElement.pause();
//   }

//   render() {
//     return (
//       <div>
//         <canvas className="outline ml4" id="player" width="500" height="100"></canvas>
//       </div>
//     );
//   }
// };

// export default PlayerController;




