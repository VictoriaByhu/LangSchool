import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const levels = [
  { 
    id: 'elementary', 
    title: 'Elementary', 
    code: 'A1-A2', 
    desc: 'Основи граматики та базова лексика для повсякденного спілкування.',
    color: 'border-success',
    icon: 'bi-mortarboard'
  },
  { 
    id: 'intermediate', 
    title: 'Intermediate', 
    code: 'B1-B2', 
    desc: 'Впевнене спілкування, розширена граматика та фразові дієслова.',
    color: 'border-primary',
    icon: 'bi-lightning-charge'
  },
  { 
    id: 'upper-intermediate', 
    title: 'Upper-Intermediate', 
    code: 'B2-C1', 
    desc: 'Вільне володіння мовою, ідіоми та підготовка до складних дискусій.',
    color: 'border-warning',
    icon: 'bi-gem'
  }
];

function SelfStudyCatalog() {
  const { currentUser } = useAuth();

  // Якщо випадково зайшли без логіну
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Self-study English Courses</h2>
          <p className="text-muted">Оберіть свій рівень та навчайтеся у власному темпі</p>
        </div>

        <div className="row g-4 justify-content-center">
          {levels.map(level => (
            <div key={level.id} className="col-md-4">
              <div className={`card h-100 border-0 border-top border-4 ${level.color} shadow-sm p-4 rounded-4 transition-card`}>
                <div className="d-flex align-items-center mb-3">
                  <div className={`icon-shape bg-light p-3 rounded-3 me-3`}>
                    <i className={`bi ${level.icon} fs-3`}></i>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-0">{level.title}</h4>
                    <span className="badge bg-light text-dark border small">{level.code}</span>
                  </div>
                </div>
                <p className="text-muted small flex-grow-1">{level.desc}</p>
                <Link to={`/self-study/${level.id}`} className="btn btn-outline-dark w-100 rounded-pill fw-bold mt-3">
                  Перейти до тем
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Секція мотивації */}
        <div className="mt-5 p-4 bg-white rounded-4 shadow-sm border-start border-accent border-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-info-circle fs-3 me-3 text-accent"></i>
            <div>
              <h6 className="fw-bold mb-1">Порада від LinguaLab</h6>
              <p className="mb-0 small text-muted">Ми рекомендуємо проходити по 1 темі на день для найкращого засвоєння матеріалу.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SelfStudyCatalog;