import { FaXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import './index.css';

interface NavigationMobileProps {
  links: {
    label: string;
    icon: JSX.Element;
  }[];
  onClose: () => void;
}

const NavigationMobile: React.FC<NavigationMobileProps> = ({
  links,
  onClose,
}) => {
  return (
    <div className='wd-kanbas-navigation-mobile'>
      <ul>
        <li className='justify-content-end'>
          <FaXmark className='icon-btn' onClick={onClose} />
        </li>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={`/Kanbas/${link.label}`} onClick={onClose}>
              {' '}
              {link.icon} {link.label}{' '}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationMobile;
