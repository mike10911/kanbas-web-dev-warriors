<<<<<<< HEAD
import QuizList from "./QuizList";
function Quizzes() {
  return (
    <div className='flex-fill d-flex gap-5'>
        <QuizList />
    </div>
  );
}

export default Quizzes;
=======
import { Link } from "react-router-dom";

function Quizzes() {
  return (
    <div className="flex-fill d-flex gap-5">
      {/* TODO: ROUTE TO REAL QUIZ */}
      <Link to={`./1`}>Editor</Link>
      Quizzes
    </div>
  );
}

export default Quizzes;
>>>>>>> main
