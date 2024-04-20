import { useEffect, useState } from "react";
import "./QuestionsTab.css";
import { FaBan, FaCheck, FaPlus, FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Question, QuestionType } from "../types";
import QuestionEditor from "./QuestionEditor";

function QuestionsTab() {
  const [points, setPoints] = useState(0);
  const [published, setPublished] = useState(false);
  const [notifyUsers, setNotifyUsers] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [initialQuestions, setInitialQuestions] = useState<Question[]>([]);

  // TODO: PULL QUESTIONS FROM DB ?
  useEffect(() => {
    setQuestions([]);
    setInitialQuestions([]);
  }, []);

  const addNewQuestion = () => {
    const newQuestion: Question = {
      title: "",
      type: QuestionType.MultipleChoice,
      points: 0,
      description: "",
      answers: [],
      options: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (index: number, question: Question) => {
    const updatedQuestions: Question[] = [...questions];
    updatedQuestions[index] = question;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    // TODO: MAKE BACKEND REQUESTS
    // post all newQuestions
    // put all questions
  };

  const handleCancel = () => {
    setQuestions(JSON.parse(JSON.stringify(initialQuestions)));
  };

  const handleSaveAndPublish = () => {
    handleSave();
    // TODO: ADD PUBLISH QUIZ
  };

  return (
    <div className="flex-fill">
      <div className="question-editor-header">
        <div className="points-text">Points {points} </div>
        <div>
          {published ? (
            <>
              <FaCheck style={{ alignSelf: "center", color: "green" }} />{" "}
              Published
            </>
          ) : (
            <>
              <FaBan style={{ alignSelf: "center", color: "grey" }} /> Not
              Published{" "}
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="questions">
        {questions.map((question, idx) => (
          <QuestionEditor
            key={idx}
            index={idx}
            question={question}
            updateQuestion={updateQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))}
      </div>
      <div className="question-editor-buttons-footer">
        <button className="btn wd-modules-btn" onClick={addNewQuestion}>
          {" "}
          <FaPlus style={{ color: "grey", marginRight: "0.2em" }} /> New
          Question
        </button>
        <button className="btn wd-modules-btn">
          {" "}
          <FaPlus style={{ color: "grey", marginRight: "0.2em" }} /> New
          Question Group
        </button>
        <button className="btn wd-modules-btn">
          {" "}
          <FaMagnifyingGlass
            style={{ color: "grey", marginRight: "0.2em" }}
          />{" "}
          Find Question
        </button>
      </div>
      <hr />
      <div className="question-editor-publish-footer">
        <label>
          <input
            type="checkbox"
            name="notify"
            onChange={(e) => setNotifyUsers(e.target.checked)}
          />{" "}
          Notify users this quiz has changed
        </label>
        <div className="d-flex flex-row">
          <button className="btn wd-modules-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn wd-modules-btn" onClick={handleSaveAndPublish}>
            Save & Publish
          </button>
          <button className="btn btn-danger" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default QuestionsTab;
