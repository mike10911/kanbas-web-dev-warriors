import { Link, useLocation, useParams } from 'react-router-dom';
import './index.css';
import { courses } from '../../Database';

function CourseNavigation() {
  const links = ['Home', 'Modules', 'Piazza', 'Grades', 'Assignments'];
  const { pathname } = useLocation();
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);

  return (
    <div
      className='d-none d-md-flex flex-column sticky-top align-self-start'
      style={{ zIndex: 1 }}
    >
      <p
        className='fst-italic text-nowrap overflow-hidden text-truncate mx-2 my-0 ps-4 pt-3 pb-2 align-center'
        style={{ width: '120px', fontSize: '10px' }}
      >
        {course?.number}.{course?._id}.{course?.name.replace(' ', '_')}
      </p>
      <ul className='wd-navigation'>
        {links.map((link, index) => (
          <li
            key={index}
            className={pathname.includes(link) ? 'wd-active' : ''}
          >
            <Link to={link}>{link}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseNavigation;
