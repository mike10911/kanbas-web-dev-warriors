import { Question } from '.';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { PiTagSimpleFill } from 'react-icons/pi';
import './QuestionList.css';
import useQuizPreview from '../hooks/useQuizPreview';

export interface QuestionListProps {
  questions: Question[];
  currentQuestionIndex: number;
  handleChangeQuestion: (index: number) => void;
}

export default function QuestionList({
  questions,
  currentQuestionIndex,
  handleChangeQuestion,
}: QuestionListProps) {
  const { taggedQuestions } = useQuizPreview();

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
    </div>
  );
}
