import { useContext } from 'react';
import { QuizPreviewContext } from '../context/QuizPreviewContext';

export default function useQuizPreview() {
  const quizPreviewContext = useContext(QuizPreviewContext);
  if (!quizPreviewContext) {
    throw new Error('useQuizPreview must be used within a QuizPreviewProvider');
  }
  return quizPreviewContext;
}
