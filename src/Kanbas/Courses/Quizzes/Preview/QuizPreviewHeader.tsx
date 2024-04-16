import { format } from 'date-fns';
import StatusBanner from './StatusBanner';

const PREVIEW_BANNER_MESSAGE =
  'This is a preview of the published version of the quiz';

const DATE_FORMAT = "MMM dd 'at' h:mmaaa";

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
