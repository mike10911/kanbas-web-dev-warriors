import { Question } from '.';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import './QuestionList.css';

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
  return (
    <div className='d-flex flex-column my-5'>
      <h3>Questions</h3>
      <ul className='question-list-container'>
        {questions.map((question, index) => (
          <li
            key={index}
            className={index === currentQuestionIndex ? 'fw-bold' : ''}
            onClick={() => handleChangeQuestion(index)}
          >
            <AiOutlineQuestionCircle
              style={{
                color: 'rgb(110, 113, 115)',
              }}
            />
            {question.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
