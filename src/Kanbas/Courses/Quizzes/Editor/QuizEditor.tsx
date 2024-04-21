import { Link } from "react-router-dom";

function QuizEditor() {
  return (
    <div className="flex-fill d-flex gap-5">
      Quiz Editor
      <Link to={`./questions`}>Questions Editor</Link>
    </div>
  );
}

export default QuizEditor;
