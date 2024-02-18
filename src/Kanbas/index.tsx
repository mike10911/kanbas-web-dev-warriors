import { Navigate, Route, Routes } from 'react-router';
import KanbasNavigation from './Navigation';
import './index.css';
import Dashboard from './Dashboard';
import Courses from './Courses';

function Kanbas() {
  return (
    <div className='d-flex flex-column flex-lg-row'>
      <KanbasNavigation />
      <div style={{ flexGrow: 1 }}>
        <Routes>
          <Route path='/' element={<Navigate to='Dashboard' />} />
          <Route path='Account' element={<h1>Account</h1>} />
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='Courses/:courseId/*' element={<Courses />} />
          <Route path='*' element={<h1>Page not implemented</h1>} />
        </Routes>
      </div>
    </div>
  );
}
export default Kanbas;
