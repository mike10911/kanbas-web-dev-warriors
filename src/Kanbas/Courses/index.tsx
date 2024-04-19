import { Navigate, Route, Routes, useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import { useState } from "react";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import Breadcrumbs from "./Breadcrumbs";
import { Course } from "..";
import Quizzes from "./Quizzes";
import QuizPreview from "./Quizzes/Preview";
import QuizEditor from "./Quizzes/Editor/QuizEditor";
import QuestionsTab from "./Quizzes/Editor/QuestionsTab";

export interface CoursesProps {
  courses: Course[];
}

const Courses: React.FC<CoursesProps> = ({ courses }) => {
  const [showCourseNav, setShowCourseNav] = useState(true);
  const { courseId } = useParams();

  return (
    <div>
      <Breadcrumbs
        courseId={courseId}
        courses={courses}
        onHamburgerClick={setShowCourseNav}
      />
      <hr className="d-none d-lg-block mx-4 my-0" />
      <div className={`d-flex mx-4 ${showCourseNav ? "ms-md-0" : ""}`}>
        {showCourseNav && <CourseNavigation courses={courses} />}
        <div className={"flex-fill my-3"}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:quizId/preview" element={<QuizPreview />} />
            <Route
              path="Quizzes/:quizId/questions"
              element={<QuestionsTab />}
            />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Quizzes/:quizId" element={<QuizEditor />} />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Courses;
