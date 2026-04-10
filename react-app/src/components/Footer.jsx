import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

function Footer() {
  return (
    <footer className="pt-5 pb-3 border-top">
      <div className="container">
        <div className="row g-4 mb-5">

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ color: 'var(--primary-color)' }}>Контакти</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <div className="d-flex gap-2 mb-2">
                  <a href="#" className="social-icon-sm"><i className="bi bi-telegram"></i></a>
                  <a href="#" className="social-icon-sm"><i className="bi bi-whatsapp"></i></a>
                  <a href="#" className="social-icon-sm"><i className="bi bi-envelope"></i></a>
                </div>
              </li>
              <li><a href="mailto:info@lingualab.com" className="footer-link">info@lingualab.com</a></li>
              <li><a href="tel:+380000000000" className="footer-link">+38 (000) 000-00-00</a></li>
              <li className="text-muted small mt-2">Пн-Пт: 09:00 - 20:00<br />Сб: 10:00 - 16:00</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ color: 'var(--primary-color)' }}>Про школу</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/about" className="footer-link">Наша команда</Link></li>
              <li><Link to="/feedbacks" className="footer-link">Відгуки студентів</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ color: 'var(--primary-color)' }}>Навчання</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><HashLink to="/about#courses" className="footer-link">Всі курси</HashLink></li>
              <li><Link to="/prices" className="footer-link">Ціни та пакети</Link></li>
              <li><Link to="/schedule" className="footer-link">Розклад занять</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ color: 'var(--primary-color)' }}>Студенту</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/leveltest" className="footer-link"><i className="bi bi-ui-checks me-1"></i>Тест на рівень</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ (Питання)</Link></li>
            </ul>
          </div>

        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-4 border-top border-bottom gap-3">
          <div className="d-flex gap-3">
            <Link to="/leveltest" className="btn btn-outline-light">
              <i className="bi bi-lightning-charge-fill me-2"></i>Пройти тест рівня
            </Link>
          </div>
          <div className="d-flex gap-2">
            <a href="#" className="social-icon-round"><i className="bi bi-telegram"></i></a>
            <a href="#" className="social-icon-round"><i className="bi bi-facebook"></i></a>
            <a href="#" className="social-icon-round"><i className="bi bi-instagram"></i></a>
            <a href="#" className="social-icon-round"><i className="bi bi-linkedin"></i></a>
            <a href="#" className="social-icon-round"><i className="bi bi-youtube"></i></a>
            <a href="#" className="social-icon-round"><i className="bi bi-tiktok"></i></a>
          </div>
        </div>

        <div className="row pt-3 align-items-center text-muted small">
          <div className="col-md-4 text-center text-md-start">
            &copy; 2025 LinguaLab. All rights reserved.
          </div>
          <div className="col-md-4 text-center text-md-end mt-2 mt-md-0">
            <i className="bi bi-credit-card-2-front fs-5 me-2" title="Visa"></i>
            <i className="bi bi-credit-card fs-5" title="Mastercard"></i>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer