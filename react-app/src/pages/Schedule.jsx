import { useEffect, useState } from 'react'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Schedule() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [schedule, setSchedule] = useState([])
  const [activeTab, setActiveTab] = useState('en')
  const [booked, setBooked] = useState(false)

  useEffect(() => {
    const fetchSchedule = async () => {
      const snapshot = await getDocs(collection(db, 'schedule'))
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setSchedule(data)
    }
    fetchSchedule()
  }, [booked])

  const handleBook = async (lessonId) => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    await updateDoc(doc(db, 'schedule', lessonId), {
      student_id: currentUser.uid,
      status: 'booked'
    })
    setBooked(!booked)
    alert('Ви успішно записались на урок!')
  }

  const filtered = schedule.filter(s => s.language === activeTab)

  return (
    <main className="main-content">
      <section className="py-5 bg-light">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold">Розклад занять</h2>
            <p className="lead text-muted">Оберіть зручний час та приєднуйтесь до групи</p>
          </div>

          {/* Вкладки мов */}
          <ul className="nav nav-pills justify-content-center mb-5 gap-3">
            <li className="nav-item">
              <button
                className={`nav-link rounded-pill px-4 fw-bold ${activeTab === 'en' ? 'active' : ''}`}
                onClick={() => setActiveTab('en')}
              >Англійська</button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link rounded-pill px-4 fw-bold ${activeTab === 'es' ? 'active' : ''}`}
                onClick={() => setActiveTab('es')}
              >Іспанська</button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link rounded-pill px-4 fw-bold ${activeTab === 'de' ? 'active' : ''}`}
                onClick={() => setActiveTab('de')}
              >Німецька</button>
            </li>
          </ul>

          {/* Картки занять */}
          <div className="d-flex flex-column gap-3">
            {filtered.length === 0 && (
              <p className="text-center text-muted">Занять поки немає.</p>
            )}
            {filtered.map(lesson => (
              <div key={lesson.id} className="schedule-card bg-white p-4 rounded-4 shadow-sm border-0">
                <div className="row align-items-center gy-3">
                  <div className="col-md-3 text-center text-md-start">
                    <div className="fw-bold" style={{ color: 'var(--accent-color)', fontSize: '1.8rem' }}>{lesson.time}</div>
                    <div className="text-muted small fw-bold text-uppercase">{lesson.days}</div>
                  </div>
                  <div className="col-md-6 px-md-4">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h5 className="fw-bold mb-0">{lesson.title}</h5>
                      <span className="badge bg-light text-dark border rounded-pill">{lesson.level}</span>
                    </div>
                    <div className="small text-muted mt-2">
                      Викладач: <span className="fw-bold text-dark">{lesson.teacher}</span>
                    </div>
                  </div>
                  <div className="col-md-3 text-center text-md-end">
                    {lesson.status === 'booked' && lesson.student_id === currentUser?.uid ? (
                      <span className="badge bg-success fs-6 px-3 py-2">Ви записані</span>
                    ) : lesson.status === 'booked' ? (
                      <span className="badge bg-secondary fs-6 px-3 py-2">Місць немає</span>
                    ) : (
                      <button
                        className="btn btn-accent px-4 rounded-pill fw-bold w-100"
                        onClick={() => handleBook(lesson.id)}
                      >
                        Записатись
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}

export default Schedule