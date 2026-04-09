import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Schedule from './pages/Schedule'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App