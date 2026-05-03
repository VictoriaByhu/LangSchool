import { useEffect, useState } from 'react'
import { collection, getDocs, doc, runTransaction, getDoc, increment } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Schedule() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [schedule, setSchedule] = useState([])
  const [activeTab, setActiveTab] = useState('en')
  const [userBalance, setUserBalance] = useState(null) // Стан для балансу
  const [loading, setLoading] = useState(false)

  // Функція завантаження розкладу та балансу
  const fetchData = async () => {
    // Завантажуємо розклад
    const snapshot = await getDocs(collection(db, 'schedule'))
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setSchedule(data)

    // Завантажуємо баланс, якщо користувач залогінений
    if (currentUser) {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
      if (userDoc.exists()) {
        setUserBalance(userDoc.data().balance || 0)
      }
    }
  }

  useEffect(() => {
      fetchData()
    }, [currentUser])

    // Знайдіть функцію handleBook у файлі Schedule.jsx
const handleBook = async (lessonId) => {
  if (!currentUser) return;

  try {
    // 1. Отримуємо дані поточного учня з колекції users
    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
    const userData = userDoc.data();
    const studentName = userData?.name || "Учень"; // Беремо ім'я з профілю

    await runTransaction(db, async (transaction) => {
      const lessonRef = doc(db, 'schedule', lessonId);
      const userRef = doc(db, 'users', currentUser.uid);

      const lessonSnap = await transaction.get(lessonRef);
      if (lessonSnap.data().status === 'booked') throw "Вже заброньовано";

      // 2. Записуємо в урок не тільки ID, а й Ім'я
      transaction.update(lessonRef, {
        status: 'booked',
        student_id: currentUser.uid,
        student_name: studentName // ЦЕ ПОЛЕ ВАЖЛИВЕ
      });

      transaction.update(userRef, {
        balance: increment(-1)
      });
    });

    alert("Заброньовано!");
    fetchData();
  } catch (e) {
    console.error(e);
  }
};

  const filtered = schedule.filter(s => s.language === activeTab)

  return (
    <main className="main-content">
      <section className="py-5 bg-light">
        <div className="container">

          <div className="text-center mb-4">
            <h2 className="display-6 fw-bold">Розклад занять</h2>
            <p className="lead text-muted">Оберіть зручний час та приєднуйтесь до групи</p>
            
            {/* Відображення балансу для зручності учня */}
            {currentUser && userBalance !== null && (
              <div className="badge bg-white text-dark border p-2 px-3 rounded-pill shadow-sm">
                Мій баланс: <span className="fw-bold text-primary">{userBalance} занять</span>
              </div>
            )}
          </div>

          {/* Вкладки мов */}
          <ul className="nav nav-pills justify-content-center mb-5 gap-3">
            {['en', 'es', 'de'].map(lang => (
              <li className="nav-item" key={lang}>
                <button
                  className={`nav-link rounded-pill px-4 fw-bold ${activeTab === lang ? 'active' : ''}`}
                  onClick={() => setActiveTab(lang)}
                >
                  {lang === 'en' ? 'Англійська' : lang === 'es' ? 'Іспанська' : 'Німецька'}
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-column gap-3">
            {filtered.length === 0 && (
              <p className="text-center text-muted py-5">Занять поки немає.</p>
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
                      <span className="badge bg-success-subtle text-success fs-6 px-3 py-2 border border-success-subtle w-100">Ви записані</span>
                    ) : lesson.status === 'booked' ? (
                      <span className="badge bg-secondary-subtle text-secondary fs-6 px-3 py-2 w-100">Місць немає</span>
                    ) : (
                      <button
                        className="btn btn-accent px-4 rounded-pill fw-bold w-100"
                        onClick={() => handleBook(lesson.id)}
                        disabled={loading}
                      >
                        {loading ? 'Бронюємо...' : 'Записатись'}
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