import { Navigate, Route, Routes } from 'react-router';
import KanbasNavigation from './Navigation';
import './index.css';
import Dashboard from './Dashboard';
import Courses from './Courses';
import { useState } from 'react';
import { courses as dbCourses } from './Database';
import { Provider } from 'react-redux';
import store from './store';

export type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
};

export const getDate = (offset: number = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${year}-${month < 10 ? '0' : ''}${month}-${
    day < 10 ? '0' : ''
  }${day}`;
};

function Kanbas() {
  const [courses, setCourses] = useState(dbCourses);
  const [course, setCourse] = useState<Course>({
    _id: '',
    name: 'Catification 101',
    number: 'RS5151',
    startDate: getDate(),
    endDate: getDate(60),
    image: 'cat-meme.png',
  });

  const addNewCourse = () => {
    const newCourse = {
      ...course,
      _id: 'RS' + new Date().getTime().toString(),
    };

    setCourses([...courses, newCourse]);
  };

  const deleteCourse = (id: string) => {
    setCourses((courses) => courses.filter((course) => course._id !== id));
  };

  const updateCourse = () => {
    setCourses((courses) =>
      courses.map((c) => (c._id === course._id ? course : c))
    );
  };
  return (
    <Provider store={store}>
      <div className='d-flex flex-column flex-lg-row'>
        <KanbasNavigation courses={courses} />
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path='/' element={<Navigate to='Dashboard' />} />
            <Route path='Account' element={<h1>Account</h1>} />
            <Route
              path='Dashboard'
              element={
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
              }
            />
            <Route
              path='Courses/:courseId/*'
              element={<Courses courses={courses} />}
            />
            <Route path='*' element={<h1>Page not implemented</h1>} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;
