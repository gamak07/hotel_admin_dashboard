import { useState, useEffect } from 'react'
import './App.css'
import { AdminProvider } from './Contexts/AdminProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Rooms from './Pages/Rooms'
import Sidebar from './Components/Sidebar'
import AddRooms from './Pages/AddRooms'

function App() {
  

  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/addRooms' element={<AddRooms />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  )
}

export default App
