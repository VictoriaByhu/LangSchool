import { Link, useNavigate, useLocation } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/images/logo.PNG'
import { HashLink } from 'react-router-hash-link'

function Header() {
  const { currentUser, userRole } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error("Помилка виходу:", error)
    }
  }

  // Налаштування посилань залежно від ролі
  const homeLink = userRole === 'teacher' ? '/teacher' : '/'
  const dashboardLink = userRole === 'teacher' ? '/teacher/profile' : '/student'

  const isActive = (path) => location.pathname === path ? 'active fw-bold' : ''

  return (
    <header className="sticky-top shadow-sm bg-dark">
      <nav id="mainNav" className="navbar navbar-expand-lg navbar-dark container-fluid px-4">
        
        {/* Логотип */}
        <Link className="navbar-brand d-flex align-items-center" to={homeLink}>
          <img src={logo} style={{ height: '50px' }} alt="LinguaLab" className="rounded-2" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto ms-0 mb-2 mb-lg-0 gap-3">
            
            {currentUser && userRole === 'teacher' ? (
              /** МЕНЮ ДЛЯ ВИКЛАДАЧА */
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/teacher')}`} to="/teacher">
                    <i className="bi bi-calendar3 me-2"></i>Мій Розклад
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/teacher/statistics')}`} to="/teacher/statistics">
                    <i className="bi bi-bar-chart me-2"></i>Статистика
                  </Link>
                </li>
              </>
            ) : (
              /** МЕНЮ ДЛЯ УЧНІВ ТА ГОСТЕЙ */
              <>
                <li className="nav-item"><Link className="nav-link" to="/about">Про нас</Link></li>
                
                {/* Новий розділ Self-study */}
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/self-study')}`} to="/self-study">
                    <i className="bi bi-book me-2"></i>Self-study курси
                  </Link>
                </li>

                <li className="nav-item">
                  <HashLink className="nav-link" to="/about#courses">Курси</HashLink>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/prices">Деталі та Ціни</Link></li>
                
                {currentUser && userRole === 'student' && (
                  <li className="nav-item">
                    <Link className={`nav-link ${isActive('/schedule')}`} to="/schedule">Розклад</Link>
                  </li>
                )}
                
                <li className="nav-item"><Link className="nav-link" to="/feedbacks">Відгуки</Link></li>
              </>
            )}
          </ul>

          {/* КНОПКИ ПРАВОЇ ЧАСТИНИ */}
          <div className="d-flex align-items-center gap-2">
            {currentUser ? (
              <>
                <Link to={dashboardLink} className="btn btn-primary-custom d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2 text-white">
                  <i className="bi bi-person-circle" style={{ fontSize: '1.2rem' }}></i>
                  <span className="d-none d-sm-inline font-weight-bold text-white">Мій кабінет</span>
                </Link>
                
                <button onClick={handleLogout} className="btn btn-outline-light btn-sm rounded-pill px-3">
                  <i className="bi bi-box-arrow-right me-1"></i> Вийти
                </button>
              </>
            ) : (
              <Link className="btn btn-accent d-inline-flex align-items-center gap-2 rounded-pill px-4 fw-bold" to="/login">
                <i className="bi bi-box-arrow-in-right" style={{ fontSize: '1.2rem' }}></i> Увійти
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header