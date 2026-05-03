const ProgressCircle = ({ percentage, number }) => {
  const radius = 20;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="position-relative d-inline-flex align-items-center justify-content-center">
      <svg height={radius * 2} width={radius * 2} style={{ transform: 'rotate(-90deg)' }}>
        {/* Фонове коло (сіре) */}
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Коло прогресу (зелене) */}
        <circle
          stroke="#198754"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease' }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />
      </svg>
      {/* Номер уроку по центру */}
      <div className="position-absolute fw-bold" style={{ fontSize: '0.9rem' }}>
        {number}
      </div>
    </div>
  );
};

export default ProgressCircle;