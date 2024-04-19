import { format } from 'date-fns';
import { Question } from '.';
import QuestionBox from './QuestionBox';
import { MdArrowRight, MdArrowLeft, MdOutlineEdit } from 'react-icons/md';
import './QuizContent.css';
import { useState } from 'react';
import useQuizPreview from '../hooks/useQuizPreview';

/**
 * from quiz instructions to keep editing this quiz button
 */

export interface QuizContentProps {
  oneQuestionAtATime: boolean;
  currentQuestionIndex: number;
  questions: Question[];
  handleChangeQuestion: React.Dispatch<React.SetStateAction<number>>;
  handleEdit: () => void;
  handleSubmit: () => void;
  handleSaveAnswer: (
    answer: string,
    answerIndex: number,
    questionIndex: number
  ) => void;
}

export const UPDATED_AT_DATE_FORMAT = 'h:mmaaa';

export default function QuizContent({
  oneQuestionAtATime,
  currentQuestionIndex,
  questions,
  handleChangeQuestion,
  handleEdit,
  handleSubmit,
  handleSaveAnswer,
}: QuizContentProps) {
  const { answers } = useQuizPreview();
  const [formattedSavedAt, setFormattedSavedAt] = useState(
    format(new Date(), UPDATED_AT_DATE_FORMAT)
  );

  const handleAnswerSelect = (
    answer: string,
    answerIndex: number,
    questionIndex: number
  ) => {
    handleSaveAnswer(answer, answerIndex, questionIndex);
    setFormattedSavedAt(format(new Date(), UPDATED_AT_DATE_FORMAT));
  };

  return (
    <div className='d-flex flex-column gap-1'>
      <h3 className='m-0 p-0 fw-bold'>Quiz Instructions</h3>
      <hr />
      <div className='question-box-container align-self-center'>
        {oneQuestionAtATime && (
          <>
            <QuestionBox
              question={questions[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
              handleAnswerSelect={(answer: string, answerIndex: number) =>
                handleAnswerSelect(answer, answerIndex, currentQuestionIndex)
              }
            />
            <div
              className={`d-flex flex-row w-100 ${
                currentQuestionIndex === 0
                  ? 'justify-content-end'
                  : 'justify-content-between'
              }`}
              style={{
                padding: '0 50px',
              }}
            >
              {currentQuestionIndex > 0 && (
                <button
                  className='btn wd-modules-btn prev-question-btn'
                  onClick={() => handleChangeQuestion((index) => index - 1)}
                >
                  <MdArrowLeft style={{ fontSize: '20px' }} /> Previous
                </button>
              )}
              {currentQuestionIndex < questions.length - 1 && (
                <button
                  className='btn btn-danger next-question-btn'
                  onClick={() => handleChangeQuestion((index) => index + 1)}
                >
                  Next <MdArrowRight style={{ fontSize: '20px' }} />
                </button>
              )}
            </div>
          </>
        )}
        {!oneQuestionAtATime && (
          <>
            {questions.map((question, index) => (
              <QuestionBox
                key={index}
                question={question}
                questionIndex={index}
                handleAnswerSelect={(answer: string, answerIndex: number) =>
                  handleAnswerSelect(answer, answerIndex, index)
                }
              />
            ))}
          </>
        )}
      </div>
      <div
        className='d-flex flex-row justify-content-end align-items-center gap-3 py-2 px-3 m-3 submit-btn-container'
        style={{
          border: '1px solid rgb(206, 206, 206)',
        }}
      >
        <p className='m-0 p-0' style={{ color: '#6E7173' }}>
          Quiz saved at {formattedSavedAt}
        </p>
        <button
          className={`btn ${
            answers.every((answer) => answer.every((ans) => ans !== ''))
              ? 'btn-danger'
              : 'wd-modules-btn'
          }`}
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>
      </div>
      <button
        className='btn wd-modules-btn d-flex justify-content-start gap-1 mt-4'
        onClick={handleEdit}
      >
        <MdOutlineEdit
          style={{
            transform: 'rotateY(180deg)',
          }}
        />
        Keep Editing This Quiz
      </button>
    </div>
  );
}
