import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, addDoc, deleteDoc, doc, serverTimestamp, runTransaction, increment } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'

function TeacherDashboard() {
  const { currentUser } = useAuth()
  const [mySchedule, setMySchedule] = useState([])
  const [requests, setRequests] = useState([]) // Стан для заявок
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    language: 'en',
    level: 'A1',
    days: '',
    time: '',
    title: '',
    zoomLink: '',
    duration: '60 хв'
  })

  // 1. Функція для визначення кольору бейджа
  const getLangColor = (lang) => {
    switch(lang) {
      case 'en': return 'bg-primary'; 
      case 'es': return 'bg-danger';  
      case 'de': return 'bg-warning text-dark'; 
      default: return 'bg-secondary';
    }
  }

  const fetchData = async () => {
    if (!currentUser) return;

    // Завантаження розкладу з сортуванням
    const q = query(collection(db, 'schedule'), where('teacher_id', '==', currentUser.uid))
    const snapshot = await getDocs(q)
    const sortedData = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => a.time.localeCompare(b.time)); // Сортування за часом
    setMySchedule(sortedData)

    // Завантаження заявок на пробні уроки
    const reqSnap = await getDocs(collection(db, 'trial_requests'))
    setRequests(reqSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  }

  useEffect(() => {
    fetchData()
  }, [currentUser])

  const handleAddLesson = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDoc(collection(db, 'schedule'), {
        ...formData,
        teacher_id: currentUser.uid,
        teacher: currentUser.displayName || 'Викладач',
        status: 'free',
        student_id: null,
        createdAt: serverTimestamp()
      })
      setFormData({ ...formData, title: '', time: '', days: '', zoomLink: '' })
      fetchData()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelByTeacher = async (lessonId, studentId) => {
    if (!studentId || !window.confirm("Скасувати запис учня?")) return;
    try {
      await runTransaction(db, async (transaction) => {
        const lessonRef = doc(db, 'schedule', lessonId);
        const userRef = doc(db, 'users', studentId);
        transaction.update(lessonRef, { status: 'free', student_id: null, student_name: null });
        transaction.update(userRef, { balance: increment(1) });
      });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Видалити цей слот?')) {
      await deleteDoc(doc(db, 'schedule', id))
      fetchData()
    }
  }

  return (
    <main className="main-content py-5 bg-light">
      <div className="container">
        
        {/* СЕКЦІЯ 1: СТАТИСТИКА */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 rounded-4 bg-white text-center">
              <div className="text-muted small fw-bold text-uppercase">Усього занять</div>
              <div className="fs-3 fw-bold">{mySchedule.length}</div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 rounded-4 bg-white text-center border-start border-success border-4">
              <div className="text-muted small fw-bold text-uppercase text-success">Заброньовано</div>
              <div className="fs-3 fw-bold text-success">
                {mySchedule.filter(l => l.status === 'booked').length}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3 rounded-4 bg-white text-center">
              <div className="text-muted small fw-bold text-uppercase text-primary">Вільні слоти</div>
              <div className="fs-3 fw-bold text-primary">
                {mySchedule.filter(l => l.status === 'free').length}
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* СЕКЦІЯ 2: ФОРМА ДОДАВАННЯ */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 rounded-4 sticky-top" style={{ top: '120px', zIndex: 100 }}>
              <h5 className="fw-bold mb-3">Додати заняття</h5>
              <form onSubmit={handleAddLesson}>
                <div className="mb-2">
                  <select className="form-select shadow-none" value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}>
                    <option value="en">Англійська</option>
                    <option value="es">Іспанська</option>
                    <option value="de">Німецька</option>
                  </select>
                </div>
                <input type="text" className="form-control mb-2 shadow-none" placeholder="Назва курсу" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                <div className="row g-2 mb-2">
                  <div className="col"><input type="text" className="form-control shadow-none" placeholder="18:00" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} /></div>
                  <div className="col"><input type="text" className="form-control shadow-none" placeholder="Рівень (B1)" required value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} /></div>
                </div>
                <input type="text" className="form-control mb-2 shadow-none" placeholder="Дні (Пн, Ср)" required value={formData.days} onChange={e => setFormData({...formData, days: e.target.value})} />
                <input type="url" className="form-control mb-3 shadow-none" placeholder="Zoom Link" required value={formData.zoomLink} onChange={e => setFormData({...formData, zoomLink: e.target.value})} />
                <button type="submit" className="btn btn-accent w-100 rounded-pill fw-bold" disabled={loading}>{loading ? 'Зачекайте...' : 'Додати'}</button>
              </form>
            </div>
          </div>

          {/* СЕКЦІЯ 3: РОЗКЛАД */}
          <div className="col-lg-8">
            <h5 className="fw-bold mb-3">Поточний розклад</h5>
            <div className="d-flex flex-column gap-3">
              {mySchedule.map(lesson => (
                <div key={lesson.id} className="card border-0 shadow-sm p-3 rounded-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className={`badge ${getLangColor(lesson.language)} text-uppercase me-2`}>{lesson.language}</span>
                      <span className={`badge ${lesson.status === 'booked' ? 'bg-success' : 'bg-light text-dark border'}`}>{lesson.status === 'booked' ? 'Зайнято' : 'Вільно'}</span>
                      <h6 className="fw-bold mt-2 mb-1">{lesson.title} — {lesson.time}</h6>
                      <small className="text-muted">{lesson.days}</small>
                      {lesson.status === 'booked' && (
                        <div className="mt-2 small text-primary fw-bold"><i className="bi bi-person-check me-1"></i> Учень: {lesson.student_name}</div>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      {lesson.status === 'booked' && (
                        <button onClick={() => handleCancelByTeacher(lesson.id, lesson.student_id)} className="btn btn-sm btn-outline-warning rounded-pill">Звільнити</button>
                      )}
                      <a href={lesson.zoomLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary rounded-circle"><i className="bi bi-camera-video"></i></a>
                      <button onClick={() => handleDelete(lesson.id)} className="btn btn-sm btn-outline-danger rounded-circle"><i className="bi bi-trash"></i></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* СЕКЦІЯ 4: ЗАЯВКИ НА ПРОБНІ УРОКИ */}
            <div className="mt-5">
              <h5 className="fw-bold mb-3 text-dark"><i className="bi bi-envelope-paper me-2"></i>Нові заявки на навчання</h5>
              <div className="table-responsive bg-white p-3 rounded-4 shadow-sm">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Учень</th>
                      <th>Контакти</th>
                      <th>Мова</th>
                      <th>Дата</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length === 0 ? (
                      <tr><td colSpan="4" className="text-center text-muted">Заявок поки немає</td></tr>
                    ) : (
                      requests.map(req => (
                        <tr key={req.id}>
                          <td><strong>{req.name}</strong></td>
                          <td><small>{req.phone}</small><br/><span className="text-primary small">{req.telegram}</span></td>
                          <td><span className="badge bg-light text-dark">{req.language}</span></td>
                          <td className="small text-muted">{req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'Недавно'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default TeacherDashboard