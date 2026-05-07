import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  runTransaction,
  serverTimestamp,
  where
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

const languageLabels = {
  en: 'Англійська'
};

function TeacherDashboard() {
  const { currentUser } = useAuth();
  const [mySchedule, setMySchedule] = useState([]);
  const [requests, setRequests] = useState([]);
  const [studentsById, setStudentsById] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    language: 'en',
    level: 'A1',
    days: '',
    time: '',
    title: '',
    zoomLink: '',
    duration: '60 хв'
  });

  const getLangColor = (lang) => {
    return lang === 'en' ? 'bg-primary' : 'bg-secondary';
  };

  const fetchData = async () => {
    if (!currentUser) return;

    setPageLoading(true);
    try {
      const scheduleQuery = query(collection(db, 'schedule'), where('teacher_id', '==', currentUser.uid));
      const [scheduleSnapshot, requestsSnapshot, usersSnapshot] = await Promise.all([
        getDocs(scheduleQuery),
        getDocs(collection(db, 'trial_requests')),
        getDocs(collection(db, 'users'))
      ]);

      const scheduleData = scheduleSnapshot.docs
        .map((item) => ({ id: item.id, ...item.data() }))
        .sort((a, b) => `${a.days || ''} ${a.time || ''}`.localeCompare(`${b.days || ''} ${b.time || ''}`));

      const usersMap = {};
      usersSnapshot.docs.forEach((item) => {
        usersMap[item.id] = { id: item.id, ...item.data() };
      });

      setMySchedule(scheduleData);
      setStudentsById(usersMap);
      setRequests(requestsSnapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
    } catch (error) {
      console.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  const bookedLessons = useMemo(
    () => mySchedule.filter((lesson) => lesson.status === 'booked'),
    [mySchedule]
  );

  const freeLessons = useMemo(
    () => mySchedule.filter((lesson) => lesson.status !== 'booked'),
    [mySchedule]
  );

  const activeStudents = useMemo(() => {
    const ids = [...new Set(bookedLessons.map((lesson) => lesson.student_id).filter(Boolean))];
    return ids.map((id) => studentsById[id] || { id, name: bookedLessons.find((lesson) => lesson.student_id === id)?.student_name || 'Учень' });
  }, [bookedLessons, studentsById]);

  const teacherData = studentsById[currentUser?.uid] || {};
  const teacherName = teacherData.name || currentUser?.displayName || 'викладачу';
  const nextLessons = bookedLessons.slice(0, 4);
  const bookingRate = mySchedule.length > 0 ? Math.round((bookedLessons.length / mySchedule.length) * 100) : 0;

  const handleAddLesson = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'schedule'), {
        ...formData,
        teacher_id: currentUser.uid,
        teacher: teacherData.name || currentUser.displayName || 'Викладач',
        status: 'free',
        student_id: null,
        createdAt: serverTimestamp()
      });

      setFormData((current) => ({ ...current, title: '', time: '', days: '', zoomLink: '' }));
      fetchData();
    } catch (error) {
      console.error(error);
      alert('Не вдалося додати заняття');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelByTeacher = async (lessonId, studentId) => {
    if (!studentId || !window.confirm('Скасувати запис учня на це заняття?')) return;

    try {
      await runTransaction(db, async (transaction) => {
        const lessonRef = doc(db, 'schedule', lessonId);
        const userRef = doc(db, 'users', studentId);

        transaction.update(lessonRef, {
          status: 'free',
          student_id: null,
          student_name: null
        });
        transaction.update(userRef, { balance: increment(1) });
      });
      fetchData();
    } catch (error) {
      console.error(error);
      alert('Не вдалося скасувати запис');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Видалити цей слот з розкладу?')) return;

    await deleteDoc(doc(db, 'schedule', id));
    fetchData();
  };

  if (pageLoading) {
    return (
      <main className="main-content py-5 bg-light min-vh-100">
        <div className="container">
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
            <div className="spinner-border text-primary mx-auto mb-3" role="status"></div>
            <p className="text-muted mb-0">Завантажуємо кабінет викладача...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content py-5 bg-light min-vh-100 teacher-dashboard">
      <div className="container">
        <section className="teacher-dashboard-hero rounded-4 shadow-sm mb-4">
          <div>
            <span className="badge bg-white text-purple rounded-pill px-3 py-2 mb-3">Кабінет викладача</span>
            <h1 className="fw-bold mb-2">Вітаємо, {teacherName}!</h1>
            <p className="mb-0 opacity-75">Тут ваш розклад, учні, заявки на пробні уроки та швидке створення нових слотів.</p>
          </div>
          <div className="teacher-dashboard-hero-actions">
            <Link to="/teacher/profile" className="btn btn-light rounded-pill fw-bold px-4">
              <i className="bi bi-person-gear me-2"></i>Профіль
            </Link>
            <Link to="/teacher/statistics" className="btn btn-outline-light rounded-pill fw-bold px-4">
              <i className="bi bi-bar-chart-line me-2"></i>Статистика
            </Link>
          </div>
        </section>

        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="teacher-stat-card">
              <i className="bi bi-calendar2-week text-purple"></i>
              <span>Усього слотів</span>
              <strong>{mySchedule.length}</strong>
            </div>
          </div>
          <div className="col-md-3">
            <div className="teacher-stat-card">
              <i className="bi bi-person-check text-success"></i>
              <span>Заброньовано</span>
              <strong>{bookedLessons.length}</strong>
            </div>
          </div>
          <div className="col-md-3">
            <div className="teacher-stat-card">
              <i className="bi bi-clock-history text-primary"></i>
              <span>Вільні слоти</span>
              <strong>{freeLessons.length}</strong>
            </div>
          </div>
          <div className="col-md-3">
            <div className="teacher-stat-card">
              <i className="bi bi-lightning-charge text-warning"></i>
              <span>Заповнення</span>
              <strong>{bookingRate}%</strong>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-xl-8">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <div>
                  <h5 className="fw-bold mb-1">Найближчі заняття</h5>
                  <p className="text-muted small mb-0">Заброньовані уроки, які потребують вашої уваги.</p>
                </div>
                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">{bookedLessons.length} активних</span>
              </div>

              {nextLessons.length === 0 ? (
                <div className="teacher-empty-state">
                  <i className="bi bi-calendar-plus"></i>
                  <div>
                    <strong>Поки немає заброньованих занять</strong>
                    <p className="mb-0">Створіть вільні слоти, щоб учні могли записатися з розкладу.</p>
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {nextLessons.map((lesson) => (
                    <div key={lesson.id} className="teacher-lesson-row">
                      <div className="teacher-lesson-time">
                        <strong>{lesson.time || 'Час'}</strong>
                        <span>{lesson.days || 'День'}</span>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                          <h6 className="fw-bold mb-0">{lesson.title || 'Заняття'}</h6>
                          <span className={`badge ${getLangColor(lesson.language)} rounded-pill`}>
                            {languageLabels[lesson.language] || 'Англійська'}
                          </span>
                          <span className="badge bg-light text-dark border rounded-pill">{lesson.level}</span>
                        </div>
                        <div className="small text-muted">
                          <i className="bi bi-person me-1"></i>
                          {lesson.student_name || studentsById[lesson.student_id]?.name || 'Учень'}
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        {lesson.zoomLink && (
                          <a href={lesson.zoomLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-accent rounded-pill px-3">
                            Zoom
                          </a>
                        )}
                        <button onClick={() => handleCancelByTeacher(lesson.id, lesson.student_id)} className="btn btn-sm btn-outline-warning rounded-pill px-3">
                          Звільнити
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <div>
                  <h5 className="fw-bold mb-1">Поточний розклад</h5>
                  <p className="text-muted small mb-0">Усі створені вами слоти.</p>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                {mySchedule.length === 0 ? (
                  <div className="text-center text-muted py-4">Слотів поки немає.</div>
                ) : (
                  mySchedule.map((lesson) => (
                    <div key={lesson.id} className="teacher-schedule-row">
                      <div>
                        <span className={`badge ${getLangColor(lesson.language)} me-2`}>Англійська</span>
                        <span className={`badge ${lesson.status === 'booked' ? 'bg-success' : 'bg-light text-dark border'}`}>
                          {lesson.status === 'booked' ? 'Зайнято' : 'Вільно'}
                        </span>
                        <div className="fw-bold mt-2">{lesson.title || 'Заняття'} · {lesson.time || 'час'}</div>
                        <div className="small text-muted">{lesson.days || 'дні не вказано'} · {lesson.level}</div>
                      </div>
                      <div className="d-flex gap-2">
                        {lesson.zoomLink && (
                          <a href={lesson.zoomLink} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary rounded-circle" aria-label="Zoom">
                            <i className="bi bi-camera-video"></i>
                          </a>
                        )}
                        <button onClick={() => handleDelete(lesson.id)} className="btn btn-sm btn-outline-danger rounded-circle" aria-label="Видалити">
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="col-xl-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3">Додати заняття</h5>
              <form onSubmit={handleAddLesson}>
                <input type="text" className="form-control mb-2 shadow-none" placeholder="Назва курсу" required value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
                <div className="row g-2 mb-2">
                  <div className="col">
                    <input type="text" className="form-control shadow-none" placeholder="18:00" required value={formData.time} onChange={(event) => setFormData({ ...formData, time: event.target.value })} />
                  </div>
                  <div className="col">
                    <input type="text" className="form-control shadow-none" placeholder="B1" required value={formData.level} onChange={(event) => setFormData({ ...formData, level: event.target.value })} />
                  </div>
                </div>
                <input type="text" className="form-control mb-2 shadow-none" placeholder="Дні: Пн, Ср" required value={formData.days} onChange={(event) => setFormData({ ...formData, days: event.target.value })} />
                <input type="url" className="form-control mb-3 shadow-none" placeholder="Zoom Link" required value={formData.zoomLink} onChange={(event) => setFormData({ ...formData, zoomLink: event.target.value })} />
                <button type="submit" className="btn btn-accent w-100 rounded-pill fw-bold" disabled={loading}>
                  {loading ? 'Додаємо...' : 'Додати слот'}
                </button>
              </form>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3">Мої учні</h5>
              {activeStudents.length === 0 ? (
                <p className="text-muted mb-0">Учні з’являться тут після бронювання занять.</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {activeStudents.slice(0, 5).map((student) => {
                    const lessonsCount = bookedLessons.filter((lesson) => lesson.student_id === student.id).length;

                    return (
                      <div key={student.id} className="teacher-student-row">
                        <div className="teacher-avatar">{(student.name || student.email || 'У').slice(0, 1).toUpperCase()}</div>
                        <div className="flex-grow-1">
                          <div className="fw-bold">{student.name || 'Учень'}</div>
                          <div className="small text-muted">{student.email || `${lessonsCount} занять`}</div>
                        </div>
                        <span className="badge bg-light text-dark border">{lessonsCount}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-envelope-paper me-2"></i>Нові заявки
              </h5>
              {requests.length === 0 ? (
                <p className="text-muted mb-0">Заявок поки немає.</p>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {requests.slice(0, 5).map((request) => (
                    <div key={request.id} className="teacher-request-row">
                      <div className="fw-bold">{request.name || 'Новий учень'}</div>
                      <div className="small text-muted">{request.phone || 'Телефон не вказано'}</div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="badge bg-light text-dark border">Англійська</span>
                        <span className="small text-purple">{request.telegram}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TeacherDashboard;
