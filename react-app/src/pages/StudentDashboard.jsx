import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

function StudentDashboard() {
  const { currentUser } = useAuth()
  const [myLessons, setMyLessons] = useState([])

  useEffect(() => {
    const fetchMyLessons = async () => {
      const snapshot = await getDocs(collection(db, 'schedule'))
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setMyLessons(data.filter(s => s.student_id === currentUser.uid))
    }
    fetchMyLessons()
  }, [])

  return (
    <main className="main-content py-5">
      <div className="container">

        <div className="mb-5">
          <h2 className="fw-bold">Вітаємо!</h2>
          <p className="text-muted">Це ваш особистий кабінет учня.</p>
        </div>

        <h4 className="fw-bold mb-3">Мої заняття</h4>

        {myLessons.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted mb-3">У вас ще немає заброньованих занять.</p>
            <Link to="/schedule" className="btn btn-accent rounded-pill px-4">
              Переглянути розклад
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {myLessons.map(lesson => (
              <div key={lesson.id} className="schedule-card bg-white p-4 rounded-4 shadow-sm">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <div className="fw-bold fs-4" style={{ color: 'var(--accent-color)' }}>{lesson.time}</div>
                    <div className="text-muted small fw-bold text-uppercase">{lesson.days}</div>
                  </div>
                  <div className="col-md-6">
                    <h5 className="fw-bold mb-1">{lesson.title}</h5>
                    <span className="badge bg-success mb-2">Заброньовано</span>
                    <div className="small text-muted">Викладач: {lesson.teacher}</div>
                  </div>
                  <div className="col-md-3 text-end">
                    <a href={lesson.zoomLink} target="_blank" rel="noreferrer"
                      className="btn btn-primary rounded-pill px-4">
                      <i className="bi bi-camera-video me-2"></i>Zoom
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}

export default StudentDashboard