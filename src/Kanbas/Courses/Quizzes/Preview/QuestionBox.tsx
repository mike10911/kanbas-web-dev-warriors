import { PiTagSimple, PiTagSimpleFill } from 'react-icons/pi';
import { Question } from '.';
import * as DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import './QuestionBox.css';
import Answers from './Answers';
import useQuizPreview from '../hooks/useQuizPreview';

export interface QuestionBoxProps {
  question: Question;
  questionIndex: number;
  handleAnswerSelect: (answer: string, answerIndex: number) => void;
}

export default function QuestionBox({
  question,
  questionIndex,
  handleAnswerSelect,
}: QuestionBoxProps) {
  const { taggedQuestions, updateTaggedQuestion } = useQuizPreview();
  const descriptionSanitized = DOMPurify.sanitize(question.description);

  const handleTagClick = () => updateTaggedQuestion(questionIndex);

  return (
    <div className='question-box-grid'>
      <div className='d-flex justify-content-center'>
        {taggedQuestions.includes(questionIndex) ? (
          <PiTagSimpleFill
            className='question-box-tag'
            style={{ color: '#EBBC4E' }}
            onClick={handleTagClick}
          />
        ) : (
          <PiTagSimple className='question-box-tag' onClick={handleTagClick} />
        )}
      </div>
      <div className='d-flex flex-column question-box'>
        <div className='d-flex flex-row question-box-header'>
          <div className='d-flex flex-row w-100 py-2 px-4 justify-content-between align-items-center'>
            <p className='m-0 pt-1'>{question.title}</p>
            <p className='m-0 pt-1' style={{ color: '#6E7173' }}>
              {question.points} pts
            </p>
          </div>
        </div>
        <div className='d-flex flex-column mt-1 pt-4 pb-3 px-3'>
          <p>{parse(descriptionSanitized)}</p>
          <Answers
            options={question.options}
            variant={question.type}
            questionIndex={questionIndex}
            handleAnswerSelect={handleAnswerSelect}
          />
        </div>
      </div>
      <div>
        {/* Intentionally left empty so that the grid template works out */}
      </div>
    </div>
  );
}
