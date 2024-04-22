import { FaChevronRight, FaGlasses } from "react-icons/fa";
import { HiMiniBars3 } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./Breadcrumbs.css";
import { Course } from "..";
import * as client from "./Quizzes/Preview/client";

export interface BreadcrumbsProps {
  courseId?: string;
  courses: Course[];
  onHamburgerClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  courseId,
  courses,
  onHamburgerClick,
}) => {
  const course = courses.find((course) => course._id === courseId);
  const { pathname } = useLocation();
  const page = useMemo(() => {
    const links = [
      "Home",
      "Modules",
      "Piazza",
      "Grades",
      "Assignments",
      "Quizzes",
    ];
    const routes = pathname.split("/");
    const currentPage = routes.find((route) => links.includes(route));
    return currentPage === "Home" ? "Modules" : currentPage;
  }, [pathname]);

  const [quizTitle, setQuizTitle] = useState<string>("");
  useEffect(() => {
    const fetchQuizTitle = async (quizId: string) => {
      const quiz = await client.findQuizById(quizId);
      setQuizTitle(quiz?.title || "");
    };
    if (page === "Quizzes") {
      const quizId = pathname.split("/Quizzes").at(-1)?.split("/").at(1);
      quizId && fetchQuizTitle(quizId);
    }
  }, [page, pathname]);

  return (
    <div className="d-none d-lg-flex justify-content-between align-items-center px-4 py-3">
      <div className="d-flex gap-3 align-items-center">
        <HiMiniBars3
          className="me-3 wd-kanbas-hamburger-icon fs-4 icon-btn"
          onClick={() => onHamburgerClick((showCourseNav) => !showCourseNav)}
        />
        <Link className="wd-breadcrumb-header fs-5" to="Home">
          {course?.number} {course?._id} {course?.name}
        </Link>
        <FaChevronRight className="fs-6" />
        <p className="m-0 fs-5">{page}</p>
        {page === "Assignments" && pathname.split("/").at(-1) !== page && (
          <>
            <FaChevronRight className="fs-6" />
            <p className="m-0 fs-5">Edit</p>
          </>
        )}
        {page === "Quizzes" && pathname.split("/").at(-1) !== page && (
          <>
            <FaChevronRight className="fs-6" />
            <p className="m-0 fs-5">{quizTitle}</p>
          </>
        )}
      </div>
      <button className="btn wd-modules-btn">
        <FaGlasses className="me-1" />
        Student View
      </button>
    </div>
  );
};

export default Breadcrumbs;
