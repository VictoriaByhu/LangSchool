import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../services/firebase'
import carousel1 from '../assets/images/carousel/1.png'
import carousel2 from '../assets/images/carousel/2.png'
import carousel3 from '../assets/images/carousel/3.png'

function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    telegram: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'trial_requests'), {
        ...formData,
        language: 'en',
        status: 'new',
        createdAt: serverTimestamp()
      })
      setSubmitted(true)
      setFormData({ name: '', phone: '', telegram: '' })
    } catch (error) {
      console.error('Помилка:', error)
    }
}
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <main className="main-content">

      {/* Hero секція */}
      <section className="hero py-5" id="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5">Вивчайте англійську легко з LinguaLab</h1>
              <p className="lead">Індивідуальні та групові заняття онлайн. Англійська для початківців, впевненого спілкування, роботи та підготовки до IELTS.</p>
              <p>
                <Link className="btn btn-lg btn-primary me-2" to="/about">Наші курси</Link>
                <Link className="btn btn-outline-secondary btn-lg" to="/prices">Дізнайтеся ціни</Link>
              </p>
              <ul className="list-unstyled mt-4 d-flex gap-3">
                <li className="d-flex align-items-center"><span className="badge bg-success me-2">Онлайн</span> Заняття зручні з будь-якого місця</li>
                <li className="d-flex align-items-center"><span className="badge bg-info me-2">У групах</span> До 6 осіб для практики розмовної англійської</li>
              </ul>
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">
              <div id="heroCarousel" className="carousel slide rounded-3" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={carousel1} className="d-block w-100" alt="Online class" />
                  </div>
                  <div className="carousel-item">
                    <img src={carousel2} className="d-block w-100" alt="Online class" />
                  </div>
                  <div className="carousel-item">
                    <img src={carousel3} className="d-block w-100" alt="Teacher" />
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Англійська */}
      <section className="container py-5 mt-5">
        <div className="row text-center mb-4">
          <div className="col-12">
            <h2 className="display-6 fw-bold">Оберіть свій напрям англійської</h2>
            <p className="lead">Від першого уроку до впевненої розмови, IELTS та бізнес-комунікації.</p>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 featured-course-card">
              <div className="card-body">
                <h3 className="card-title">Англійська</h3>
                <p className="card-text">Повні курси (A1-B2), розмовні клуби та спеціалізована підготовка до IELTS.</p>
                <Link to="/about" className="stretched-link text-decoration-none">Дізнатися більше</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 featured-course-card">
              <div className="card-body">
                <h3 className="card-title">Розмовна англійська</h3>
                <p className="card-text">Практика живих діалогів, вимови та впевненості у спілкуванні з викладачем і групою.</p>
                <Link to="/about" className="stretched-link text-decoration-none">Дізнатися більше</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card h-100 featured-course-card">
              <div className="card-body">
                <h3 className="card-title">Business English</h3>
                <p className="card-text">Англійська для роботи, презентацій, листування, співбесід та міжнародних команд.</p>
                <Link to="/about" className="stretched-link text-decoration-none">Дізнатися більше</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Форма запису на пробний урок */}
      <section className="py-5 position-relative overflow-hidden" style={{ backgroundColor: 'var(--primary-color)' }}>
        <div className="container">
          <div className="row align-items-center justify-content-between gy-5">
            <div className="col-lg-6 text-white">
              <h2 className="display-5 fw-bold mb-4" style={{ color: 'var(--body-bg)' }}>
                Запис на пробний онлайн-урок 📘
              </h2>
              <p className="fs-5 opacity-75 mb-0">
                ✅ 50 хвилин з методистом LinguaLab по відеозв'язку
              </p>
            </div>
            <div className="col-lg-5">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-lg">
                {submitted ? (
                  <div className="text-center py-4">
                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                    <h4 className="mt-3">Заявку прийнято!</h4>
                    <p className="text-muted">Ми зв'яжемось з вами найближчим часом.</p>
                    <button className="btn btn-outline-secondary" onClick={() => setSubmitted(false)}>
                      Надіслати ще раз
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Прізвище та ім'я"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required />
                    </div>
                    <div className="mb-3">
                      <input type="tel" className="form-control" placeholder="Номер телефону"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required />
                    </div>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Телеграм-нікнейм"
                        value={formData.telegram}
                        onChange={(e) => setFormData({ ...formData, telegram: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-danger w-100 fw-bold py-3 rounded-3 mb-3">
                      Записатись зараз
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home
