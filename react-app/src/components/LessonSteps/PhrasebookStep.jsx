import { useMemo, useState } from 'react';

const TASK_TYPES = [
  'build-translation',
  'choose-translation',
  'listen-build',
  'translate-phrase'
];

const taskMeta = {
  'build-translation': {
    title: 'Збери переклад фрази',
    icon: 'bi-pencil'
  },
  'choose-translation': {
    title: 'Обери правильний переклад',
    icon: 'bi-headphones'
  },
  'listen-build': {
    title: 'Прослухай та збери фразу',
    icon: 'bi-headphones'
  },
  'translate-phrase': {
    title: 'Переклади фразу',
    icon: 'bi-pencil'
  }
};

const shuffle = (items) => [...items].sort(() => 0.5 - Math.random());

const normalizeText = (value) => (
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:]/g, '')
    .replace(/\s+/g, ' ')
);

const splitPhrase = (phrase) => (
  phrase
    .replace(/[.,!?;:]/g, '')
    .split(' ')
    .filter(Boolean)
);

const generateMisspellings = (word) => {
  const cleanWord = String(word || '').trim();
  if (!cleanWord) return [];

  const lowerWord = cleanWord.toLowerCase();
  const variants = new Set();
  const vowels = ['a', 'e', 'i', 'o', 'u'];

  const addVariant = (variant) => {
    if (!variant) return;
    if (normalizeText(variant) !== normalizeText(cleanWord)) {
      variants.add(variant);
    }
  };

  if (cleanWord.length > 2) {
    addVariant(cleanWord.slice(0, -1));
    addVariant(cleanWord.slice(0, 1) + cleanWord.slice(2));
  }

  for (let index = 0; index < cleanWord.length; index += 1) {
    const char = lowerWord[index];

    if (vowels.includes(char)) {
      const nextVowel = vowels[(vowels.indexOf(char) + 1) % vowels.length];
      addVariant(cleanWord.slice(0, index) + nextVowel + cleanWord.slice(index + 1));
      break;
    }
  }

  if (cleanWord.length > 3) {
    addVariant(cleanWord.slice(0, 1) + cleanWord[2] + cleanWord[1] + cleanWord.slice(3));
  }

  if (cleanWord.length > 1) {
    addVariant(cleanWord + cleanWord[cleanWord.length - 1]);
  }

  if (lowerWord === 'have') {
    addVariant('hav');
    addVariant('heve');
  }

  const fallbackVariants = [
    `${cleanWord}e`,
    `${cleanWord}a`,
    `h${cleanWord}`,
    cleanWord.length > 1 ? `${cleanWord.slice(0, -1)}e` : `${cleanWord}n`
  ];

  fallbackVariants.forEach(addVariant);

  return shuffle([...variants]).slice(0, 2);
};

const speakPhrase = (phrase) => {
  if (!window.speechSynthesis || !phrase) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
};

