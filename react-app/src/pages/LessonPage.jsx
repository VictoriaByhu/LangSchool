import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { lessons } from '../data/lessons';
import VocabStep from '../components/LessonSteps/VocabStep';
import TheoryStep from '../components/LessonSteps/TheoryStep';
import PhrasebookStep from '../components/LessonSteps/PhrasebookStep';
import PracticeStep from '../components/LessonSteps/PracticeStep';

function LessonPage() {
  const { level, lessonId } = useParams();
  const [activeTab, setActiveTab] = useState('vocab');

  const currentLesson = lessons[level]?.find(l => l.id === lessonId);
  if (!currentLesson) return <div>Урок не знайдено</div>;

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Шапка уроку */}
        <div className="rounded-4 overflow-hidden mb-4 shadow-sm position-relative" style={{height: '200px'}}>
            <img src={currentLesson.image} className="w-100 h-100 object-fit-cover" alt="" />
            <div className="position-absolute bottom-0 start-0 p-4 text-white bg-dark bg-opacity-50 w-100">
                <h2 className="m-0 fw-bold">{currentLesson.title}</h2>
            </div>
        </div>

        <div className="row">
          {/* Бічне меню */}
          <div className="col-md-3 mb-4">
            <div className="list-group shadow-sm border-0 rounded-4 overflow-hidden">
              <button 
                onClick={() => setActiveTab('vocab')}
                className={`list-group-item list-group-item-action border-0 p-3 ${activeTab === 'vocab' ? 'active' : ''}`}
              >
                <i className="bi bi-book me-2"></i> Словник
              </button>
              <button 
                onClick={() => setActiveTab('theory')}
                className={`list-group-item list-group-item-action border-0 p-3 ${activeTab === 'theory' ? 'active' : ''}`}
              >
                <i className="bi bi-mortarboard me-2"></i> Теорія
              </button>
              <button 
                onClick={() => setActiveTab('phrasebook')}
                className={`list-group-item list-group-item-action border-0 p-3 ${activeTab === 'phrasebook' ? 'active' : ''}`}
              >
                <i className="bi bi-chat-quote me-2"></i> Розмовник
              </button>
              <button 
                onClick={() => setActiveTab('practice')}
                className={`list-group-item list-group-item-action border-0 p-3 ${activeTab === 'practice' ? 'active' : ''}`}
              >
                <i className="bi bi-pencil-square me-2"></i> Практика
              </button>
            </div>
          </div>

          {/* Контентна частина */}
          <div className="col-md-9">
              {activeTab === 'vocab' && (
                  <VocabStep 
                    words={currentLesson.vocabulary} 
                    lessonId={lessonId} // ДОДАНО ДЛЯ ПРОГРЕСУ
                    onCompleteTheory={() => setActiveTab('theory')} 
                  />
              )}
              {activeTab === 'theory' && (
                  <TheoryStep theoryData={currentLesson.theory} />
              )}
              {activeTab === 'phrasebook' && (
                  <PhrasebookStep phrases={currentLesson.phrasebook} />
              )}
              {activeTab === 'practice' && (
                  <PracticeStep 
                    practiceData={currentLesson.practice} 
                    lessonId={lessonId} // ДОДАНО ДЛЯ ПРОГРЕСУ
                  />
              )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default LessonPage;