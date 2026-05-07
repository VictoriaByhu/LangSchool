import { useState } from 'react'
import { Link } from 'react-router-dom'

const tests = {
  en: {
    label: 'Англійська',
    questions: [
      { q: '1. ___ are you from?', options: ['What', 'Where', 'Who'], answer: 1 },
      { q: '2. She ___ TV every evening.', options: ['watch', 'watches', 'watching'], answer: 1 },
      { q: '3. Did you ___ the new film last night?', options: ['see', 'saw', 'seen'], answer: 0 },
      { q: '4. I haven\'t finished my homework ___.', options: ['already', 'still', 'yet'], answer: 2 },
      { q: '5. You ___ smoke in here. It\'s forbidden.', options: ['don\'t have to', 'mustn\'t', 'needn\'t'], answer: 1 },
      { q: '6. If I had known you were coming, I ___ a cake.', options: ['would bake', 'baked', 'would have baked'], answer: 2 },
      { q: '7. He can\'t ___ living in such a noisy city.', options: ['used to', 'get used to', 'be used to'], answer: 1 },
      { q: '8. By the time the police arrived, the thief ___.', options: ['had disappeared', 'disappeared', 'was disappearing'], answer: 0 },
      { q: '9. Not only ___ sing, but she also plays the piano.', options: ['she can', 'can she', 'she could'], answer: 1 },
      { q: '10. I wish I ___ more time to travel.', options: ['have', 'had', 'will have'], answer: 1 },
    ]
  }
}

function getLevel(score) {
  if (score <= 3) return { level: 'A1-A2 (Початковий)', desc: 'Вам ідеально підійдуть наші курси для початківців.' }
  if (score <= 6) return { level: 'B1 (Середній)', desc: 'Курси B1 допоможуть вам вийти на новий рівень.' }
  if (score <= 8) return { level: 'B2 (Вище середнього)', desc: 'Вам чудово підійдуть наші розмовні клуби.' }
  return { level: 'C1 (Просунутий)', desc: 'Наші курси для просунутих допоможуть відшліфувати знання.' }
}

function LevelTest() {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const currentTest = tests.en

  const handleAnswer = (qIndex, optionIndex) => {
    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }))
    setResult(null)
  }

  const handleCheck = () => {
    let score = 0
    currentTest.questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++
    })
    setResult({ score, total: currentTest.questions.length, ...getLevel(score) })
  }

  const handleReset = () => {
    setAnswers({})
    setResult(null)
  }

  return (
    <main className="main-content">
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-5 fw-bold mb-3 text-center">Тест на визначення рівня ✅</h1>
              <p className="lead text-center mb-5">
                Перевірте свій рівень англійської. Питання поступово ускладнюються.
              </p>

              {/* Питання */}
              {currentTest.questions.map((q, i) => (
                <div className="card card-body mb-3" key={i}>
                  <p className="fw-bold mb-3">{q.q}</p>
                  {q.options.map((opt, j) => (
                    <div className="form-check" key={j}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`en-${i}`}
                        id={`en-${i}-${j}`}
                        checked={answers[i] === j}
                        onChange={() => handleAnswer(i, j)}
                      />
                      <label className="form-check-label" htmlFor={`en-${i}-${j}`}>
                        {String.fromCharCode(97 + j)}) {opt}
                      </label>
                    </div>
                  ))}
                </div>
              ))}

              {/* Кнопка перевірити */}
              {!result && (
                <button className="btn btn-accent w-100 mt-2" onClick={handleCheck}>
                  Перевірити результат
                </button>
              )}

              {/* Результат */}
              {result && (
                <div className="card card-body mt-4 text-center">
                  <h3 className="h4 mb-2">Ваш результат: {result.score} з {result.total}</h3>
                  <p className="lead mb-1">Ваш приблизний рівень: <strong>{result.level}</strong></p>
                  <p className="text-muted mb-4">{result.desc}</p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Link to="/register" className="btn btn-accent">Записатися на консультацію</Link>
                    <button className="btn btn-outline-secondary" onClick={handleReset}>Пройти ще раз</button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LevelTest
