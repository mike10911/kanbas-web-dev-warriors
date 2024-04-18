import { Link } from "react-router-dom";

function Quizzes() {
  return (
    <div className="flex-fill d-flex gap-5">
      <Link to={`./1`}>Editor</Link>
      Quizzes
    </div>
  );
}

export default Quizzes;
