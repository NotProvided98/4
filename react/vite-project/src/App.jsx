// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './views/Home'
import Login from './views/Login'
import NewAd from './views/NewAd'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/add" element={<NewAd />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
