import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react'
import { useCamera } from './components/camera/hooks/use-camera'
import { Canvas } from './components/canvas/canvas'
import { Labels } from './components/canvas/labels'

import CanvasDrawer from './components/canvas/canvas-drawer-using-camera-lib'

function App() {
  const [image, setImage] = useState(null)
  const { takePicture } = useCamera()
  
  async function handleTakePicture(data) {
    const parsedData = await takePicture(data)
    debugger
    setImage(parsedData)
  }
  
  return <CanvasDrawer />

  // return <div>
  //   <button onClick={handleTakePicture}>Take Picture</button>
  //   { image && (
  //     <>
  //       {/*<Canvas imageSrc={image} />*/}
  //       {/*<Labels />*/}
  //       <CanvasDrawer />
  //     </>
  //   )}
  // </div>
}

// function App2() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
