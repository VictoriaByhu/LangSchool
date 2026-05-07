import { Link } from 'react-router-dom'

const packages = [
  { lessons: 8, price: '4 000', perLesson: '500', desc: 'Щомісячна оплата для регулярного старту' },
  { lessons: 24, price: '10 800', perLesson: '450', desc: 'Пакет на 3 місяці для стабільного прогресу', popular: true },
  { lessons: 48, price: '20 400', perLesson: '425', desc: 'Пакет на 6 місяців для довгострокового результату' }
]

function Prices() {
  return (
    <main className="main-content">
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">Обери свій пакет занять</h1>
            <p className="lead">Почни свій шлях до вільної англійської вже сьогодні</p>
          </div>

          <div className="row g-5">

            {/* Сайдбар */}
            <aside className="col-lg-4">
              <div className="card p-4 position-sticky" style={{ top: '8rem' }}>
                <h3 className="h4">Що включено у вартість?</h3>
                <p className="text-muted">Кожен наш пакет включає повний набір для успішного навчання</p>
                <ul className="list-unstyled d-flex flex-column gap-3 mt-3 value-prop-list">
                  {[
                    { icon: 'bi-person-check-fill', title: 'Сертифіковані викладачі', desc: 'Наші викладачі мають дипломи CELTA/TEFL' },
                    { icon: 'bi-people-fill', title: 'Маленькі групи (до 6)', desc: 'Гарантована увага та максимум практики' },
                    { icon: 'bi-book-half', title: 'Онлайн-матеріали', desc: 'Доступ до навчальних матеріалів 24/7' },
                    { icon: 'bi-chat-dots-fill', title: 'Speaking clubs', desc: 'Безкоштовні клуби для практики англійської' }
                  ].map((item, i) => (
                    <li key={i}>
                      <i className={`bi ${item.icon}`}></i>
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Пакети */}
            <div className="col-lg-8">
              <div className="pt-4">
                <div className="d-flex flex-column gap-3">
                  {packages.map((pkg) => (
                    <label
                      key={pkg.lessons}
                      className={`pricing-card-radio ${pkg.popular ? 'popular' : ''}`}
                    >
                      {pkg.popular && <div className="badge-popular">Популярна пропозиція</div>}
                      <div className="card-body">
                        <input
                          type="radio"
                          name="english-package"
                          className="form-check-input"
                          defaultChecked={pkg.popular}
                        />
                        <div className="flex-grow-1">
                          <div className="row align-items-center">
                            <div className="col-md-7">
                              <h5 className="card-title">{pkg.lessons} занять</h5>
                              <p className="text-muted mb-0">{pkg.desc}</p>
                            </div>
                            <div className="col-md-5 text-md-end">
                              <div className="h3 price-tag">{pkg.price} <small>грн</small></div>
                              <p className="text-muted mb-0">{pkg.perLesson} грн/урок</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <Link to="/register" className="btn btn-accent w-100 btn-lg mt-4">
                  Почати навчання англійської
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Що включено */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold">Все необхідне для прогресу</h2>
            <p className="lead text-muted">Ви платите лише за уроки — решту ми даємо безкоштовно</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 text-center">
                <div className="icon-circle-soft mx-auto mb-3">
                  <i className="bi bi-laptop fs-2" style={{ color: 'var(--accent-color)' }}></i>
                </div>
                <h4 className="fw-bold mb-3">100% Онлайн</h4>
                <p className="text-muted mb-0">Всі заняття проходять через <strong>Zoom</strong>. Вам не потрібно купувати підручники — всі матеріали вже в особистому кабінеті.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow rounded-4 p-4 position-relative overflow-hidden" style={{ backgroundColor: '#FDF9FF', border: '2px solid var(--accent-color)' }}>
                <div className="position-absolute top-0 end-0 bg-warning text-dark fw-bold px-3 py-1 rounded-bottom-start-3 small">
                  🎁 Подарунок
                </div>
                <div className="text-center mb-3">
                  <div className="icon-circle-soft mx-auto mb-3">
                    <i className="bi bi-chat-quote-fill fs-2" style={{ color: 'var(--accent-color)' }}></i>
                  </div>
                  <h4 className="fw-bold">Speaking clubs</h4>
                  <p className="text-muted small">Безлімітний доступ до групових зустрічей з носіями англійської.</p>
                </div>
                <div className="bg-white rounded-3 p-3 shadow-sm">
                  {[['8 занять', '+1 місяць'], ['24 заняття', '+3 місяці'], ['48 занять', '+6 місяців']].map(([pkg, bonus]) => (
                    <div key={pkg} className="d-flex justify-content-between border-bottom pb-2 mb-2">
                      <span className="fw-bold small text-muted">Пакет {pkg}</span>
                      <span className="fw-bold text-success">{bonus}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 text-center">
                <div className="icon-circle-soft mx-auto mb-3">
                  <i className="bi bi-patch-check fs-2" style={{ color: 'var(--accent-color)' }}></i>
                </div>
                <h4 className="fw-bold mb-3">Результат та Сертифікат</h4>
                <p className="text-muted mb-0">Після завершення рівня ви проходите фінальний тест та отримуєте <strong>офіційний сертифікат</strong> школи LinguaLab.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Prices
