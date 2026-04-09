import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.PNG'

function Header() {
  return (
    <header className="sticky-top shadow-sm">
      <nav id="mainNav" className="navbar navbar-expand-lg navbar-dark container-fluid px-4">
        
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} style={{ height: '50px' }} alt="LinguaLab" className="rounded-2" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto ms-0 mb-2 mb-lg-0 gap-3">
            <li className="nav-item"><Link className="nav-link" to="/about">Про нас</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about#courses">Курси</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/prices">Деталі та Ціни</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/schedule">Розклад</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/feedbacks">Відгуки</Link></li>
          </ul>

          <Link className="btn d-inline-flex align-items-center gap-2" to="/login">
            <i className="bi bi-box-arrow-in-right" style={{ fontSize: '1.2rem' }}></i>
            Увійти
          </Link>
        </div>

      </nav>
    </header>
  )
}

export default Header