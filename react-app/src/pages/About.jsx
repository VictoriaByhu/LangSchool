import { useState } from 'react'
import { Link } from 'react-router-dom'

const teachers = [
  {
    id: 1,
    name: 'Анна К.',
    flag: '🇺🇦',
    badges: ['Professional', 'Super Tutor'],
    teaches: 'Англійська (Native), Німецька (B2)',
    students: '23 активних • 1,270 уроків',
    bio: 'Сертифікований викладач CELTA з 8-річним досвідом. Спеціалізуюсь на розмовній англійській та підготовці до IELTS.',
    rating: '5.0',
    reviews: 15,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Майкл Д.',
    flag: '🇬🇧',
    badges: ['Native Speaker'],
    teaches: 'Англійська (Native)',
    students: '45 активних • 3,400 уроків',
    bio: 'Привіт! Я з Лондона. Допоможу вам подолати мовний бар\'єр та заговорити як носій. Бізнес-англійська та IT-англійська.',
    rating: '4.9',
    reviews: 52,
    photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Карлос Р.',
    flag: '🇪🇸',
    badges: ['DELE Examiner', 'Super Tutor'],
    teaches: 'Іспанська (Native), Англійська (C1)',
    students: '38 активних • 2,100 уроків',
    bio: '¡Hola! Я носій іспанської з Мадрида. Готую до екзаменів DELE всіх рівнів.',
    rating: '5.0',
    reviews: 42,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'Сара Л.',
    flag: '🇺🇸',
    badges: ['Kids Expert', 'TEFL Certified'],
    teaches: 'Англійська (Native)',
    students: '15 активних • 950 уроків',
    bio: 'Спеціалізуюсь на навчанні дітей та підлітків. Використовую ігрові методики та мультфільми.',
    rating: '4.9',
    reviews: 28,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
  }
]

const courses = {
  en: [
    { title: 'Англійська (A1-B2)', desc: 'Комплексні програми для всіх рівнів.' },
    { title: 'Розмовний клуб', desc: 'Практика в невеликих групах з носієм мови.' },
    { title: 'Підготовка до IELTS', desc: 'Спеціалізований курс з практикою всіх аспектів.' }
  ],
  es: [
    { title: 'Іспанська (A1-B2)', desc: 'Від простих вітань до складних розмов.' },
    { title: 'Розмовний клуб', desc: 'Практика навичок у невимушеній атмосфері.' }
  ],
  de: [
    { title: 'Німецька (A1-B2)', desc: 'Від базової граматики до просунутої дискусії.' },
    { title: 'Розмовний клуб', desc: 'Практика мовлення у реальних сценаріях.' }
  ]
}

