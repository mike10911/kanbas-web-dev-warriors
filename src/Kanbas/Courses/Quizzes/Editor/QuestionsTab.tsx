import { useEffect, useState } from "react";
import "./QuestionsTab.css";
import { FaBan, FaCheck, FaPlus } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Question, QuestionType } from "../types";
import QuestionEditor from "./QuestionEditor";

function QuestionsTab() {
  const [points, setPoints] = useState(0);
  const [published, setPublished] = useState(false);
  const [notifyUsers, setNotifyUsers] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  // TODO: PULL QUESTIONS FROM DB
  useEffect(() => {
    setQuestions([]);
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
    console.log(questions);
  };

  const handleSave = () => {
    // TODO: MAKE BACKEND REQUESTS
    // post all newQuestions
    // put all questions
  };

  return (
    <div className="flex-fill">
      Quiz Questions Editor
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
          <button className="btn wd-modules-btn">Cancel</button>
          <button className="btn wd-modules-btn">Save & Publish</button>
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
