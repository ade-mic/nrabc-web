import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import EventsCalendarPage from './pages/EventsCalenderPage'
import AboutUsPage from './pages/AboutPage'
import Ministries from './pages/Ministries'
import './styles/App.css'


function App() {

  return (
    <Router>
      <Header />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/events" element={<EventsCalendarPage />} />
        <Route path="/ministries" element={<Ministries />} />
      </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
