import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase'
import logo from '../assets/images/logo.PNG'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const docSnap = await getDoc(doc(db, 'users', result.user.uid))
      const role = docSnap.data().role
      if (role === 'teacher') {
        navigate('/teacher')
      } else {
        navigate('/student')
      }
    } catch (err) {
      setError('Невірний email або пароль')
    }
  }

  return (
      <main className="main-content py-5 mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <div className="card auth-card">
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">Увійти</h2>

                  {error && <div className="alert alert-danger">{error}</div>}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Адреса електронної пошти</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Пароль</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-accent w-100">Увійти</button>
                  </form>

                  <div className="form-text-link mt-3 text-center">
                    Немає облікового запису? <Link to="/register">Зареєструйтесь</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  )
}

export default Login