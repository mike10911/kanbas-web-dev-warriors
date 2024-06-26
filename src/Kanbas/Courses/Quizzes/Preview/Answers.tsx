import useQuizPreview from '../hooks/useQuizPreview';
import { QuestionType } from './constants';

export interface AnswersProps {
  options: string[];
  questionIndex: number;
  variant?: QuestionType;
  disabled?: boolean;
  handleAnswerSelect: (answer: string, answerIndex: number) => void;
}

export default function Answers({
  options,
  questionIndex,
  variant = QuestionType.MULTIPLE_CHOICE,
  disabled = false,
  handleAnswerSelect,
}: AnswersProps) {
  const { answers } = useQuizPreview();

  switch (variant) {
    case QuestionType.MULTIPLE_CHOICE:
    case QuestionType.TRUE_FALSE:
      return (
        <div>
          {options.map((option, index) => {
            return (
              <div
                className='question-multiple-choice-answer-input'
                key={index}
              >
                <input
                  className='focus-ring'
                  id={option}
                  type='radio'
                  name={`question-${questionIndex}`}
                  checked={option === answers[questionIndex][0]}
                  value={option}
                  onChange={() => handleAnswerSelect(option, 0)}
                  disabled={disabled}
                />
                <label
                  className='w-100'
                  style={{
                    color: disabled ? '#6E7173' : '#000',
                  }}
                  htmlFor={option}
                >
                  {option}
                </label>
              </div>
            );
          })}
        </div>
      );
    case QuestionType.FILL_IN_THE_BLANK:
      return (
        <div className='d-flex flex-column gap-2 mb-3'>
          {options.map((option, index) => (
            <div
              className='question-fill-in-the-blank-answer-input'
              key={index}
            >
              <label htmlFor={option}>{index + 1}.</label>
              <input
                className='p-2'
                id={option}
                value={answers[questionIndex][index]}
                type='text'
                onChange={(e) => handleAnswerSelect(e.target.value, index)}
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      );
    default: {
      return <></>;
    }
  }
}
