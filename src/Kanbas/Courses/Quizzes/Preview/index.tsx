import { useEffect, useState } from 'react';
import QuizHeaderPreview from './QuizPreviewHeader';
import QuizContent from './QuizContent';
import QuestionList from './QuestionList';
import { useParams } from 'react-router';
import { QuizPreviewProvider } from '../context/QuizPreviewContext';
import * as client from './client';
import StatusBanner from './StatusBanner';
import { QuestionType, QuizType, AssignmentGroup } from './constants';

export type Question = {
  _id: number;
  title: string;
  type: QuestionType;
  points: number;
  description: string;
  answers: string[];
  options: string[];
};

export type Quiz = {
  _id: number;
  isPublished: boolean;
  questions: Question[];
  title: string;
  description: string;
  type: QuizType;
  points: number;
  assignmentGroup: AssignmentGroup;
  shuffleAnswers: boolean;
  timeLimit?: number;
  multipleAttempts: boolean;
  showCorrectAnswers?: Date;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: Date;
  availableDate: Date;
  untilDate: Date;
};

const QuizPreview = () => {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [taggedQuestions, setTaggedQuestions] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [quizResults, setQuizResults] = useState<boolean[]>([]);

  useEffect(() => {
    // fetch quiz from BE
    const fetchQuiz = async () => {
      if (!quizId) {
        return;
      }
      try {
        setError('');
        const res = await client.findQuizById(quizId);
        console.log('res', res);
        setQuiz(res);
        setAnswers(
          res.questions.map((question) =>
            question.type === QuestionType.FILL_IN_THE_BLANK
              ? question.options.map(() => '')
              : ['']
          )
        );
      } catch (e: any) {
        setError(e.message);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleChangeQuestion = (index: number) =>
    setCurrentQuestionIndex(index);

  const handleSubmit = () => {
    const results = answers.map(
      (userAnswers, index) =>
        quiz?.questions[index].answers.every(
          (ans, i) => ans === userAnswers[i]
        ) ?? false
    );
    setQuizResults(results);
  };

  const handleSaveAnswer = (
    answer: string,
    answerIndex: number,
    questionIndex: number
  ) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex][answerIndex] = answer;
      return newAnswers;
    });
  };

  const updateTaggedQuestion = (questionIndex: number) =>
    taggedQuestions.includes(questionIndex)
      ? setTaggedQuestions((prev) => prev.filter((q) => q !== questionIndex))
      : setTaggedQuestions((prev) => [...prev, questionIndex]);

  return (
    <QuizPreviewProvider
      value={{
        answers,
        taggedQuestions,
        updateTaggedQuestion,
      }}
    >
      <div className='d-flex flex-column gap-1 mb-lg-4'>
        {quiz && !error && (
          <div className='d-flex flex-xl-row flex-column gap-5'>
            <div className='d-flex flex-column w-100'>
              <QuizHeaderPreview title={quiz?.title} startedAt={new Date()} />
              <QuizContent
                oneQuestionAtATime={quiz.oneQuestionAtATime}
                currentQuestionIndex={currentQuestionIndex}
                questions={quiz.questions}
                handleChangeQuestion={setCurrentQuestionIndex}
                handleSubmit={handleSubmit}
                handleSaveAnswer={handleSaveAnswer}
              />
            </div>
            <QuestionList
              questions={quiz.questions}
              currentQuestionIndex={currentQuestionIndex}
              handleChangeQuestion={handleChangeQuestion}
            />
          </div>
        )}
        {error && <StatusBanner message={error} />}
      </div>
    </QuizPreviewProvider>
  );
};

export default QuizPreview;
