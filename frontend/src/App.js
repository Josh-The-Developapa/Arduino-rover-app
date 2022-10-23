import React, { useState } from 'react'
import './App.css'
import img from './assets/arduino-icon-2.png'
import io from 'socket.io-client'

const socket = io('http://localhost:8000');

function App() {
  const [speed, setSpeed] = useState(0);
  const [on, setOn] = useState(false);
  return (
    <div className='outerc'>
      <h1>JIL-R116</h1>
      <div className='card'>
        <div>
          <div className="container">
            <img src={img} alt='arduino-logo' style={{ position: 'relative', top: '-22px', left: '92px' }} />
            {/* <div style={{ display: 'flex', flexDirection: 'column', height: '100px', width: '200px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#145b4d' }}> */}
            {/* <h3 style={{ marginBottom: '10px' }}>Turn on LED</h3> */}
            <label class="switch" style={{ marginTop: '10px' }}>
              <input type="checkbox" value={on} onClick={() => {
                if (on) {
                  setOn(false)
                  socket.emit('turn-off')
                } else {
                  setOn(true)
                  socket.emit('turn-on')
                }
              }} />
              <span class="slider round"></span>
            </label>
            {/* </div> */}
            <i className="fa fa-angle-up" id="forward" onClick={() => {
              if (speed > 0) {
                socket.emit('forward', speed)
              }
            }}></i>
            <i className="fa fa-angle-left" id="left" onClick={() => {
              if (speed > 0) {
                socket.emit('left', speed)
              }
            }}></i>
            <i className="fa fa-angle-down" id="reverse" onClick={() => {
              if (speed > 0) {
                socket.emit('reverse', speed)
              }
            }}></i>
            <i className="fa fa-angle-right" id="right" onClick={() => {
              if (speed > 0) {
                socket.emit('right', speed)
              }
            }}></i>
            <i className="fa stop" id="stop" onClick={() => {
              socket.emit('stop');
            }}>Stop</i>
          </div>
        </div>
      </div>
      <label htmlFor='speed'>Speed:</label>
      <input type='range' style={{ cursor: 'pointer' }} step='100' min='0' max='500' value={speed} onChange={(e) => {
        setSpeed(e.target.value)
        console.log(e.target.value)
      }} />
    </div>
  );
}

export default App;
