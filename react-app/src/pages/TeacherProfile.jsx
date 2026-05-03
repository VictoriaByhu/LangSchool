import { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useAuth } from '../context/AuthContext'

function TeacherProfile() {
  const { currentUser } = useAuth()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    bio: '',
    experience: '',
    zoomLink: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
      if (userDoc.exists()) setUserData(userDoc.data())
    }
    if (currentUser) fetchUserData()
  }, [currentUser])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), userData)
      alert('Профіль оновлено!')
    } catch (error) {
      console.error(error)
      alert('Помилка оновлення')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="main-content py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card border-0 shadow-sm p-4 rounded-4">
              <h2 className="fw-bold mb-4">Мій кабінет (Профіль)</h2>
              
              <form onSubmit={handleUpdate}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="small fw-bold">Ім'я</label>
                    <input type="text" className="form-control" 
                      value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold">Email</label>
                    <input type="email" className="form-control" disabled value={userData.email} />
                  </div>
                  <div className="col-12">
                    <label className="small fw-bold">Посилання на Zoom (по замовчуванню)</label>
                    <input type="url" className="form-control" 
                      value={userData.zoomLink} onChange={e => setUserData({...userData, zoomLink: e.target.value})} />
                  </div>
                  <div className="col-12">
                    <label className="small fw-bold">Про себе</label>
                    <textarea className="form-control" rows="4"
                      value={userData.bio} onChange={e => setUserData({...userData, bio: e.target.value})}
                      placeholder="Розкажіть учням про свій підхід до викладання..."></textarea>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary-custom rounded-pill px-5" disabled={loading}>
                      {loading ? 'Збереження...' : 'Зберегти зміни'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default TeacherProfile