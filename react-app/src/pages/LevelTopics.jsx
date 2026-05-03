import { useParams, Link } from 'react-router-dom';
import { lessons } from '../data/lessons';
import ProgressCircle from '../components/ProgressCircle'; // Імпортуємо наш новий компонент

function LevelTopics() {
  const { level } = useParams();

  // Додаємо захист: якщо рівня не існує, topics буде порожнім масивом
  const topics = lessons && level ? (lessons[level] || []) : [];
  
  // Отримуємо об'єкт прогресу з localStorage
  const userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');

  const levelTitles = {
    'elementary': 'Elementary (A1-A2)',
    'intermediate': 'Intermediate (B1-B2)',
    'upper-intermediate': 'Upper-Intermediate (B2-C1)'
  };

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/self-study" className="text-decoration-none">Усі рівні</Link>
            </li>
            <li className="breadcrumb-item active">
              {levelTitles[level] || level}
            </li>
          </ol>
        </nav>

        <div className="text-center mb-5">
          <h2 className="fw-bold">Програма навчання: {levelTitles[level] || level}</h2>
          <p className="text-muted">Проходьте уроки послідовно, щоб досягти найкращого результату</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {topics.length > 0 ? (
                topics.map((topic, index) => {
                  // Витягуємо прогрес для конкретного уроку (якщо немає - 0%)
                  const progressPercentage = userProgress[topic.id] ? userProgress[topic.id].score : 0;

                  return (
                    <Link 
                      key={topic.id} 
                      to={`/self-study/${level}/${topic.id}`} 
                      className="text-decoration-none"
                    >
                      <div className="card border-0 shadow-sm p-4 rounded-4 hover-lift transition-all">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-4">
                            {/* ВИКОРИСТОВУЄМО ШКАЛУ ПРОГРЕСУ ЗАМІСТЬ СТАТИЧНОГО КРУЖЕЧКА */}
                            <ProgressCircle 
                              percentage={progressPercentage} 
                              number={index + 1} 
                            />
                          </div>
                          <div className="flex-grow-1">
                            <h5 className="fw-bold mb-1 text-dark">{topic.title}</h5>
                            <div className="d-flex gap-3 small text-muted">
                              <span>
                                <i className="bi bi-book me-1"></i> 
                                {topic.vocabulary?.length || 0} слів
                              </span>
                              <span>
                                <i className="bi bi-clock me-1"></i> ~15 хв
                              </span>
                              {progressPercentage === 100 && (
                                <span className="text-success fw-bold">
                                  <i className="bi bi-check-all"></i> Пройдено
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="ms-auto text-success">
                            <i className="bi bi-chevron-right fs-4"></i>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="text-center py-5 card border-0 shadow-sm rounded-4">
                  <i className="bi bi-cone-striped fs-1 text-warning mb-3"></i>
                  <h5>Цей рівень ще в розробці</h5>
                  <p className="text-muted">Ми саме додаємо нові уроки. Спробуйте Elementary!</p>
                  <Link to="/self-study" className="btn btn-outline-primary rounded-pill">До списку рівнів</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LevelTopics;