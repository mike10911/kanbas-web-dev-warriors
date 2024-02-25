import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { Course } from '..';

export interface DashboardProps {
  courses: Course[];
  course: Course;
  setCourse: Dispatch<SetStateAction<Course>>;
  addNewCourse: () => void;
  deleteCourse: (id: string) => void;
  updateCourse: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}) => {
  return (
    <div className='p-4'>
      <h1>Dashboard</h1>
      <h4>Course</h4>
      <div className='d-flex flex-column gap-3'>
        <div className='d-flex flex-column gap-2'>
          <label>
            Course Name
            <input
              value={course.name}
              placeholder='Enter course name'
              className='form-control'
              onChange={(e) =>
                setCourse((c) => ({ ...c, name: e.target.value }))
              }
            />
          </label>
          <label>
            Course Number
            <input
              value={course.number}
              placeholder='Enter course number'
              className='form-control'
              onChange={(e) =>
                setCourse((c) => ({ ...c, number: e.target.value }))
              }
            />
          </label>
          <div className='d-flex gap-3'>
            <label>
              Start Date
              <input
                value={course.startDate}
                placeholder='Enter the start date of the course'
                className='form-control'
                type='date'
                onChange={(e) =>
                  setCourse((c) => ({ ...c, startDate: e.target.value }))
                }
              />
            </label>
            <label>
              End Date
              <input
                value={course.endDate}
                className='form-control'
                type='date'
                onChange={(e) =>
                  setCourse((c) => ({ ...c, endDate: e.target.value }))
                }
              />
            </label>
          </div>
        </div>
        <div className='d-flex gap-2 align-items-center'>
          <button className='btn btn-primary' onClick={addNewCourse}>
            Add
          </button>
          <button className='btn btn-secondary' onClick={updateCourse}>
            Update
          </button>
        </div>
      </div>
      <hr />
      <div className='container-fluid'>
        <h2>Published Courses ({courses.length})</h2>
        <hr />
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mx-0 gap-4 align-items-stretch'>
          {courses.map((course) => (
            <div
              key={course._id}
              className='col px-0 mt-3 d-flex wd-card-container'
            >
              <div className='card w-100'>
                <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                  <img
                    className='card-img-top wd-card-img'
                    src={`/images/${course.image}`}
                    alt={`course card for ${course.name}`}
                  />
                </Link>
                <div className='card-body d-flex flex-column align-items-start'>
                  <div className='d-flex align-items-center justify-content-between w-100'>
                    <Link
                      className='card-title my-0 wd-card-title'
                      to={`/Kanbas/Courses/${course._id}/Home`}
                    >
                      {course.name}
                    </Link>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => {
                        deleteCourse(course._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <p className='card-subtitle mb-auto'>
                    {course._id} {course.number} {course.name}
                  </p>
                  <div className='d-flex align-items-center justify-content-between mt-2 w-100'>
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className='btn btn-primary'
                    >
                      Go
                    </Link>
                    <button
                      className='btn btn-secondary'
                      onClick={() => {
                        setCourse(course);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
