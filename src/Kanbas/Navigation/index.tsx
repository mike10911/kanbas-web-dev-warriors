import { Link, useLocation } from 'react-router-dom';
import './index.css';
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaHistory,
  FaInbox,
  FaChevronDown,
  FaGlasses,
} from 'react-icons/fa';
import {
  FaRegCircleQuestion,
  FaRightFromBracket,
  FaXmark,
} from 'react-icons/fa6';
import { HiMiniBars3, HiVideoCamera } from 'react-icons/hi2';
import { courses } from '../Database';
import { useState, useMemo, useCallback } from 'react';
import NavigationMobile from './NavigationMobile';
import PageNavigationMobile from './PageNavigationMobile';

function KanbasNavigation() {
  const [showPageNavMobile, setShowPageNavMobile] = useState(false);
  const [showKanbasNavMobile, setShowKanbasNavMobile] = useState(false);
  const { pathname } = useLocation();
  const mobileHeader = useMemo(() => {
    const kanbasLinks = [
      'Account',
      'Dashboard',
      'Courses',
      'Calendar',
      'Inbox',
      'History',
      'Studio',
      'Commons',
      'Help',
    ];
    const routes = pathname.split('/');
    const currKanbasPage = routes.find((route) => kanbasLinks.includes(route));

    switch (currKanbasPage) {
      case 'Account':
        return (
          <p className='wd-modules-header fs-6 text-center'>Justin Pong</p>
        );
      case 'Courses':
        const courseId = routes.at(
          routes.findIndex((route) => route === 'Courses') + 1
        );
        const course = courses.find((course) => course._id === courseId);
        const links = ['Home', 'Modules', 'Piazza', 'Grades', 'Assignments'];
        const coursePage = routes.find((route) => links.includes(route));
        return (
          <p
            className='wd-modules-header fs-6 my-0 text-center'
            onClick={() =>
              setShowPageNavMobile((showPageNavMobile) => !showPageNavMobile)
            }
          >
            {course?.number}.{course?._id}.{course?.name.replace(' ', '_')}
            <br />
            {coursePage === 'Home' ? 'Modules' : coursePage}
          </p>
        );
      default:
        return (
          <p className='wd-modules-header fs-6 my-0 text-center'>
            {currKanbasPage}
          </p>
        );
    }
  }, [pathname]);
  const links = [
    {
      label: 'Account',
      icon: (
        <FaRegUserCircle
          id='account-icon'
          className='fs-2 wd-kanbas-nav-icon'
        />
      ),
    },
    {
      label: 'Dashboard',
      icon: <FaTachometerAlt className='fs-2 wd-kanbas-nav-icon' />,
    },
    {
      label: 'Courses',
      icon: <FaBook className='fs-2 wd-kanbas-nav-icon' />,
    },
    {
      label: 'Calendar',
      icon: <FaRegCalendarAlt className='fs-2 wd-kanbas-nav-icon' />,
    },
    {
      label: 'Inbox',
      icon: <FaInbox className='fs-2 wd-kanbas-nav-icon' />,
    },
    {
      label: 'History',
      icon: <FaHistory className='fs-2 wd-kanbas-nav-icon' />,
    },
    {
      label: 'Studio',
      icon: <HiVideoCamera className='fs-2 wd-kanbas-nav-icon' />,
    },
    {
      label: 'Commons',
      icon: <FaRightFromBracket className='fs-2 wd-kanbas-nav-icon' />,
    },
    {
      label: 'Help',
      icon: <FaRegCircleQuestion className='fs-2 wd-kanbas-nav-icon' />,
    },
  ];

  const handleKanbasNavClose = useCallback(
    () => setShowKanbasNavMobile(false),
    []
  );

  return (
    <>
      {showKanbasNavMobile && (
        <NavigationMobile
          links={[
            {
              label: 'Account',
              icon: (
                <FaRegUserCircle
                  id='account-icon'
                  className='fs-2 wd-kanbas-nav-icon'
                  style={{ color: 'gray' }}
                />
              ),
            },
            ...links.slice(1),
          ]}
          onClose={handleKanbasNavClose}
        />
      )}
      <div className='d-none d-lg-flex'>
        <ul className='wd-kanbas-navigation'>
          <li key='Northeastern logo'>
            <Link to='/Kanbas'>N</Link>
          </li>
          {links.map((link, index) => (
            <li
              key={index}
              className={pathname.includes(link.label) ? 'wd-active' : ''}
            >
              <Link to={`/Kanbas/${link.label}`}>
                {' '}
                {link.icon} {link.label}{' '}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='d-flex d-lg-none justify-content-between align-items-center px-4 py-3 bg-black'>
        <HiMiniBars3
          className='me-3 wd-kanbas-hamburger-icon fs-4 icon-btn'
          style={{ color: 'white' }}
          onClick={() => setShowKanbasNavMobile(true)}
        />
        {mobileHeader}
        <div className='d-flex align-center gap-2'>
          <FaGlasses className='me-1' style={{ color: 'white' }} />
          {showPageNavMobile && !pathname.includes('Dashboard') ? (
            <FaXmark
              className='fs-5 icon-btn'
              style={{ color: 'white' }}
              onClick={() => setShowPageNavMobile(false)}
            />
          ) : (
            <FaChevronDown
              className='fs-5 icon-btn'
              style={{ color: 'white' }}
              onClick={() => setShowPageNavMobile(true)}
            />
          )}
        </div>
      </div>
      {showPageNavMobile && !pathname.includes('Dashboard') && (
        <PageNavigationMobile />
      )}
    </>
  );
}
export default KanbasNavigation;