function About() {
  const [activeTab, setActiveTab] = useState('en')

  return (
    <main className="main-content">

      {/* Про нас */}
      <section className="container py-5">
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold">Про LinguaLab</h1>
            <p className="lead">LinguaLab – це школа із сучасними методами: акцент на розмовній практиці та індивідуальний підхід.</p>
            <p>Ми використовуємо ігрові підходи, рольові вправи та багато розмов з першого уроку.</p>
          </div>
          <div className="col-lg-5 offset-lg-1 mt-4 mt-lg-0">
            <div className="card p-4 shadow-sm mb-3">
              <h5 className="card-title">Швидкий тест рівня ⚡</h5>
              <p className="card-text">Дізнайтеся свій початковий рівень за 10 хвилин.</p>
              <Link to="/leveltest" className="btn btn-accent w-100">Розпочати тест</Link>
            </div>
            <div className="accordion accordion-flush mt-4" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#faq1">
                    Як проходять заняття? 📚
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">Заняття проводяться в невеликих групах (до 6 осіб). Ми використовуємо комунікативний підхід.</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse" data-bs-target="#faq2">
                    Який розмір груп? 👥
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">Наші групи зазвичай складаються з 4-6 студентів.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Місія */}
      <section className="py-5" style={{ backgroundColor: 'var(--primary-color)' }}>
        <div className="container text-center">
          <h2 className="display-6 fw-bold mb-4 text-white">Наша місія 💼</h2>
          <p className="lead col-lg-8 mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
            У LinguaLab наша місія — надати людям можливість впевнено спілкуватися між культурами.
          </p>
        </div>
      </section>

      {/* Чому LinguaLab */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold">Чому варто обрати LinguaLab?</h2>
          <p className="lead">Ми пропонуємо неперевершений досвід навчання.</p>
        </div>
        <div className="row g-4 text-center">
          {[
            { icon: 'bi-person-fill', title: 'Досвідчені інструктори', text: 'Сертифіковані викладачі з міжнародним досвідом.' },
            { icon: 'bi-chat-dots-fill', title: 'Зосередьтеся на розмові', text: 'Акцент на реальному спілкуванні з першого дня.' },
            { icon: 'bi-laptop-fill', title: 'Гнучке навчання', text: 'Онлайн та офлайн, індивідуальні чи групові заняття.' }
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div className="icon-box p-4 border rounded-3 h-100">
                <div className="icon-circle bg-accent text-white mb-3 mx-auto">
                  <i className={`bi ${item.icon}`} style={{ fontSize: '2rem' }}></i>
                </div>
                <h3 className="h5 fw-bold">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Викладачі */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold">Наші викладачі</h2>
            <p className="lead text-muted">Професіонали, закохані у свою справу</p>
          </div>
          <div className="row g-4">
            {teachers.map(teacher => (
              <div className="col-12" key={teacher.id}>
                <div className="card teacher-card p-3 border-0 shadow-sm">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-3 text-center mb-3 mb-md-0">
                      <div className="teacher-img-wrapper mx-auto">
                        <img src={teacher.photo} alt={teacher.name}
                          className="img-fluid rounded-3 object-fit-cover" />
                      </div>
                    </div>
                    <div className="col-md-6 px-md-4 mb-3 mb-md-0 border-end-md">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <h4 className="fw-bold mb-0">{teacher.name}</h4>
                        <span className="fs-4">{teacher.flag}</span>
                        <i className="bi bi-patch-check-fill text-primary"></i>
                      </div>
                      <div className="mb-3">
                        {teacher.badges.map((b, i) => (
                          <span key={i} className="badge bg-purple-light text-purple me-1">{b}</span>
                        ))}
                      </div>
                      <p className="text-muted small mb-3">
                        <i className="bi bi-translate me-1"></i> Викладає: <strong>{teacher.teaches}</strong><br />
                        <i className="bi bi-people me-1"></i> Студентів: <strong>{teacher.students}</strong>
                      </p>
                      <p className="mb-0">{teacher.bio}</p>
                    </div>
                    <div className="col-md-3 text-center d-flex flex-column justify-content-center px-md-3">
                      <div className="mb-4">
                        <div className="fs-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                          <i className="bi bi-star-fill text-warning"></i> {teacher.rating}
                        </div>
                        <div className="text-muted small">{teacher.reviews} відгуків</div>
                      </div>
                      <div className="d-grid gap-2">
                        <Link to="/schedule" className="btn btn-accent">Забронювати урок</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Курси */}
      <section id="courses" className="py-5">
        <div className="container">
          <h2 className="mb-2">Наші курси</h2>
          <p className="mb-4">Ми пропонуємо курси для різних рівнів та вікових груп.</p>
          <ul className="nav nav-tabs">
            {[['en', 'Англійська'], ['es', 'Іспанська'], ['de', 'Німецька']].map(([key, label]) => (
              <li className="nav-item" key={key}>
                <button
                  className={`nav-link ${activeTab === key ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >{label}</button>
              </li>
            ))}
          </ul>
          <div className="row gy-3 mt-3">
            {courses[activeTab].map((course, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <div className="card h-100 course-card">
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.desc}</p>
                    <Link to="/prices" className="stretched-link text-decoration-none">Деталі курсу</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-5 text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
        <div className="container">
          <div className="row g-4 text-center">
            {[['5+', 'Років досвіду'], ['1200+', 'Випускників'], ['30+', 'Викладачів'], ['98%', 'Позитивних відгуків']].map(([num, label]) => (
              <div className="col-md-3 col-6" key={label}>
                <div className="display-4 fw-bold text-accent">{num}</div>
                <p className="mb-0 fs-5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 text-center bg-accent">
        <div className="container">
          <h2 className="display-6 fw-bold mb-3">Готові почати навчання?</h2>
          <p className="lead mb-4">Приєднуйтесь до LinguaLab сьогодні!</p>
          <Link to="/register" className="btn btn-lg btn-accent">Зареєструйтесь зараз!</Link>
        </div>
      </section>

    </main>
  )
}

export default About