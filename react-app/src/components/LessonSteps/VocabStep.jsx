import { useState, useEffect } from 'react';

const VocabStep = ({ words, onCompleteTheory, lessonId }) => {
  const [mode, setMode] = useState('list'); 
  const [learnedIds, setLearnedIds] = useState([]); // ID слів, які пройдені без помилок
  const [sessionWords, setSessionWords] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [options, setOptions] = useState([]);

  // Завантажуємо вивчені ID з локального сховища при старті (опціонально)
  useEffect(() => {
    const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    if (progress[lessonId]?.learnedIds) {
      setLearnedIds(progress[lessonId].learnedIds);
    }
  }, [lessonId]);

  const updateVocabProgress = (index, isFinalInSession = false) => {
    // Рахуємо загальний прогрес на основі ВСІХ слів у уроці
    const totalWordsInLesson = words.length;
    const totalLearned = learnedIds.length + (isFinalInSession ? 0 : 0); // приблизний розрахунок
    
    // Словник дає максимум 50% від загального прогресу уроку
    const percentage = Math.min(50, Math.round((learnedIds.length / totalWordsInLesson) * 50));
    
    const progress = JSON.parse(localStorage.getItem('userProgress') || '{}');
    progress[lessonId] = { 
      ...progress[lessonId],
      score: Math.max(progress[lessonId]?.score || 0, percentage),
      learnedIds: learnedIds,
      status: 'in-progress',
      date: new Date().toLocaleDateString() 
    };
    localStorage.setItem('userProgress', JSON.stringify(progress));
  };

  const generateOptions = (correctWord) => {
    const others = words
      .filter(w => w.word !== correctWord.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    return [...others, correctWord].sort(() => 0.5 - Math.random());
  };

  const startTraining = () => {
    // Вибираємо тільки ті слова, яких немає в learnedIds
    const toTrain = words.filter(w => !learnedIds.includes(w.id));
    
    if (toTrain.length === 0) {
      alert("Всі слова цього уроку вивчені!");
      return;
    }

    // Беремо перші 10 з тих, що залишилися (або менше, якщо залишилось мало)
    const currentBatch = toTrain.slice(0, 10);
    
    setSessionWords(currentBatch);
    setCurrentIdx(0);
    setWrongAnswers([]);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setOptions(generateOptions(currentBatch[0]));
    setMode('training');
  };

  const checkAnswer = (word) => {
    if (isAnswered) return;
    setSelectedAnswer(word);
    setIsAnswered(true);

    const correctWord = sessionWords[currentIdx].word;
    if (word !== correctWord) {
      if (!wrongAnswers.includes(sessionWords[currentIdx].id)) {
        setWrongAnswers(prev => [...prev, sessionWords[currentIdx].id]);
      }
    }
  };

  const nextWord = () => {
    if (currentIdx < sessionWords.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setOptions(generateOptions(sessionWords[nextIdx]));
    } else {
      // КІНЕЦЬ РАУНДУ
      // Додаємо в learnedIds тільки ті, де не було помилок
      const justLearned = sessionWords
        .filter(w => !wrongAnswers.includes(w.id))
        .map(w => w.id);
      
      const newLearnedIds = [...new Set([...learnedIds, ...justLearned])];
      setLearnedIds(newLearnedIds);
      setMode('results');
      
      // Оновлюємо прогрес в базі
      setTimeout(() => updateVocabProgress(0, true), 10);
    }
  };

  if (mode === 'list') {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="m-0 fw-bold text-secondary">Слова уроку</h5>
            <small className="text-muted">Вивчено: {learnedIds.length} з {words.length}</small>
          </div>
          <button onClick={startTraining} className="btn btn-success rounded-pill px-4 fw-bold" style={{backgroundColor: '#58cc02', border: 'none'}}>
            {learnedIds.length > 0 ? 'ПРОДОВЖИТИ' : 'ТРЕНУВАТИ'}
          </button>
        </div>
        <div className="list-group list-group-flush">
          {words.map(w => (
            <div key={w.id} className="list-group-item d-flex align-items-center py-3 border-light">
              <i className="bi bi-volume-up text-success fs-4 me-3 cursor-pointer"></i>
              <div className="flex-grow-1">
                <div className="fw-bold fs-5">{w.word}</div>
                <div className="text-muted small">{w.translation}</div>
              </div>
              <img src={w.img} alt="" style={{width: '60px', height: '40px', objectFit: 'cover'}} className="rounded shadow-sm me-3" />
              <div 
                className="rounded-circle border d-flex align-items-center justify-content-center"
                style={{width: '24px', height: '24px', borderColor: learnedIds.includes(w.id) ? '#58cc02' : '#dee2e6'}}
              >
                {learnedIds.includes(w.id) && <div className="rounded-circle bg-success" style={{width: '12px', height: '12px'}}></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'training') {
    const currentWord = sessionWords[currentIdx];
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
        <div className="progress mb-4" style={{height: '8px'}}>
          <div className="progress-bar bg-success" style={{width: `${((currentIdx + 1) / sessionWords.length) * 100}%`}}></div>
        </div>
        <h2 className="text-primary fw-bold mb-4">{currentWord.translation}</h2>
        <div className="mb-4">
          <img src={currentWord.img} className="rounded shadow" style={{ width: '200px', height: '150px', objectFit: 'cover', filter: isAnswered && selectedAnswer === currentWord.word ? 'none' : 'blur(15px)' }} alt="vocab" />
        </div>
        <div className="d-grid gap-2 col-md-8 mx-auto">
          {options.map((opt, i) => {
            let btnClass = "btn-outline-primary";
            if (isAnswered) {
              if (opt.word === currentWord.word) btnClass = "btn-success text-white";
              else if (opt.word === selectedAnswer) btnClass = "btn-danger text-white";
              else btnClass = "btn-outline-light text-muted";
            }
            return (
              <button key={i} onClick={() => checkAnswer(opt.word)} disabled={isAnswered} className={`btn py-3 rounded-pill fw-bold border-2 ${btnClass}`}>
                {opt.word}
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
    const sessionLearned = sessionWords.length - wrongAnswers.length;
    const isAllDone = learnedIds.length === words.length;

    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
        <h2 className="fw-bold mb-2">Раунд завершено!</h2>
        <p className="text-muted mb-4">Вивчено {sessionLearned} слів за цей підхід.</p>
        
        <div className="display-4 fw-bold text-primary mb-4">
          {learnedIds.length} / {words.length}
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
};

export default VocabStep;