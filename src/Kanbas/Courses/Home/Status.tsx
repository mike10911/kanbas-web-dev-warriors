import {
  FaBan,
  FaBullhorn,
  FaChartBar,
  FaRegBell,
  FaRegCalendarAlt,
  FaRegCheckCircle,
} from 'react-icons/fa';
import { AiOutlineAim } from 'react-icons/ai';
import { TbFileImport } from 'react-icons/tb';
import { FaRightFromBracket, FaXmark } from 'react-icons/fa6';
import './index.css';
import { useParams } from 'react-router';
import { assignments, courses } from '../../Database';
import { Link } from 'react-router-dom';
import { formatDate } from '../Assignments';

const Status = () => {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);
  const assignmentsList = assignments.filter(
    (assignment) => assignment.course === courseId
  );

  return (
    <div className='d-none d-xl-flex flex-grow-0 flex-column justify-content-start align-items-center wd-modules-btn-column gap-4'>
      <div className='d-flex flex-column align-items-start gap-1 w-100'>
        <h2>Course Status</h2>
        <div className='btn-group w-100'>
          <button className='btn wd-modules-btn'>
            <FaBan />
            Unpublish
          </button>
          <button className='btn wd-modules-btn-publish'>
            <FaRegCheckCircle />
            Published
          </button>
        </div>
      </div>
      <div className='d-flex flex-column gap-1 align-items-center w-100'>
        <button className='btn wd-modules-btn w-100 text-start'>
          <TbFileImport /> Import Existing Content
        </button>
        <button className='btn wd-modules-btn w-100 text-start'>
          <FaRightFromBracket /> Import From Commons
        </button>
        <button className='btn wd-modules-btn w-100 text-start'>
          <AiOutlineAim /> Choose Home Page
        </button>
        <button className='btn wd-modules-btn w-100 text-start'>
          <FaChartBar />
          View Course Stream
        </button>
        <button className='btn wd-modules-btn w-100 text-start'>
          <FaBullhorn /> New Announcement
        </button>
        <button className='btn wd-modules-btn w-100 text-start'>
          <FaChartBar />
          New Analytics
        </button>
        <button className='btn wd-modules-btn w-100 text-start'>
          <FaRegBell /> View Course Notifications
        </button>
      </div>
      <div className='d-flex flex-column align-items-start w-100 gap-2'>
        <div className='d-flex flex-column w-100'>
          <h2>To Do</h2>
          <hr className='w-100 my-2 mx-0' />
        </div>
        {assignmentsList.map((assignment) => (
          <div className='d-flex justify-content-between w-100'>
            <div className='d-flex gap-2'>
              <span
                className='text-pill'
                style={{ width: '20px', borderRadius: '50%' }}
              >
                1
              </span>
              <div className='d-flex justify-content-between'>
                <div className='d-flex flex-column'>
                  <Link className='wd-modules-link' to='.'>
                    {assignment.title}
                  </Link>
                  <p>
                    {assignment.points} points &#183;{' '}
                    {formatDate(new Date(assignment.dueDate))}
                  </p>
                </div>
              </div>
            </div>
            <FaXmark className='float-right' style={{ color: 'gray' }} />
          </div>
        ))}
      </div>
      <div className='d-flex flex-column align-items-start w-100 gap-2'>
        <div className='d-flex flex-column w-100'>
          <div className='d-flex justify-content-between align-items-center w-100'>
            <h2>Coming Up</h2>
            <Link className='wd-modules-link' to='.'>
              <i className='fa-regular fa-calendar'></i> View Calendar
            </Link>
          </div>
          <hr className='w-100 my-2 mx-0' />
        </div>
        <div className='d-flex gap-2'>
          <FaRegCalendarAlt className='mt-1' />
          <div className='d-flex flex-column'>
            <Link className='wd-modules-link' to='.'>
              Lecture
            </Link>
            <p>
              {course?.number}.{course?._id}.{course?.name}
            </p>
            <p>Sep 7 at 11:45am</p>
          </div>
        </div>
        <div className='d-flex gap-2'>
          <FaRegCalendarAlt className='mt-1' />
          <div className='d-flex flex-column'>
            <Link className='wd-modules-link' to='.'>
              Lecture
            </Link>
            <p>
              {course?.number}.{course?._id}.{course?.name.replace(' ', '_')}
            </p>
            <p>Sep 14 at 11:45am</p>
          </div>
        </div>
        <div className='d-flex gap-2'>
          <FaRegCalendarAlt className='mt-1' />
          <div className='d-flex flex-column'>
            <Link className='wd-modules-link' to='.'>
              Lecture
            </Link>
            <p>
              {course?.number}.{course?._id}.{course?.name.replace(' ', '_')}
            </p>
            <p>Sep 21 at 11:45am</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
