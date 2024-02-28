import { useState } from 'react';
import './index.css';
import {
  FaEllipsisV,
  FaCheckCircle,
  FaGripVertical,
  FaCaretDown,
  FaPlus,
  FaRegCheckCircle,
} from 'react-icons/fa';
import { useParams } from 'react-router';
import { KanbasState, Module } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  setModule,
  addModule,
  updateModule,
  deleteModule,
} from './modulesReducer';

function ModuleList() {
  const { courseId } = useParams();
  const moduleList = useSelector((state: KanbasState) =>
    state.modulesReducer.modules.filter((m) => m.course === courseId)
  );
  // module whose lessons are currently displayed
  const [selectedModule, setSelectedModule] = useState<Module | null>(
    moduleList.length > 0 ? moduleList[0] : null
  );
  // module that is selected by the form
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();

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
      <div className='d-flex flex-column mb-3'>
        <h4>Add Module</h4>
        <div className='d-flex flex-column gap-3'>
          <label className='d-flex flex-column'>
            Module Name
            <input
              value={module.name}
              onChange={(e) =>
                dispatch(
                  setModule({
                    ...module,
                    name: e.target.value,
                  })
                )
              }
            />
          </label>
          <label className='d-flex flex-column'>
            Module Description
            <textarea
              value={module.description}
              onChange={(e) =>
                dispatch(
                  setModule({
                    ...module,
                    description: e.target.value,
                  })
                )
              }
            />
          </label>
          <div className='d-flex gap-3'>
            <button
              className='btn btn-primary'
              onClick={() =>
                dispatch(addModule({ ...module, course: courseId }))
              }
            >
              Add
            </button>
            <button
              className='btn btn-secondary'
              onClick={() => {
                dispatch(updateModule(module));
                if (module._id === selectedModule?._id) {
                  setSelectedModule(module);
                }
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <ul className='list-group wd-modules'>
        {moduleList.map((module) => (
          <li
            key={module._id}
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
                <button
                  className='btn btn-secondary btn-sm ms-2'
                  onClick={() => dispatch(setModule(module))}
                >
                  Edit
                </button>
                <button
                  className='btn btn-danger btn-sm ms-2'
                  onClick={() => dispatch(deleteModule(module._id))}
                >
                  Delete
                </button>
                <FaEllipsisV />
              </span>
            </div>
            {selectedModule?._id === module._id && (
              <ul className='list-group'>
                {module.lessons?.map((lesson) => (
                  <li key={lesson._id} className='list-group-item'>
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
