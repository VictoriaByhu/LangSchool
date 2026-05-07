export const PROGRESS_UPDATED_EVENT = 'lingualab-progress-updated';

export const readUserProgress = () => {
  try {
    return JSON.parse(localStorage.getItem('userProgress') || '{}');
  } catch {
    return {};
  }
};

export const writeUserProgress = (progress) => {
  localStorage.setItem('userProgress', JSON.stringify(progress));
  window.dispatchEvent(new CustomEvent(PROGRESS_UPDATED_EVENT, { detail: progress }));
};
