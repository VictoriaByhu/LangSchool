import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext' // ДОДАЛИ ІМПОРТ КОНТЕКСТУ

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Schedule from './pages/Schedule'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import LevelTest from './pages/LevelTest'
import FAQ from './pages/FAQ'
import Prices from './pages/Prices'
import Feedbacks from './pages/Feedbacks'
import TeacherStatistics from './pages/TeacherStatistics'
import PrivateRoute from './components/PrivateRoute' 
import TeacherProfile from './pages/TeacherProfile'
import SelfStudyCatalog from './pages/SelfStudyCatalog'
import LessonPage from './pages/LessonPage'
import LevelTopics from './pages/LevelTopics'

function App() {
  const { currentUser } = useAuth() // ТЕПЕР APP ЗНАЄ, ЧИ Є КОРИСТУВАЧ

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Публічні маршрути */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/leveltest" element={<LevelTest />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/feedbacks" element={<Feedbacks />} />

            {/* МАРШРУТИ УЧНЯ */}
            <Route 
              path="/schedule" 
              element={<PrivateRoute role="student"><Schedule /></PrivateRoute>} 
            />
            <Route 
              path="/student" 
              element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} 
            />
            <Route 
              path="/self-study" 
              element={currentUser ? <SelfStudyCatalog /> : <Navigate to="/login" />} 
            />
            <Route path="/self-study/:level/:lessonId" element={<LessonPage />} />
            <Route path="/self-study/:level" element={<LevelTopics />} />
            <Route path="/self-study/:level/:lessonId" element={<LessonPage />} />

            {/* МАРШРУТИ ВИКЛАДАЧА */}
            <Route 
              path="/teacher" 
              element={<PrivateRoute role="teacher"><TeacherDashboard /></PrivateRoute>} 
            />
            <Route 
              path="/teacher/statistics" 
              element={<PrivateRoute role="teacher"><TeacherStatistics /></PrivateRoute>} 
            />
            <Route 
              path="/teacher/profile" 
              element={<PrivateRoute role="teacher"><TeacherProfile /></PrivateRoute>} 
            />

            {/* Перенаправлення, якщо шлях не існує */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App