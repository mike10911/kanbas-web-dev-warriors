import { useMemo } from 'react';
import { useLocation } from 'react-router';
import CourseNavigationMobile from '../Courses/Navigation/CourseNavigationMobile';

const PageNavigationMobile = () => {
  const { pathname } = useLocation();
  const currentPage = useMemo(() => {
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
    return routes.find((route) => kanbasLinks.includes(route));
  }, [pathname]);
  const pageNav = useMemo(() => {
    switch (currentPage) {
      case 'Courses':
        const routes = pathname.split('/');
        const courseId = routes.at(
          routes.findIndex((route) => route === 'Courses') + 1
        );
        return <CourseNavigationMobile courseId={courseId} />;
      default:
        return <></>;
    }
  }, [currentPage, pathname]);

  return <div className='d-lg-none'>{pageNav}</div>;
};

export default PageNavigationMobile;
