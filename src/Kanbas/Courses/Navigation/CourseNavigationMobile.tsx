import { FaBookOpen, FaHome, FaPlug } from "react-icons/fa";
import "./CourseNavigationMobile.css";
import { FaCircleNodes } from "react-icons/fa6";
import { MdOutlineAssignment } from "react-icons/md";
import { Link } from "react-router-dom";

interface CourseNavigationMobileProps {
  courseId?: string;
}

const CourseNavigationMobile: React.FC<CourseNavigationMobileProps> = ({
  courseId,
}) => {
  const courseLinks = [
    {
      label: "Home",
      icon: <FaHome />,
    },
    {
      label: "Modules",
      icon: <FaCircleNodes />,
    },
    {
      label: "Piazza",
      icon: <FaPlug />,
    },
    {
      label: "Grades",
      icon: <FaBookOpen />,
    },
    {
      label: "Assignments",
      icon: <MdOutlineAssignment />,
    },
    {
      label: "Quizzes",
      icon: <MdOutlineAssignment />,
    },
  ];
  return (
    <div className="wd-navigation-mobile d-lg-none">
      <ul>
        {courseLinks.map((link, index) => (
          <li key={index}>
            <Link to={`/Kanbas/Courses/${courseId}/${link.label}`}>
              {" "}
              {link.icon} {link.label}{" "}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseNavigationMobile;
