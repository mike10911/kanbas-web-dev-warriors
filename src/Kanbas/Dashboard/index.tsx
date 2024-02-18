import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../Database';
import './index.css';

function Dashboard() {
  return (
    <div className='p-4'>
      <h1>Dashboard</h1>
      <hr />
      <div className='container-fluid'>
        <h2>Published Courses (7)</h2>
        <hr />
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mx-0 gap-4'>
          {courses.map((course) => (
            <div className='col h-100 px-0 mt-3 d-flex align-items-stretch wd-card-container'>
              <div className='card w-100'>
                <Link to={`/Kanbas/Courses/${course._id}/Home`}>
                  <img
                    className='card-img-top wd-card-img'
                    src={`/images/${course.image}`}
                    alt={`course card for ${course.name}`}
                  />
                </Link>
                <div className='card-body d-flex flex-column align-items-start'>
                  <Link
                    className='card-title my-0 wd-card-title'
                    to={`/Kanbas/Courses/${course._id}/Home`}
                  >
                    {course.name}
                  </Link>
                  <p className='card-subtitle mb-auto'>
                    {course._id} {course.number} {course.name}
                  </p>
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className='btn btn-primary mt-2'
                  >
                    Go
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
