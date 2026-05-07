import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

const defaultProfile = {
  name: '',
  email: '',
  bio: '',
  experience: '',
  specialization: '',
  languagesText: '',
  education: '',
  zoomLink: ''
};

function TeacherProfile() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(defaultProfile);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        setUserData({ ...defaultProfile, ...userDoc.data() });
      }
    };

    if (currentUser) fetchUserData();
  }, [currentUser]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      await updateDoc(doc(db, 'users', currentUser.uid), userData);
      setSaved(true);
    } catch (error) {
      console.error(error);
      alert('Помилка оновлення профілю');
    } finally {
      setLoading(false);
    }
  };

  const displayName = userData.name || currentUser?.displayName || 'Викладач';
  const initials = displayName.slice(0, 1).toUpperCase();

  return (
    <main className="main-content py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden teacher-profile-card">
              <div className="teacher-profile-cover"></div>
              <div className="p-4 text-center">
                <div className="teacher-profile-avatar mx-auto">{initials}</div>
                <h2 className="h4 fw-bold mt-3 mb-1">{displayName}</h2>
                <p className="text-muted mb-3">{userData.specialization || 'Викладач англійської'}</p>
                <div className="d-flex flex-column gap-2 text-start">
                  <div className="teacher-profile-info">
                    <i className="bi bi-envelope text-purple"></i>
                    <span>{userData.email || currentUser?.email}</span>
                  </div>
                  <div className="teacher-profile-info">
                    <i className="bi bi-translate text-purple"></i>
                    <span>{userData.languagesText || 'Англійська'}</span>
                  </div>
                  <div className="teacher-profile-info">
                    <i className="bi bi-award text-purple"></i>
                    <span>{userData.experience || 'Досвід не вказано'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 p-4 mt-4">
              <h5 className="fw-bold mb-3">Як це бачить студент</h5>
              <p className="text-muted mb-3">{userData.bio || 'Додайте короткий опис свого підходу до навчання, щоб профіль виглядав переконливо.'}</p>
              <div className="d-flex flex-wrap gap-2">
                {(userData.languagesText || 'Англійська').split(',').map((language) => (
                  <span key={language} className="badge bg-light text-dark border rounded-pill px-3 py-2">{language.trim()}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4 rounded-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                <div>
                  <h1 className="h3 fw-bold mb-1">Профіль викладача</h1>
                  <p className="text-muted mb-0">Заповніть дані, які допоможуть учням швидше зрозуміти ваш стиль навчання.</p>
                </div>
                {saved && <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">Збережено</span>}
              </div>

              <form onSubmit={handleUpdate}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">Ім’я</label>
                    <input
                      type="text"
                      className="form-control"
                      value={userData.name}
                      onChange={(event) => setUserData({ ...userData, name: event.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">Email</label>
                    <input type="email" className="form-control" disabled value={userData.email || currentUser?.email || ''} />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">Напрям</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Англійська"
                      value={userData.languagesText}
                      onChange={(event) => setUserData({ ...userData, languagesText: event.target.value })}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold mb-1">Стаж</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="5 років досвіду"
                      value={userData.experience}
                      onChange={(event) => setUserData({ ...userData, experience: event.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="small fw-bold mb-1">Спеціалізація</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Розмовна англійська, граматика, підготовка до іспитів"
                      value={userData.specialization}
                      onChange={(event) => setUserData({ ...userData, specialization: event.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="small fw-bold mb-1">Освіта / сертифікати</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Філологія, CELTA, TESOL..."
                      value={userData.education}
                      onChange={(event) => setUserData({ ...userData, education: event.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="small fw-bold mb-1">Посилання на Zoom за замовчуванням</label>
                    <input
                      type="url"
                      className="form-control"
                      value={userData.zoomLink}
                      onChange={(event) => setUserData({ ...userData, zoomLink: event.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="small fw-bold mb-1">Про себе</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      value={userData.bio}
                      onChange={(event) => setUserData({ ...userData, bio: event.target.value })}
                      placeholder="Розкажіть учням про свій підхід до викладання, формат уроків і те, з чим ви найкраще допомагаєте."
                    ></textarea>
                  </div>
                  <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-accent rounded-pill px-5 fw-bold" disabled={loading}>
                      {loading ? 'Збереження...' : 'Зберегти профіль'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TeacherProfile;
