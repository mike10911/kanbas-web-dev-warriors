import { format } from 'date-fns';
import StatusBanner from './StatusBanner';
import { DATE_FORMAT, PREVIEW_BANNER_MESSAGE } from './constants';

export interface QuizPreviewHeaderProps {
  title: string;
  startedAt: Date;
}

export default function QuizPreviewHeader({
  title,
  startedAt,
}: QuizPreviewHeaderProps) {
  const currentDate = format(startedAt, DATE_FORMAT);
  return (
    <div className='d-flex flex-column gap-2'>
      <h3 className='m-0 p-0 fw-bold'>{title}</h3>
      <StatusBanner message={PREVIEW_BANNER_MESSAGE} />
      <p className='m-0 p-0'>Started: {currentDate}</p>
    </div>
  );
}
