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

export type QuestionResult = {
  score: number;
  result: boolean[];
};

const QuizPreview = () => {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [taggedQuestions, setTaggedQuestions] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [quizResults, setQuizResults] = useState<QuestionResult[] | null>(null);
  const attemptStartDatetime = new Date();

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

        // initialize answers array to have an empty string string for each question/fill in the blank
        setAnswers(
          res.questions.map((question) =>
            question.type === QuestionType.FILL_IN_THE_BLANK
              ? question.answers.map(() => '')
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
    const results = answers.map((userAnswers, index) => {
      const quizAnswers = quiz!.questions[index].answers;
      const result = userAnswers.map((answer, i) => answer === quizAnswers[i]);
      const totalCorrect = result.reduce(
        (correctCount, correct) => (correct ? correctCount + 1 : correctCount),
        0
      );

      // round score to 2 decimal places
      const score =
        quiz!.questions[index].type === QuestionType.FILL_IN_THE_BLANK
          ? Number(
              (
                (quiz!.questions[index].points / quizAnswers.length) *
                totalCorrect
              ).toFixed(2)
            )
          : result[0]
          ? quiz!.questions[index].points
          : 0;

      return {
        score,
        result,
      };
    });
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
        quizResults,
        updateTaggedQuestion,
      }}
    >
      <div className='d-flex flex-column justify-content-center gap-1 mb-lg-4'>
        {quiz && !error && (
          <div
            className={`d-flex flex-xl-row flex-column gap-5 ${
              quizResults ? 'mb-5' : ''
            }`}
          >
            <div className='d-flex flex-column w-100'>
              <QuizHeaderPreview
                title={quiz?.title}
                startedAt={attemptStartDatetime}
              />
              <QuizContent
                oneQuestionAtATime={quiz.oneQuestionAtATime}
                currentQuestionIndex={currentQuestionIndex}
                questions={quiz.questions}
                attemptStartDatetime={attemptStartDatetime}
                quizResult={quizResults}
                quizAnswers={quiz.questions.map((q) => q.answers)}
                handleChangeQuestion={setCurrentQuestionIndex}
                handleSubmit={handleSubmit}
                handleSaveAnswer={handleSaveAnswer}
              />
            </div>
            {!quizResults && (
              <QuestionList
                questions={quiz.questions}
                currentQuestionIndex={currentQuestionIndex}
                startDatetime={attemptStartDatetime}
                dueDate={quiz.dueDate}
                handleChangeQuestion={handleChangeQuestion}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        )}
        {error && <StatusBanner message={error} />}
      </div>
    </QuizPreviewProvider>
  );
};

export default QuizPreview;
