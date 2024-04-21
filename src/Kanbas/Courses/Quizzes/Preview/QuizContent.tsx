import { format } from 'date-fns';
import { Question } from '.';
import { quizzes } from '../../../Database';
import QuestionBox from './QuestionBox';
import { MdArrowRight, MdOutlineEdit } from 'react-icons/md';
import './QuizContent.css';

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
}

export const UPDATED_AT_DATE_FORMAT = 'h:mmaaa';

export default function QuizContent({
  oneQuestionAtATime,
  currentQuestionIndex,
  questions,
  handleChangeQuestion,
  handleEdit,
  handleSubmit,
}: QuizContentProps) {
  // TODO: update this to pull the updated at date from BE
  const formattedUpdatedAt = format(new Date(), UPDATED_AT_DATE_FORMAT);
  return (
    <div className='d-flex flex-column gap-1'>
      <h3 className='m-0 p-0 fw-bold'>Quiz Instructions</h3>
      <hr />
      <div className='question-box-container align-self-center'>
        {oneQuestionAtATime && (
          <>
            <QuestionBox
              question={quizzes[0].questions[currentQuestionIndex] as Question}
            />
            {currentQuestionIndex < questions.length - 1 && (
              <button
                className='btn wd-modules-btn next-question-btn'
                onClick={() => handleChangeQuestion((index) => index + 1)}
              >
                Next <MdArrowRight style={{ fontSize: '20px' }} />
              </button>
            )}
          </>
        )}
        {!oneQuestionAtATime && (
          <>
            {questions.map((question, index) => (
              <QuestionBox key={index} question={question} />
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
          Quiz saved at {formattedUpdatedAt}
        </p>
        <button className='btn wd-modules-btn' onClick={handleSubmit}>
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
