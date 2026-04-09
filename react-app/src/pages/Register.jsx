import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../services/firebase'

function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'student'
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      await setDoc(doc(db, 'users', result.user.uid), {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        createdAt: serverTimestamp()
      })
      navigate('/student')
    } catch (err) {
      setError('Помилка реєстрації. Перевірте дані.')
    }
  }

  return (
    <main className="main-content py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="card auth-card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Створити обліковий запис</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Повне ім'я</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Адреса електронної пошти</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Пароль</label>
                    <input
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-accent w-100">Зареєструватися</button>
                </form>

                <div className="form-text-link mt-3 text-center">
                  Вже маєте обліковий запис? <Link to="/login">Увійти</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Register