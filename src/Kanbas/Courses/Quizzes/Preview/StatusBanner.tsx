import { ImNotification } from 'react-icons/im';
import './StatusBanner.css';

export interface StatusBannerProps {
  message: string;
}

export default function StatusBanner({ message }: StatusBannerProps) {
  return (
    <div className='d-flex flex-row align-items-center gap-2 rounded status-banner'>
      <ImNotification />
      <p className='m-0 p-0'>{message}</p>
    </div>
  );
}
