import { Question } from "../types";
import "./QuestionEditor.css";

export interface QuizEditableQuestionProps {
  question: Question;
  index: number;
  updateQuestion: (index: number, question: Question) => void;
}

function QuestionEditor({
  question,
  index,
  updateQuestion,
}: QuizEditableQuestionProps) {
  const handleDescriptionOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedQuestion = { ...question, description: e.target.value };
    updateQuestion(index, updatedQuestion);
  };

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = { ...question, title: e.target.value };
    updateQuestion(index, updatedQuestion);
  };

  const handlePointsOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuestion = { ...question, points: parseInt(e.target.value) };
    updateQuestion(index, updatedQuestion);
  };

  return (
    <div className="flex-fill d-flex flex-column gap-1 border m-3">
      <div className="d-flex flex-row justify-content-between">
        <div className="d-flex flex-row w-75 p-2">
          <input
            className="form-control w-25 m-2"
            type="text"
            defaultValue={question.title}
            placeholder="Question Title"
            onChange={handleTitleOnChange}
          />
          <select className="form-select w-25 m-2">
            <option value="MultipleChoice">Multiple Choice</option>
            <option value="TrueFalse">True/False</option>
            <option value="FillInTheBlank">Fill in the Blank</option>
          </select>
        </div>
        <div className="points-container">
          pts:
          <input
            className="form-control w-25 points"
            type="number"
            min="0"
            onChange={handlePointsOnChange}
          />
        </div>
      </div>
      <hr />
      <div className="question-container">
        Question:
        <div>
          <input
            className="form-control"
            type="text"
            defaultValue={question.description}
            onChange={handleDescriptionOnChange}
            placeholder="Question Description"
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default QuestionEditor;
