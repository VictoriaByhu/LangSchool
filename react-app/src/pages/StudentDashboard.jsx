import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

function StudentDashboard() {
  const { currentUser } = useAuth()
  const [bookedLessons, setBookedLessons] = useState([])
  const [userStats, setUserStats] = useState({ balance: 0, name: '' })
  const [loading, setLoading] = useState(true)

  const fetchStudentData = async () => {
    try {
      // 1. Отримуємо дані профілю (баланс)
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
      if (userDoc.exists()) {
        setUserStats(userDoc.data())
      }

      // 2. Отримуємо заброньовані заняття
      const q = query(
        collection(db, 'schedule'), 
        where('student_id', '==', currentUser.uid),
        where('status', '==', 'booked')
      )
      const snapshot = await getDocs(q)
      setBookedLessons(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    } catch (error) {
      console.error("Помилка завантаження даних учня:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentUser) fetchStudentData()
  }, [currentUser])

  if (loading) return <div className="text-center py-5">Завантаження кабінету...</div>

  return (
    <main className="main-content py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <h2 className="fw-bold">Вітаємо, {userStats.name || 'учень'}! 👋</h2>
          <p className="text-muted">Твій навчальний центр LinguaLab</p>
        </div>

        <div className="row g-4">
          {/* ЛІВА ПАНЕЛЬ: СТАТИСТИКА ТА ПЕРЕХОДИ */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 mb-4 bg-primary text-white">
              <h5 className="small text-uppercase fw-bold opacity-75">Мій баланс</h5>
              <div className="display-4 fw-bold">{userStats.balance}</div>
              <p className="mb-0">доступних занять</p>
              <Link to="/prices" className="btn btn-light btn-sm mt-3 rounded-pill px-3 fw-bold text-primary">
                Поповнити баланс
              </Link>
            </div>

            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
              <h5 className="fw-bold mb-3">Самостійне навчання</h5>
              <p className="text-muted small">Хочеш потренуватися без викладача? Проходь наші інтерактивні курси.</p>
              <Link to="/self-study" className="btn btn-accent w-100 rounded-pill fw-bold">
                Відкрити Self-study
              </Link>
            </div>
          </div>

          {/* ПРАВА ПАНЕЛЬ: РОЗКЛАД */}
          <div className="col-lg-8">
            <h5 className="fw-bold mb-3 text-dark">Мої заброньовані уроки</h5>
            
            {bookedLessons.length === 0 ? (
              <div className="card border-0 shadow-sm p-5 text-center rounded-4 bg-white">
                <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
                <h6>У вас поки немає заброньованих уроків</h6>
                <Link to="/schedule" className="btn btn-outline-primary mt-2 rounded-pill">
                  Обрати час у розкладі
                </Link>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {bookedLessons.map(lesson => (
                  <div key={lesson.id} className="card border-0 shadow-sm p-3 rounded-4 border-start border-primary border-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <div>
                        <span className="badge bg-light text-primary text-uppercase mb-2 border border-primary">
                          {lesson.level}
                        </span>
                        <h6 className="fw-bold mb-1">{lesson.title}</h6>
                        <div className="small text-muted">
                          <i className="bi bi-clock me-1"></i> {lesson.time} ({lesson.days})
                        </div>
                        <div className="small text-muted">
                          <i className="bi bi-person me-1"></i> Викладач: <strong>{lesson.teacher}</strong>
                        </div>
                      </div>
                      <div>
                        <a href={lesson.zoomLink} target="_blank" rel="noreferrer" className="btn btn-primary rounded-pill px-4 fw-bold">
                          <i className="bi bi-camera-video me-2"></i> Увійти в Zoom
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default StudentDashboard