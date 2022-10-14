import React, { useEffect, useState } from 'react'
import './App.css'
import img from './assets/arduino-icon-2.png'
import io from 'socket.io-client'

const socket = io('http://localhost:8000');

function App() {
  const [speed, setSpeed] = useState(0);
  return (
    <div className='outerc'>
      {/* <h1>Remote controlled</h1> */}
      <h1> Arduino rover</h1>
      <div className='card'>
        <div>
          {/* <h1> Arduino Rover controller</h1> */}
          <div className="container">
            {/* <h1 style={{ position: 'relative', top: '-50px' }}> Arduino Rover controller</h1> */}
            <img src={img} alt='arduino-logo' style={{ position: 'relative', top: '-22px', left: '92px' }} />
            <i className="fa fa-angle-up" id="forward" onClick={() => {
              if (speed > 0) {
                socket.emit('forward', speed)
              }
            }}></i>
            <i className="fa fa-angle-left" id="left"></i>
            <i className="fa fa-angle-down" id="reverse" onClick={() => {
              if (speed > 0) {
                socket.emit('reverse', speed)
              }
            }}></i>
            <i className="fa fa-angle-right" id="right"></i>
            <i className="fa stop" id="stop" onClick={() => {
              socket.emit('stop');
            }}>Stop</i>
          </div>
        </div>
      </div>
      <label htmlFor='speed'>Speed:</label>
      <input type='range' style={{ cursor: 'pointer' }} step='100' min='0' max='400' value={speed} onChange={(e) => {
        setSpeed(e.target.value)
        console.log(e.target.value)
      }} />
    </div>
  );
}

export default App;
