import { Answer, QuestionType } from ".";

export interface AnswersProps {
  answers: string[];
  variant?: QuestionType;
}
export default function Answers({
  answers,
  variant = QuestionType.MULTIPLE_CHOICE,
}: AnswersProps) {
  switch (variant) {
    case QuestionType.MULTIPLE_CHOICE:
    case QuestionType.TRUE_FALSE:
      return (
        <div>
          {answers.map((answer, index) => (
            <div className="question-multiple-choice-answer-input" key={index}>
              <input
                className="focus-ring"
                id={answer}
                type="radio"
                name="answer"
                value={answer}
              />
              <label className="w-100" htmlFor={answer}>
                {answer}
              </label>
            </div>
          ))}
        </div>
      );
    case QuestionType.FILL_IN_THE_BLANK:
      return (
        <div className="d-flex flex-column gap-2">
          {answers.map((answer, index) => (
            <div
              className="question-fill-in-the-blank-answer-input"
              key={index}
            >
              <label htmlFor={answer}>{index + 1}.</label>
              <input className="p-2" id={answer} type="text" />
            </div>
          ))}
        </div>
      );
    default: {
      return <></>;
    }
  }
}
