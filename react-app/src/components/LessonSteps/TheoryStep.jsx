const TheoryStep = ({ theoryData }) => {
  return (
    <div className="theory-container">
      {theoryData.map((block, idx) => (
        <div key={idx} className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="bg-success p-3 text-white d-flex align-items-center">
            <i className="bi bi-star-fill me-2"></i>
            <h5 className="m-0 fw-bold">{block.title}</h5>
          </div>
          <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
            {block.type === 'grid' && (
              <div className="row row-cols-3 row-cols-md-5 g-2">
                {block.content.map((item, i) => (
                  <div key={i} className="col text-center p-2 border rounded bg-white small">
                    <span className="fw-bold text-success">{item.l}</span> <span className="text-muted">{item.t}</span>
                  </div>
                ))}
              </div>
            )}
            {block.type === 'list' && (
              <ul className="list-group list-group-flush">
                {block.content.map((text, i) => (
                  <li key={i} className="list-group-item bg-transparent border-0 ps-0">
                    <i className="bi bi-check2-circle text-success me-2"></i> {text}
                  </li>
                ))}
              </ul>
            )}
            {block.info && <p className="mt-3 small text-muted italic border-top pt-2">{block.info}</p>}
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
         <button className="btn btn-primary btn-lg rounded-pill px-5">ПЕРЕЙТИ ДО ПРАКТИКИ</button>
      </div>
    </div>
  );
};

export default TheoryStep;