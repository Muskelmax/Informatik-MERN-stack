import { useState } from 'react'
import React from 'react'
import './App.css'
import Scene from './scene/scene.jsx'
import PopUp from './popUp/PopUp.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Scene />}></Route>
        <Route path='/ny' element={<PopUp />}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
