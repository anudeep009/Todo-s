import './App.css'
import { useState } from 'react'
import Layout from './Layout'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { LandingPage,Todos,Profile,Signin,Signup } from './exports'

export default function App() {
  return (
    <>
      <Router>
         <Routes>
          <Route path='/' element={<Layout />}>
             <Route index element={<LandingPage />} />
             <Route path='/todos' element={<Todos />} />
             <Route path='/profile' element={<Profile />} />
             <Route path='/signin' element={<Signin />} />
             <Route path='/signup' element={<Signup />} />
          </Route>
         </Routes>
      </Router>
    </>
  )
}