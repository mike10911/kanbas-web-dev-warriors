import useQuizPreview from '../hooks/useQuizPreview';
import './AnswerList.css';
import AnswerTag, { AnswerTagVariant } from './AnswerTag';
import { QuestionType } from './constants';

export interface AnswerListProps {
  questionAnswers: string[];
  questionIndex: number;
  variant: QuestionType;
}

export default function AnswerList({
  questionAnswers,
  questionIndex,
  variant,
}: AnswerListProps) {
  const { answers, quizResults } = useQuizPreview();

  const correctAnswerSingleAnswer = quizResults![questionIndex].result[0];

  return (
    <div className='d-flex flex-column gap-0 w-100 mt-4'>
      <AnswerTag variant={AnswerTagVariant.ANSWER} />
      <ul className='ms-0 mb-2 p-0'>
        {variant === QuestionType.FILL_IN_THE_BLANK && (
          <>
            {answers[questionIndex].map((answer, index) => {
              const correctAnswer = quizResults![questionIndex].result[index];
              return (
                <li className='answer-list-item' key={index}>
                  <hr className='m-2' />
                  <p>
                    <strong>Answer {index + 1}:</strong>
                  </p>
                  <div className='position-relative'>
                    <AnswerTag
                      variant={
                        correctAnswer
                          ? AnswerTagVariant.CORRECT
                          : AnswerTagVariant.INCORRECT
                      }
                    />
                    <p
                      className={`${correctAnswer ? 'mb-0' : 'py-1 mb-2'} ps-4`}
                      style={{
                        // need transparent border to align text with any incorrect answers
                        border: correctAnswer
                          ? '2px solid transparent'
                          : '2px solid red',
                        borderRadius: correctAnswer ? '' : '4px',
                      }}
                    >
                      {answer ? answer : <i>No answer provided</i>}
                    </p>
                  </div>
                  {!correctAnswer && (
                    <div className='position-relative'>
                      <AnswerTag variant={AnswerTagVariant.ANSWER} />
                      <p
                        className='d-flex flex-row ps-4 mb-0'
                        style={{
                          // need transparent border to align text with any incorrect answers
                          border: '2px solid transparent',
                        }}
                      >
                        {questionAnswers[index]}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </>
        )}
        {(variant === QuestionType.MULTIPLE_CHOICE ||
          variant === QuestionType.TRUE_FALSE) && (
          <li className='answer-list-item'>
            <hr />
            <p>
              <strong>Answer:</strong>
            </p>
            <div className='position-relative'>
              <AnswerTag
                variant={
                  correctAnswerSingleAnswer
                    ? AnswerTagVariant.CORRECT
                    : AnswerTagVariant.INCORRECT
                }
              />
              <p
                className={`${
                  correctAnswerSingleAnswer ? 'mb-0' : 'py-1 mb-2'
                } ps-4`}
                style={{
                  // need transparent border to align text with any incorrect answers
                  border: correctAnswerSingleAnswer
                    ? '2px solid transparent'
                    : '2px solid red',
                  borderRadius: correctAnswerSingleAnswer ? '' : '4px',
                }}
              >
                {answers[questionIndex][0] ? (
                  answers[questionIndex][0]
                ) : (
                  <i>No answer selected</i>
                )}
              </p>
            </div>
            {!correctAnswerSingleAnswer && (
              <div className='position-relative'>
                <AnswerTag variant={AnswerTagVariant.ANSWER} />
                <p
                  className='d-flex flex-row ps-4 mb-0'
                  style={{
                    // need transparent border to align text with any incorrect answers
                    border: '2px solid transparent',
                  }}
                >
                  {questionAnswers[0]}
                </p>
              </div>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