const PhrasebookStep = ({ phrases = [] }) => {
  const safePhrases = Array.isArray(phrases) ? phrases : [];
  const [showTranslations, setShowTranslations] = useState(true);
  const [mode, setMode] = useState('list');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [wordOptions, setWordOptions] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [stepChoice, setStepChoice] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [trainingTasks, setTrainingTasks] = useState([]);

  const baseTasks = useMemo(() => (
    safePhrases.map((phrase, index) => ({
      ...phrase,
      type: TASK_TYPES[index % TASK_TYPES.length]
    }))
  ), [safePhrases]);

  const tasks = trainingTasks.length > 0 ? trainingTasks : baseTasks;
  const currentTask = tasks[currentIdx];
  const currentMeta = currentTask ? taskMeta[currentTask.type] : null;
  const phraseWords = currentTask ? splitPhrase(currentTask.phrase) : [];

  const translationOptions = useMemo(() => {
    if (!currentTask) return [];

    const others = safePhrases
      .filter((phrase) => phrase.id !== currentTask.id)
      .map((phrase) => phrase.translation);

    return shuffle([...shuffle(others).slice(0, 2), currentTask.translation]);
  }, [currentTask, safePhrases]);

  const getWordOptionsForTask = (task, index) => {
    const taskWords = task ? splitPhrase(task.phrase) : [];
    const correct = taskWords[index];
    if (!correct) return [];

    const distractors = generateMisspellings(correct);

    return shuffle([...distractors, correct]);
  };

  const resetTaskState = (task = currentTask) => {
    const words = task ? splitPhrase(task.phrase) : [];

    setSelectedWords([]);
    setSelectedTranslation(null);
    setStepChoice(null);
    setIsChecked(false);
    setIsCorrect(false);
    setWordOptions(task?.type === 'build-translation' || task?.type === 'listen-build'
      ? shuffle(words)
      : getWordOptionsForTask(task, 0));
  };

  const startTraining = () => {
    if (tasks.length === 0) return;

    const randomizedTasks = shuffle(baseTasks);
    const firstTask = randomizedTasks[0];
    const firstWords = splitPhrase(firstTask.phrase);

    setTrainingTasks(randomizedTasks);
    setCurrentIdx(0);
    setCorrectCount(0);
    setMode('training');
    setWordOptions(firstTask.type === 'build-translation' || firstTask.type === 'listen-build'
      ? shuffle(firstWords)
      : getWordOptionsForTask(firstTask, 0));
  };

  const pickWord = (word) => {
    if (isChecked) return;

    setSelectedWords([...selectedWords, word]);
    setWordOptions(wordOptions.filter((option) => option !== word));
  };

  const removeLastWord = () => {
    if (isChecked || selectedWords.length === 0) return;

    const lastWord = selectedWords[selectedWords.length - 1];
    setSelectedWords(selectedWords.slice(0, -1));
    setWordOptions(shuffle([...wordOptions, lastWord]));
  };

  const checkConstructorAnswer = () => {
    const correct = normalizeText(phraseWords.join(' '));
    const answer = normalizeText(selectedWords.join(' '));
    const success = answer === correct;

    setIsCorrect(success);
    setIsChecked(true);
    if (success) setCorrectCount((count) => count + 1);
  };

  const chooseTranslation = (translation) => {
    if (isChecked) return;

    const success = translation === currentTask.translation;
    setSelectedTranslation(translation);
    setIsCorrect(success);
    setIsChecked(true);
    if (success) setCorrectCount((count) => count + 1);
  };

  const chooseStepOption = (word) => {
    if (stepChoice) return;

    const expected = phraseWords[selectedWords.length];
    const success = normalizeText(word) === normalizeText(expected);

    if (success) {
      const nextSelectedWords = [...selectedWords, word];
      setSelectedWords(nextSelectedWords);

      if (nextSelectedWords.length === phraseWords.length) {
        setStepChoice(null);
        setIsCorrect(true);
        setIsChecked(true);
        setCorrectCount((count) => count + 1);
      } else {
        setWordOptions(getWordOptionsForTask(currentTask, nextSelectedWords.length));
      }
      return;
    }

    setStepChoice({ word, expected });
  };

  const continueAfterStepError = () => {
    setStepChoice(null);
  };

  const nextTask = () => {
    if (currentIdx < tasks.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      resetTaskState(tasks[nextIdx]);
      return;
    }

    setMode('results');
  };

  if (safePhrases.length === 0) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
        <h2 className="fw-bold">Розмовник ще готується</h2>
        <p className="text-muted mb-0">Для цього уроку поки немає фраз.</p>
      </div>
    );
  }

  if (mode === 'list') {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-4 animate__animated animate__fadeIn">
        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0">Корисні фрази</h5>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-success btn-sm rounded-pill"
              onClick={() => setShowTranslations(!showTranslations)}
            >
              {showTranslations ? 'Приховати переклад' : 'Показати переклад'}
            </button>
            <button className="btn btn-success btn-sm rounded-pill px-4 fw-bold" onClick={startTraining}>
              Тренувати
            </button>
          </div>
        </div>

        <div className="list-group list-group-flush">
          {safePhrases.map((phrase) => (
            <div key={phrase.id} className="list-group-item d-flex align-items-center py-3 border-light">
              <div className="me-3">
                <button
                  className="btn btn-light btn-sm rounded-circle text-success"
                  onClick={() => speakPhrase(phrase.phrase)}
                  aria-label={`Прослухати ${phrase.phrase}`}
                >
                  <i className="bi bi-play-fill"></i>
                </button>
              </div>
              <div className="flex-grow-1">
                <div className="fw-bold fs-5 text-primary">{phrase.phrase}</div>
                {showTranslations && (
                  <div className="text-muted small animate__animated animate__fadeIn">
                    {phrase.translation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-light rounded-3 text-center">
          <small className="text-muted italic">Прослухайте фрази, а потім пройдіть тренування на переклад і порядок слів.</small>
        </div>
      </div>
    );
  }

  if (mode === 'results') {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
        <i className="bi bi-check-circle text-success display-3 mb-3"></i>
        <h2 className="fw-bold">Тренування завершено!</h2>
        <p className="text-muted mb-4">Правильних відповідей: {correctCount} з {tasks.length}</p>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-success rounded-pill px-4 fw-bold" onClick={startTraining}>Ще раз</button>
          <button className="btn btn-outline-primary rounded-pill px-4 fw-bold" onClick={() => setMode('list')}>До фраз</button>
        </div>
      </div>
    );
  }

  const progress = ((currentIdx + 1) / tasks.length) * 100;
  const isConstructorTask = currentTask.type === 'build-translation' || currentTask.type === 'listen-build';
  const isTranslateStepTask = currentTask.type === 'translate-phrase';
  const correctStepWord = phraseWords[selectedWords.length];

  return (
    <div className="bg-white shadow-sm rounded-3 overflow-hidden animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <i className={`bi ${currentMeta.icon} text-secondary`}></i>
          <span className="fw-semibold">{currentMeta.title}</span>
        </div>
        <span className="fw-semibold">{currentIdx + 1} з {tasks.length}</span>
      </div>

      <div className="progress rounded-0" style={{ height: '4px' }}>
        <div className="progress-bar bg-success" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="p-4 p-md-5" style={{ minHeight: '430px' }}>
        {isConstructorTask && (
          <div className="text-center">
            {currentTask.type === 'listen-build' ? (
              <button
                className="btn btn-outline-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                style={{ width: '74px', height: '74px' }}
                onClick={() => speakPhrase(currentTask.phrase)}
                aria-label="Прослухати фразу"
              >
                <i className="bi bi-volume-up-fill fs-2"></i>
              </button>
            ) : (
              <h4 className="fw-bold text-primary mb-5">{currentTask.translation}</h4>
            )}

            <div className={`mx-auto mb-5 p-3 rounded-3 ${isChecked ? (isCorrect ? 'bg-success-subtle' : 'bg-danger-subtle') : ''}`} style={{ maxWidth: '720px', minHeight: '72px' }}>
              {selectedWords.length === 0 ? (
                <span className="text-muted">Оберіть слова у правильному порядку</span>
              ) : (
                selectedWords.map((word, index) => (
                  <button
                    key={`${word}-${index}`}
                    className="btn btn-light fw-bold mx-1 mb-2"
                    onClick={index === selectedWords.length - 1 ? removeLastWord : undefined}
                  >
                    {word}
                  </button>
                ))
              )}
            </div>

            {isChecked && !isCorrect && (
              <div className="text-success fw-bold mb-4">{currentTask.phrase}</div>
            )}

            <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
              {wordOptions.map((word, index) => (
                <button
                  key={`${word}-${index}`}
                  className="btn btn-light fw-bold px-4"
                  onClick={() => pickWord(word)}
                  disabled={isChecked}
                >
                  {word}
                </button>
              ))}
            </div>

            {!isChecked ? (
              <button
                className="btn btn-success rounded-pill px-5 fw-bold"
                onClick={checkConstructorAnswer}
                disabled={selectedWords.length !== phraseWords.length}
              >
                Перевірити
              </button>
            ) : (
              <button className={`btn rounded-pill px-5 fw-bold ${isCorrect ? 'btn-primary' : 'btn-danger'}`} onClick={nextTask}>
                Далі
              </button>
            )}
          </div>
        )}

        {currentTask.type === 'choose-translation' && (
          <div className="row h-100 align-items-center">
            <div className="col-md-7 text-center py-5">
              <button
                className="btn btn-outline-primary rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: '76px', height: '76px' }}
                onClick={() => speakPhrase(currentTask.phrase)}
                aria-label="Прослухати фразу"
              >
                <i className="bi bi-volume-up-fill fs-2"></i>
              </button>
            </div>
            <div className="col-md-5 bg-light py-5 px-4">
              <div className="d-grid gap-2">
                {translationOptions.map((translation) => {
                  const selected = selectedTranslation === translation;
                  const correct = translation === currentTask.translation;
                  const btnClass = isChecked
                    ? correct
                      ? 'btn-success text-white'
                      : selected
                        ? 'btn-danger text-white'
                        : 'btn-light text-muted'
                    : 'btn-light';

                  return (
                    <button
                      key={translation}
                      className={`btn text-start fw-bold py-3 ${btnClass}`}
                      onClick={() => chooseTranslation(translation)}
                      disabled={isChecked}
                    >
                      <span className="d-inline-flex align-items-center justify-content-center rounded-circle border me-3" style={{ width: '30px', height: '30px' }}></span>
                      {translation}
                    </button>
                  );
                })}
              </div>
              {isChecked && (
                <button className={`btn rounded-pill px-5 fw-bold mt-4 w-100 ${isCorrect ? 'btn-primary' : 'btn-danger'}`} onClick={nextTask}>
                  Далі
                </button>
              )}
            </div>
          </div>
        )}

        {isTranslateStepTask && (
          <div className="text-center">
            <h4 className="fw-bold text-primary mb-4">{currentTask.translation}</h4>

            <div className="mx-auto border-bottom border-primary mb-5 py-3" style={{ maxWidth: '760px', minHeight: '72px' }}>
              {selectedWords.length === 0 ? (
                <span className="text-muted">Почніть переклад</span>
              ) : (
                selectedWords.map((word, index) => (
                  <span key={`${word}-${index}`} className="fw-bold fs-5 mx-1">{word}</span>
                ))
              )}
              {!isChecked && <span className="border-start border-secondary ms-2 ps-2">&nbsp;</span>}
            </div>

            {stepChoice && (
              <div className="mb-3">
                <span className="text-danger fw-semibold me-3">Спробуйте ще раз</span>
                <span className="text-success fw-bold">Правильно: {stepChoice.expected}</span>
              </div>
            )}

            <div className="row g-2 justify-content-center">
              {wordOptions.map((word, index) => {
                const isPicked = stepChoice?.word === word;
                const isRightOption = stepChoice && normalizeText(word) === normalizeText(stepChoice.expected);
                const btnClass = stepChoice
                  ? isRightOption
                    ? 'btn-success text-white'
                    : isPicked
                      ? 'btn-danger text-white'
                      : 'btn-light text-muted'
                  : 'btn-light';

                return (
                  <div className="col-12 col-md-4" key={`${word}-${index}`}>
                    <button
                      className={`btn w-100 fw-bold py-3 ${btnClass}`}
                      onClick={() => chooseStepOption(word)}
                      disabled={isChecked || Boolean(stepChoice)}
                    >
                      {word}
                    </button>
                  </div>
                );
              })}
            </div>

            {stepChoice && (
              <button className="btn btn-outline-success rounded-pill px-5 fw-bold mt-4" onClick={continueAfterStepError}>
                Не знаю
              </button>
            )}

            {isChecked && (
              <button className="btn btn-primary rounded-pill px-5 fw-bold mt-4" onClick={nextTask}>
                Далі
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhrasebookStep;
