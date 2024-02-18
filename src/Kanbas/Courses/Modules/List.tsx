import React, { useState } from 'react';
import './index.css';
import { modules } from '../../Database';
import {
  FaEllipsisV,
  FaCheckCircle,
  FaGripVertical,
  FaCaretDown,
  FaPlus,
  FaRegCheckCircle,
} from 'react-icons/fa';
import { useParams } from 'react-router';

function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);
  return (
    <div className='flex-fill'>
      <div className='d-flex justify-content-end gap-1'>
        <button className='btn wd-modules-btn'>Collapse All</button>
        <button className='btn wd-modules-btn'>View Progress</button>
        <div className='dropdown'>
          <button className='btn dropdown-toggle wd-modules-btn'>
            <FaRegCheckCircle className='me-1' />
            Publish All
          </button>
        </div>
        <button className='btn btn-danger d-flex align-items-center'>
          <FaPlus className='me-1' /> Module
        </button>
        <button className='btn wd-modules-btn p-1'>
          <FaEllipsisV />
        </button>
      </div>
      <hr />
      <ul className='list-group wd-modules'>
        {modulesList.map((module) => (
          <li
            className='list-group-item'
            onClick={() => setSelectedModule(module)}
          >
            <div className='d-flex flex-row align-items-center justify-content-between'>
              <div className='d-flex flex-row align-items-center gap-1'>
                <FaGripVertical />
                <FaCaretDown />
                {module.name}
              </div>
              <span className='d-flex flex-row align-items-center gap-2'>
                <div className='dropdown'>
                  <div className='dropdown-toggle d-flex align-items-center'>
                    <FaCheckCircle className='text-success' />
                  </div>
                </div>
                <FaPlus className='ms-2' />
                <FaEllipsisV className='ms-2' />
              </span>
            </div>
            {selectedModule._id === module._id && (
              <ul className='list-group'>
                {module.lessons?.map((lesson) => (
                  <li className='list-group-item'>
                    <div className='d-flex flex-row align-items-center justify-content-between'>
                      <div className='d-flex flex-row align-items-center gap-1'>
                        <FaGripVertical className='me-2' />
                        {lesson.name}
                      </div>
                      <span className='d-flex flex-row align-items-center gap-1'>
                        <FaCheckCircle className='text-success' />
                        <FaEllipsisV className='ms-2' />
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModuleList;
