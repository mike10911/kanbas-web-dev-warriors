import React from 'react';
import {
  FaCaretDown,
  FaCheckCircle,
  FaEllipsisV,
  FaGripVertical,
  FaPlus,
} from 'react-icons/fa';
import { MdOutlineAssignment } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { assignments } from '../../Database';
import './index.css';

export const formatDate = (date: Date) => {
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const isAM = Math.floor(hour / 12) < 1;

  return `${month} ${day} at ${hour % 12}:${min < 10 ? '0' : ''}${min}${
    isAM ? 'am' : 'pm'
  }`;
};

const isAvailableNow = (available: Date) => {
  return available.getTime() < new Date().getTime();
};

function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return (
    <div className='flex-fill d-flex flex-column'>
      <div className='d-flex justify-content-between'>
        <input type='text' placeholder='Search for Assignment' />
        <div className='d-flex gap-1'>
          <button className='btn wd-modules-btn d-flex align-items-center'>
            <FaPlus className='me-1' /> Group
          </button>
          <button className='btn btn-danger d-flex align-items-center'>
            <FaPlus className='me-1' /> Assignment
          </button>
          <button className='btn wd-modules-btn p-1'>
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr />
      <ul className='list-group wd-modules'>
        <li className='list-group-item'>
          <div className='d-flex flex-row align-items-center justify-content-between'>
            <div className='d-flex flex-row align-items-center gap-1'>
              <FaGripVertical />
              <FaCaretDown />
              ASSIGNMENTS
            </div>
            <span className='d-flex flex-row align-items-center gap-2'>
              <span className='wd-assignment-pill'>40% of Total</span>
              <FaPlus className='ms-2' />
              <FaEllipsisV className='ms-2' />
            </span>
          </div>
          <ul className='list-group'>
            {assignmentList.map((assignment) => (
              <li className='list-group-item'>
                <div className='d-flex flex-row align-items-center justify-content-between'>
                  <div className='d-flex flex-row align-items-center gap-3'>
                    <FaGripVertical />
                    <MdOutlineAssignment
                      className='fs-5'
                      style={{ color: 'green' }}
                    />
                    <div className='d-flex flex-column'>
                      <Link
                        className='wd-assignment-link'
                        to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                      >
                        <strong>{assignment.title}</strong>
                      </Link>
                      <span className='wd-assignment-subtitle'>
                        <span>
                          <Link
                            className='text-danger wd-assignment-subtitle-link'
                            to={``}
                          >
                            Multiple Modules
                          </Link>
                          {' | '}
                        </span>
                        {!isAvailableNow(
                          new Date(assignment.availableDate)
                        ) && (
                          <span>
                            <strong>Not available until</strong>{' '}
                            {formatDate(new Date(assignment.availableDate))}
                            {' | '}
                          </span>
                        )}
                        <span>
                          <strong>Due</strong>{' '}
                          {formatDate(new Date(assignment.dueDate))}
                          {' | '}
                        </span>
                        <span>{assignment.points} points</span>
                      </span>
                    </div>
                  </div>
                  <span className='d-flex flex-row align-items-center gap-1'>
                    <FaCheckCircle className='text-success' />
                    <FaEllipsisV className='ms-2' />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Assignments;
