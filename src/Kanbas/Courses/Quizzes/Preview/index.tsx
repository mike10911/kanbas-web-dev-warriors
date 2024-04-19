import React, { useEffect, useState } from 'react';
import QuizHeaderPreview from './QuizPreviewHeader';
import QuizContent from './QuizContent';
import QuestionList from './QuestionList';
import { quizzes } from '../../../Database';
import { useParams } from 'react-router';
import { QuizPreviewProvider } from '../context/QuizPreviewContext';

export enum QuestionType {
  MULTIPLE_CHOICE = 'Multiple Choice',
  TRUE_FALSE = 'True/False',
  FILL_IN_THE_BLANK = 'Fill in the Blank',
}

export type Question = {
  _id: number;
  title: string;
  type: QuestionType;
  points: number;
  description: string;
  answers: string[];
  options: string[];
};

export enum QuizType {
  GRADED_QUIZ = 'Graded Quiz',
  PRACTICE_QUIZ = 'Practice Quiz',
  GRADED_SURVEY = 'Graded Survey',
  UNGRADED_SURVEY = 'Ungraded Survey',
}

export enum AssignmentGroup {
  QUIZZES = 'Quizzes',
  ASSIGNMENTS = 'Assignments',
  EXAMS = 'Exams',
  PROJECTS = 'Projects',
}

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

/*

preview needs:
- quiz title
banner to say that it's a preview
- date quiz started at (assume it's the datetime the moment the faculty click to preview the quiz)
- show question either one at a time or all at once in a long vertical scroll
- each question needs to show:
  - title in top left
  - description
  - points in top right
  - list of all answers in the proper input format
  - next button to go to next question if there are more questions (dont show if it's the last question)
- show submit button for overall quiz below question box and with the last updated at time next to it
- show button below submit for going back to quiz editor screen for the particular question
- at bottom, show list of all questions where the links are all clickable and the current question link is bolded
*/
const QuizPreview = () => {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  // TODO: the datatype of this array might need to change
  const [answers, setAnswers] = useState<string[][]>([]);
  const [taggedQuestions, setTaggedQuestions] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    // fetch quiz from BE
    const fetchQuiz = async () => {
      // TODO: replace with actual fetch call
      setQuiz(JSON.parse(JSON.stringify(quizzes[0])));
      setAnswers(
        quizzes[0].questions.map((question) =>
          question.type === QuestionType.FILL_IN_THE_BLANK
            ? question.options.map(() => '')
            : ['']
        )
      );
    };

    fetchQuiz();
  }, []);

  const handleChangeQuestion = (index: number) =>
    setCurrentQuestionIndex(index);

  const handleEdit = () => {
    // TODO: implement this, wire in to change from quiz preview to editor
    console.log('go back to quiz editor page');
  };

  const handleSubmit = () => {
    console.log(
      'grade teh quiz score for the preview test run but dont save it anywhere?'
    );
    console.log('submitted answers', answers);
  };

  const handleSaveAnswer = (
    answer: string,
    answerIndex: number,
    questionIndex: number
  ) => {
    console.log(
      'save the progress of the quiz after each answer change in browser state'
    );
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
        {quiz && (
          <div className='d-flex flex-xl-row flex-column gap-5'>
            <div className='d-flex flex-column w-100'>
              <QuizHeaderPreview title={quiz?.title} startedAt={new Date()} />
              <QuizContent
                oneQuestionAtATime={quiz.oneQuestionAtATime}
                currentQuestionIndex={currentQuestionIndex}
                questions={quiz.questions}
                handleChangeQuestion={setCurrentQuestionIndex}
                handleEdit={handleEdit}
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
      </div>
    </QuizPreviewProvider>
  );
};

export default QuizPreview;
