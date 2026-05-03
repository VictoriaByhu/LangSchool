import { Link } from 'react-router-dom'

const reviews = [
  {
    id: 1,
    stars: 5,
    text: 'Розмовний клуб був неймовірним! Я нарешті подолала свій страх розмови. Викладач-носій мови був фантастичним.',
    author: 'Діана В.',
    course: 'Клуб розмовної англійської мови'
  },
  {
    id: 2,
    stars: 5,
    text: 'Я пройшов курс німецької мови A1 як повний новачок. Структура була зрозумілою, а викладач був дуже терплячим. Дуже рекомендую!',
    author: 'Мар\'ян Т.',
    course: 'Німецька мова - Початковий (A1)'
  },
  {
    id: 3,
    stars: 4,
    text: 'Чудовий підготовчий курс до IELTS. Він був дуже інтенсивним, але мій бал значно покращився. Практика з визначенням часу була неймовірно корисною.',
    author: 'Олена К.',
    course: 'Підготовка до IELTS'
  },
  {
    id: 4,
    stars: 5,
    text: 'Курс іспанської мови для рівня А1 був ідеальним. Викладач був захопливим і зробив вивчення граматики цікавим. Я записуюся на рівень А2!',
    author: 'Павло Б.',
    course: 'Іспанська - Початковий (A1)'
  },
  {
    id: 5,
    stars: 5,
    text: 'Я нервувала через розмову німецькою, але Розмовний клуб — це дуже підтримуюче та веселе середовище. Це справді працює.',
    author: 'Марія Л.',
    course: 'Клуб німецької розмови'
  },
  {
    id: 6,
    stars: 4,
    text: 'Дуже солідна школа. Гарні матеріали, професійні викладачі та гнучкий графік. Я навчаюся онлайн, і це дуже зручно.',
    author: 'Катерина Ф.',
    course: 'Англійська - Середній рівень (B1)'
  }
]

function StarRating({ count }) {
  return (
    <div className="star-rating mb-3">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= count ? '#FFC107' : '#ddd', fontSize: '1.2rem' }}>★</span>
      ))}
    </div>
  )
}

function Feedbacks() {
  return (
    <main className="main-content">
      <section className="py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold">Що кажуть наші студенти</h1>
            <p className="lead">Реальні історії від таких самих учнів, як ви.</p>
          </div>

          <div className="row g-4">
            {reviews.map(review => (
              <div className="col-lg-4 col-md-6" key={review.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <StarRating count={review.stars} />
                    <blockquote className="blockquote mb-0">
                      <p>"{review.text}"</p>
                      <footer className="blockquote-footer mt-2">
                        {review.author} <cite>{review.course}</cite>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA секція */}
          <section className="py-5 text-center bg-accent mt-5 rounded-4">
            <div className="container">
              <h2 className="display-6 fw-bold mb-3">Готові приєднатися до них?</h2>
              <p className="lead mb-4">Почніть свою власну історію успіху з LinguaLab вже сьогодні.</p>
              <Link to="/register" className="btn btn-lg btn-accent">Зареєструватися зараз</Link>
            </div>
          </section>

        </div>
      </section>
    </main>
  )
}

export default Feedbacks