import { useState } from 'react';

const PhrasebookStep = ({ phrases }) => {
  const [showTranslations, setShowTranslations] = useState(true);

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4 animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0">Корисні фрази</h5>
        <button 
          className="btn btn-outline-success btn-sm rounded-pill"
          onClick={() => setShowTranslations(!showTranslations)}
        >
          {showTranslations ? "Приховати переклад" : "Показати переклад"}
        </button>
      </div>

      <div className="list-group list-group-flush">
        {phrases.map((p, i) => (
          <div key={i} className="list-group-item d-flex align-items-center py-3 border-light">
            <div className="me-3">
              <button className="btn btn-light btn-sm rounded-circle text-success">
                <i className="bi bi-play-fill"></i>
              </button>
            </div>
            <div className="flex-grow-1">
              <div className="fw-bold fs-5 text-primary">{p.phrase}</div>
              {showTranslations && (
                <div className="text-muted small animate__animated animate__fadeIn">
                  {p.translation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-light rounded-3 text-center">
        <small className="text-muted italic">Порада: Прослухайте та повторіть кожну фразу вголос 3 рази.</small>
      </div>
    </div>
  );
};

export default PhrasebookStep;