import { Question } from '.';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { PiTagSimpleFill } from 'react-icons/pi';
import './QuestionList.css';
import useQuizPreview from '../hooks/useQuizPreview';
import { useState } from 'react';
import { addMinutes, format } from 'date-fns';
import { QUIZ_PREVIEW_DATE_FORMAT } from './constants';
import { useTimer } from 'react-timer-hook';

export interface QuestionListProps {
  questions: Question[];
  currentQuestionIndex: number;
  startDatetime: Date;
  timeLimit?: number;
  dueDate: Date;
  handleChangeQuestion: (index: number) => void;
  handleSubmit: () => void;
}

export default function QuestionList({
  questions,
  currentQuestionIndex,
  startDatetime,
  timeLimit,
  dueDate,
  handleChangeQuestion,
  handleSubmit,
}: QuestionListProps) {
  const { taggedQuestions } = useQuizPreview();
  const [showTime, setShowTime] = useState(true);
  const formattedDueDate = format(dueDate, QUIZ_PREVIEW_DATE_FORMAT);
  const { seconds, minutes } = useTimer({
    expiryTimestamp: addMinutes(startDatetime, timeLimit ?? 0),
    onExpire: () => handleSubmit(),
  });
  const hasTimeLimit = timeLimit !== undefined;

  const handleTimeToggle = () => setShowTime((st) => !st);

  return (
    <div
      className='d-flex flex-column my-5'
      style={{
        minWidth: '250px',
        width: '250px',
      }}
    >
      <h3>Questions</h3>
      <ul className='question-list-container'>
        {questions.map((question, index) => (
          <li
            key={index}
            className={index === currentQuestionIndex ? 'fw-bold' : ''}
          >
            <div style={{ width: '20px' }}>
              {taggedQuestions.includes(index) && (
                <PiTagSimpleFill className='question-list-tag' />
              )}
            </div>
            <div
              className='question-list-item'
              onClick={() => handleChangeQuestion(index)}
            >
              <AiOutlineQuestionCircle
                style={{
                  color: 'rgb(110, 113, 115)',
                }}
              />
              {question.title}
            </div>
          </li>
        ))}
      </ul>
      {hasTimeLimit && (
        <div className='d-flex flex-row gap-3 align-items-center'>
          <p className='m-0'>Time Running:</p>
          <button
            className='btn wd-modules-btn p-1'
            style={{ fontSize: '14px' }}
            onClick={handleTimeToggle}
          >
            {showTime ? 'Hide Time' : 'Show Time'}
          </button>
        </div>
      )}
      <p className='m-0' style={{ fontSize: '12px' }}>
        Attempt due: {formattedDueDate}
      </p>
      {showTime && hasTimeLimit && (
        <p style={{ fontSize: '14px' }}>
          {minutes} Minutes, {seconds} Seconds
        </p>
      )}
    </div>
  );
}
