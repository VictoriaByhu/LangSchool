import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    id: 'one',
    icon: 'bi-patch-question-fill',
    question: 'Як визначити свій рівень мови?',
    answer: 'Ми розробили спеціальний онлайн-тест, який займає всього 10 хвилин. Він перевіряє граматику та словниковий запас.',
    link: { to: '/leveltest', text: 'Пройти тест можна тут' },
    open: true
  },
  {
    id: 'two',
    icon: 'bi-camera-video-fill',
    question: 'Як проходять онлайн-заняття?',
    answer: 'Заняття проходять на платформі Zoom. Ми використовуємо інтерактивні дошки, відеоматеріали та ігрові елементи. Всі матеріали уроку доступні в особистому кабінеті 24/7.'
  },
  {
    id: 'three',
    icon: 'bi-camera-reels-fill',
    question: 'Що робити, якщо я пропустив заняття?',
    answer: 'Не хвилюйтеся. Всі наші онлайн-уроки записуються. Відеозапис та всі матеріали з\'являються у вашому кабінеті протягом 2 годин після заняття.'
  },
  {
    id: 'four',
    icon: 'bi-journal-check',
    question: 'Чи потрібно купувати підручники додатково?',
    answer: 'Ні, ніяких додаткових витрат. Всі навчальні матеріали (цифрові підручники, робочі зошити, аудіо та відео) включені у вартість курсу.'
  },
  {
    id: 'five',
    icon: 'bi-arrow-left-right',
    question: 'Що робити, якщо група мені не підходить за рівнем?',
    answer: 'Якщо після першого заняття ви відчуєте, що програма занадто легка або заскладна — повідомте адміністратора. Ми безкоштовно переведемо вас в іншу групу.'
  },
  {
    id: 'six',
    icon: 'bi-cash-coin',
    question: 'Чи можна повернути кошти, якщо курс не підійде?',
    answer: 'Звичайно. У вас є "пробний період" — перші 2 заняття. Якщо протягом цього часу ви вирішите, що формат вам не підходить, ми повернемо 100% сплаченої суми.'
  },
  {
    id: 'seven',
    icon: 'bi-people-fill',
    question: 'Скільки людей у групі?',
    answer: 'Ми формуємо лише міні-групи. Стандартна група — це 4-6 студентів. Це оптимальна кількість, щоб кожен встиг висловитися.'
  }
]

function FAQ() {
  const [openId, setOpenId] = useState('one')
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showCallModal, setShowCallModal] = useState(false)

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  return (
    <main className="main-content">

      {/* Заголовок */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h1 className="display-5 fw-bold mb-3">Часті запитання</h1>
          <p className="lead text-muted col-lg-8 mx-auto">
            Ми зібрали відповіді на найпопулярніші запитання про навчання в LinguaLab.
          </p>
        </div>
      </section>

      {/* Акордеон */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              <div className="accordion custom-accordion" id="faqAccordion">
                {faqs.map(faq => (
                  <div className="accordion-item mb-3 shadow-sm border-0 rounded-3 overflow-hidden" key={faq.id}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${openId === faq.id ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                      >
                        <i className={`bi ${faq.icon} me-3 text-accent`}></i>
                        {faq.question}
                      </button>
                    </h2>
                    {openId === faq.id && (
                      <div className="accordion-collapse">
                        <div className="accordion-body">
                          {faq.answer}
                          {faq.link && (
                            <> <Link to={faq.link.to}>{faq.link.text}</Link>.</>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center mt-5 pt-4">
                <h3 className="fw-bold mb-3" style={{ color: 'var(--primary-color)' }}>Залишились запитання?</h3>
                <p className="lead text-muted mb-4 col-lg-6 mx-auto">
                  Якщо ви не знайшли відповідь вище, наша команда підтримки радо допоможе вам.
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <button
                    className="btn btn-outline-purple px-4 py-2"
                    onClick={() => setShowEmailModal(true)}
                  >
                    <i className="bi bi-envelope me-2"></i> Написати email
                  </button>
                  <button
                    className="btn btn-accent text-white px-4 py-2"
                    style={{ backgroundColor: '#8A57F5', border: 'none' }}
                    onClick={() => setShowCallModal(true)}
                  >
                    <i className="bi bi-telephone me-2"></i> Замовити дзвінок
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Модалка email */}
      {showEmailModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Напишіть нам</h5>
                <button className="btn-close" onClick={() => setShowEmailModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <p className="text-muted small mb-4">Ми відповімо на вашу пошту протягом робочого дня.</p>
                <form onSubmit={(e) => { e.preventDefault(); setShowEmailModal(false) }}>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Ваш Email" required />
                  </div>
                  <div className="mb-3">
                    <textarea className="form-control" rows="4" placeholder="Ваше запитання..."></textarea>
                  </div>
                  <button type="submit" className="btn btn-outline-purple w-100 fw-bold">Надіслати лист</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модалка дзвінок */}
      {showCallModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 pb-0" style={{ backgroundColor: '#8A57F5' }}>
                <h5 className="modal-title fw-bold text-white">Ми зателефонуємо!</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowCallModal(false)}></button>
              </div>
              <div className="modal-body p-4 pt-3">
                <p className="text-muted small mb-3 mt-2">Залиште номер, і менеджер зв'яжеться з вами за 5 хвилин.</p>
                <form onSubmit={(e) => { e.preventDefault(); setShowCallModal(false) }}>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Як до вас звертатись?" />
                  </div>
                  <div className="mb-4">
                    <input type="tel" className="form-control" placeholder="+380 XX XXX XX XX" required />
                  </div>
                  <button type="submit" className="btn w-100 fw-bold text-white" style={{ backgroundColor: '#8A57F5' }}>
                    Чекаю дзвінка
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  )
}

export default FAQ