import { useEffect, useState } from 'react';
import { readUserProgress, writeUserProgress } from '../../utils/progressStorage';

const shuffle = (items) => [...items].sort(() => 0.5 - Math.random());

const VocabStep = ({ words = [], onCompleteTheory, lessonId }) => {
  const safeWords = Array.isArray(words) ? words : [];
  const [mode, setMode] = useState('list');
  const [learnedIds, setLearnedIds] = useState([]);
  const [sessionWords, setSessionWords] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [sessionLearnedCount, setSessionLearnedCount] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const progress = readUserProgress();
    const savedIds = progress[lessonId]?.learnedIds;
    setLearnedIds(Array.isArray(savedIds) ? savedIds : []);
  }, [lessonId]);

  const updateVocabProgress = (nextLearnedIds) => {
    const totalWordsInLesson = safeWords.length;
    const percentage = totalWordsInLesson > 0
      ? Math.min(50, Math.round((nextLearnedIds.length / totalWordsInLesson) * 50))
      : 0;

    const progress = readUserProgress();
    const previousScore = progress[lessonId]?.score || 0;

    progress[lessonId] = {
      ...progress[lessonId],
      score: Math.max(previousScore, percentage),
      learnedIds: nextLearnedIds,
      status: Math.max(previousScore, percentage) === 100 ? 'completed' : 'in-progress',
      date: new Date().toLocaleDateString()
    };

    writeUserProgress(progress);
  };

  const generateOptions = (correctWord) => {
    if (!correctWord) return [];

    const others = safeWords
      .filter((word) => word.word !== correctWord.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    return [...others, correctWord].sort(() => 0.5 - Math.random());
  };

  const startTraining = () => {
    const toTrain = shuffle(safeWords.filter((word) => !learnedIds.includes(word.id)));

    if (toTrain.length === 0) {
      alert('Всі слова цього уроку вивчені!');
      return;
    }

    const currentBatch = toTrain.slice(0, 10);

    setSessionWords(currentBatch);
    setCurrentIdx(0);
    setWrongAnswers([]);
    setSessionLearnedCount(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setOptions(generateOptions(currentBatch[0]));
    setMode('training');
  };

  const checkAnswer = (word) => {
    if (isAnswered) return;

    const currentWord = sessionWords[currentIdx];
    if (!currentWord) return;

    setSelectedAnswer(word);
    setIsAnswered(true);

    if (word !== currentWord.word) {
      setWrongAnswers((prev) => (
        prev.includes(currentWord.id) ? prev : [...prev, currentWord.id]
      ));
    }
  };

  const nextWord = () => {
    const currentWord = sessionWords[currentIdx];
    if (!currentWord) return;

    if (currentIdx < sessionWords.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setOptions(generateOptions(sessionWords[nextIdx]));
      return;
    }

    const failedIds = new Set(wrongAnswers);
    if (selectedAnswer !== currentWord.word) {
      failedIds.add(currentWord.id);
    }

    const justLearned = sessionWords
      .filter((word) => !failedIds.has(word.id))
      .map((word) => word.id);

    const newLearnedIds = [...new Set([...learnedIds, ...justLearned])];
    setSessionLearnedCount(justLearned.length);
    setLearnedIds(newLearnedIds);
    updateVocabProgress(newLearnedIds);
    setMode('results');
  };

  if (mode === 'list') {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="m-0 fw-bold text-secondary">Слова уроку</h5>
            <small className="text-muted">Вивчено: {learnedIds.length} з {safeWords.length}</small>
          </div>
          <button onClick={startTraining} className="btn btn-success rounded-pill px-4 fw-bold" style={{ backgroundColor: '#58cc02', border: 'none' }}>
            {learnedIds.length > 0 ? 'ПРОДОВЖИТИ' : 'ТРЕНУВАТИ'}
          </button>
        </div>

        <div className="list-group list-group-flush">
          {safeWords.map((word) => (
            <div key={word.id} className="list-group-item d-flex align-items-center py-3 border-light">
              <i className="bi bi-volume-up text-success fs-4 me-3 cursor-pointer"></i>
              <div className="flex-grow-1">
                <div className="fw-bold fs-5">{word.word}</div>
                <div className="text-muted small">{word.translation}</div>
              </div>
              <img src={word.img} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover' }} className="rounded shadow-sm me-3" />
              <div
                className="rounded-circle border d-flex align-items-center justify-content-center"
                style={{ width: '24px', height: '24px', borderColor: learnedIds.includes(word.id) ? '#58cc02' : '#dee2e6' }}
              >
                {learnedIds.includes(word.id) && <div className="rounded-circle bg-success" style={{ width: '12px', height: '12px' }}></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'training') {
    const currentWord = sessionWords[currentIdx];
    if (!currentWord) return null;

    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
        <div className="progress mb-4" style={{ height: '8px' }}>
          <div className="progress-bar bg-success" style={{ width: `${((currentIdx + 1) / sessionWords.length) * 100}%` }}></div>
        </div>
        <h2 className="text-primary fw-bold mb-4">{currentWord.translation}</h2>
        <div className="mb-4">
          <img src={currentWord.img} className="rounded shadow" style={{ width: '200px', height: '150px', objectFit: 'cover', filter: isAnswered && selectedAnswer === currentWord.word ? 'none' : 'blur(15px)' }} alt="vocab" />
        </div>
        <div className="d-grid gap-2 col-md-8 mx-auto">
          {options.map((option, index) => {
            let btnClass = 'btn-outline-primary';
            if (isAnswered) {
              if (option.word === currentWord.word) btnClass = 'btn-success text-white';
              else if (option.word === selectedAnswer) btnClass = 'btn-danger text-white';
              else btnClass = 'btn-outline-light text-muted';
            }

            return (
              <button key={index} onClick={() => checkAnswer(option.word)} disabled={isAnswered} className={`btn py-3 rounded-pill fw-bold border-2 ${btnClass}`}>
                {option.word}
              </button>
            );
          })}
        </div>
        {isAnswered && (
          <button onClick={nextWord} className="btn btn-success btn-lg mt-5 rounded-pill px-5 fw-bold">
            ДАЛІ
          </button>
        )}
      </div>
    );
  }

  if (mode === 'results') {
    const isAllDone = learnedIds.length === safeWords.length;

    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
        <h2 className="fw-bold mb-2">Раунд завершено!</h2>
        <p className="text-muted mb-4">Вивчено {sessionLearnedCount} слів за цей підхід.</p>

        <div className="display-4 fw-bold text-primary mb-4">
          {learnedIds.length} / {safeWords.length}
          <div className="fs-6 text-muted">всього вивчено</div>
        </div>

        <div className="d-flex justify-content-center gap-3">
          {!isAllDone && (
            <button onClick={startTraining} className="btn btn-success btn-lg rounded-pill px-4 fw-bold">
              ТРЕНУВАТИ НАСТУПНІ
            </button>
          )}
          <button onClick={onCompleteTheory} className="btn btn-outline-primary btn-lg rounded-pill px-4 fw-bold">
            ДО ТЕОРІЇ
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default VocabStep;
