import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'

function TeacherStatistics() {
  const { currentUser } = useAuth()
  const [stats, setStats] = useState({ total: 0, booked: 0, free: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const q = query(collection(db, 'schedule'), where('teacher_id', '==', currentUser.uid))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => doc.data())
      
      setStats({
        total: data.length,
        booked: data.filter(l => l.status === 'booked').length,
        free: data.filter(l => l.status === 'free').length
      })
      setLoading(false)
    }
    if (currentUser) fetchStats()
  }, [currentUser])

  return (
    <main className="main-content py-5 bg-light min-vh-100">
      <div className="container">
        <h2 className="fw-bold mb-4">Аналітика викладача</h2>
        
        <div className="row g-4">
          {/* Картки статистики */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 text-center bg-white">
              <i className="bi bi-journal-text text-primary fs-1 mb-2"></i>
              <div className="text-muted text-uppercase small fw-bold">Усього занять</div>
              <div className="display-5 fw-bold">{stats.total}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 text-center bg-white border-bottom border-success border-5">
              <i className="bi bi-check2-circle text-success fs-1 mb-2"></i>
              <div className="text-muted text-uppercase small fw-bold text-success">Проведено/Заброньовано</div>
              <div className="display-5 fw-bold text-success">{stats.booked}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 text-center bg-white border-bottom border-primary border-5">
              <i className="bi bi-clock-history text-primary fs-1 mb-2"></i>
              <div className="text-muted text-uppercase small fw-bold text-primary">Вільні години</div>
              <div className="display-5 fw-bold text-primary">{stats.free}</div>
            </div>
          </div>
        </div>

        {/* Секція з прогресом */}
        <div className="card border-0 shadow-sm p-4 rounded-4 mt-5 bg-white">
          <h5 className="fw-bold mb-4">Ефективність заповнення розкладу</h5>
          <div className="progress" style={{ height: '30px' }}>
            <div 
              className="progress-bar bg-success" 
              style={{ width: `${(stats.booked / stats.total) * 100}%` }}
            >
              {stats.total > 0 ? Math.round((stats.booked / stats.total) * 100) : 0}% Зайнято
            </div>
          </div>
          <p className="mt-3 text-muted">
            Цей показник відображає відсоток заброньованих занять відносно всіх створених вами слотів.
          </p>
        </div>
      </div>
    </main>
  )
}

export default TeacherStatistics