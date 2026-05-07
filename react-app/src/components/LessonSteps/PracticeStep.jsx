import { useMemo, useState } from 'react';
import { readUserProgress, writeUserProgress } from '../../utils/progressStorage';

const shuffle = (items) => [...items].sort(() => 0.5 - Math.random());

const renderInputQuestion = (task, shouldShowAnswer) => {
  const question = task?.question || '';
  const answer = task?.answer || '';

  if (!shouldShowAnswer || !answer) return question;

  const blankMatch = question.match(/_{2,}/);
  if (!blankMatch) {
    return (
      <>
        {question}{' '}
        <span className="text-success">{answer}</span>
      </>
    );
  }

  const beforeBlank = question.slice(0, blankMatch.index);
  const afterBlank = question.slice(blankMatch.index + blankMatch[0].length);

  return (
    <>
      {beforeBlank}
      <span className="text-success">{answer}</span>
      {afterBlank}
    </>
  );
};

const PracticeStep = ({ practiceData = [], lessonId }) => {
  const safePracticeData = useMemo(
    () => shuffle(Array.isArray(practiceData) ? practiceData : []),
    [practiceData]
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [constructorAnswers, setConstructorAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentTask = safePracticeData[currentIdx];

  const getExpectedConstructorAnswer = (task) => {
    if (!Array.isArray(task?.steps)) return '';
    return task.steps.map((step) => step.correct).join(' ');
  };

  const updatePracticeProgress = (index) => {
    const total = safePracticeData.length;
    if (total === 0) return;

    const percentage = 50 + Math.round(((index + 1) / total) * 50);
    const progress = readUserProgress();

    if (!progress[lessonId] || progress[lessonId].score < percentage) {
      progress[lessonId] = {
        ...progress[lessonId],
        score: percentage,
        status: percentage === 100 ? 'completed' : 'in-progress',
        date: new Date().toLocaleDateString()
      };
      writeUserProgress(progress);
    }
  };

  const checkAnswer = () => {
    if (!currentTask) return;

    if (currentTask.type === 'input') {
      const expected = currentTask.answer || '';

      if (userInput.trim().toLowerCase() === expected.toLowerCase()) {
        setIsCorrect(true);
        setIsError(false);
      } else {
        setIsError(true);
      }
      return;
    }

    if (currentTask.type === 'constructor') {
      const result = constructorAnswers.join(' ');
      const expected = getExpectedConstructorAnswer(currentTask);

      if (result === expected) {
        setIsCorrect(true);
        setIsError(false);
      } else {
        setIsError(true);
      }
    }
  };

  const handleNext = () => {
    updatePracticeProgress(currentIdx);

    if (currentIdx < safePracticeData.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setUserInput('');
      setConstructorAnswers([]);
      setIsCorrect(false);
      setIsError(false);
      return;
    }

    setIsFinished(true);
  };

  if (safePracticeData.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
        <h2 className="fw-bold">Практика ще готується</h2>
        <p className="text-muted mb-0">Для цього уроку поки немає вправ.</p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center animate__animated animate__zoomIn">
        <div className="display-1 mb-3">🏆</div>
        <h2 className="fw-bold">Урок завершено!</h2>
        <button onClick={() => window.location.href = '/self-study'} className="btn btn-success rounded-pill px-5 mt-4">ПОВЕРНУТИСЬ ДО ТЕМ</button>
      </div>
    );
  }

  const isInputTask = currentTask?.type === 'input';
  const expectedConstructorAnswer = getExpectedConstructorAnswer(currentTask);
  const expectedConstructorParts = Array.isArray(currentTask?.steps)
    ? currentTask.steps.map((step) => step.correct)
    : expectedConstructorAnswer.split(' ').filter(Boolean);
  const currentStep = Array.isArray(currentTask?.steps)
    ? currentTask.steps[constructorAnswers.length]
    : null;

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="badge bg-light text-muted small">Завдання {currentIdx + 1} з {safePracticeData.length}</span>
      </div>

      <div className="text-center mb-5">
        <h4 className="fw-bold">
          {isInputTask ? renderInputQuestion(currentTask, isError) : currentTask.translation}
        </h4>
      </div>

      <div className="practice-area mb-4">
        {isInputTask ? (
          <div>
            <input
              type="text"
              className={`form-control form-control-lg text-center rounded-pill border-2 ${isCorrect ? 'border-success bg-light text-success' : isError ? 'border-danger text-danger bg-light-danger' : ''}`}
              value={userInput}
              onChange={(event) => !isError && !isCorrect && setUserInput(event.target.value)}
              disabled={isCorrect || isError}
              placeholder="Введіть відповідь..."
            />
            {isError && <div className="text-danger mt-2 small">Правильна відповідь показана в реченні</div>}
          </div>
        ) : (
          <div className="text-center">
            <div className={`p-3 mb-2 rounded-4 border-2 ${isError ? 'border-danger bg-light-danger' : 'border-light bg-light'}`} style={{ minHeight: '70px' }}>
              {constructorAnswers.map((word, index) => (
                <span key={`${word}-${index}`} className={`badge fs-5 m-1 ${isError ? 'bg-danger' : 'bg-primary'}`}>
                  {word}
                </span>
              ))}
            </div>

            {isError && (
              <div className="mb-4 animate__animated animate__fadeIn">
                <div className="small text-muted mb-1">Правильний порядок:</div>
                <div className="d-flex justify-content-center flex-wrap">
                  {expectedConstructorParts.map((part, index) => (
                    <span key={`${part}-${index}`} className="badge bg-success fs-6 m-1 opacity-75">{part}</span>
                  ))}
                </div>
              </div>
            )}

            {!isCorrect && !isError && (
              <div className="d-flex justify-content-center flex-wrap gap-2 mt-3">
                {(currentStep?.options || []).map((option, index) => (
                  <button
                    key={`${option}-${index}`}
                    onClick={() => setConstructorAnswers([...constructorAnswers, option])}
                    className="btn btn-outline-primary rounded-pill px-4 shadow-sm"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {!isCorrect && !isError && constructorAnswers.length > 0 && (
              <button className="btn btn-link btn-sm text-muted mt-2" onClick={() => setConstructorAnswers([])}>Очистити</button>
            )}
          </div>
        )}
      </div>

      <div className="text-center mt-5">
        {!isCorrect && !isError ? (
          <button
            onClick={checkAnswer}
            className="btn btn-success btn-lg rounded-pill px-5 fw-bold"
            disabled={isInputTask ? !userInput : constructorAnswers.length < (currentTask.steps?.length || 0)}
          >
            ПЕРЕВІРИТИ
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={`btn btn-lg rounded-pill px-5 animate__animated animate__pulse infinite ${isError ? 'btn-danger' : 'btn-primary'}`}
          >
            {isError ? 'ЗРОЗУМІЛО, ДАЛІ' : 'ПРОДОВЖИТИ'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticeStep;
