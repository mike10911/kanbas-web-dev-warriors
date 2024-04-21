export enum AnswerTagVariant {
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
  ANSWER = 'ANSWER',
}

export interface AnswerTagProps {
  variant: AnswerTagVariant;
}

export default function AnswerTag({ variant }: AnswerTagProps) {
  const tagText = (variant: AnswerTagVariant) => {
    switch (variant) {
      case AnswerTagVariant.CORRECT:
        return 'Correct!';
      case AnswerTagVariant.INCORRECT:
        return 'You Answered';
      case AnswerTagVariant.ANSWER:
        return 'Correct Answer';
    }
  };

  const tagArrowColor = (variant: AnswerTagVariant) => {
    switch (variant) {
      case AnswerTagVariant.CORRECT:
        return '#28a745';
      case AnswerTagVariant.INCORRECT:
        return '#dc3545';
      case AnswerTagVariant.ANSWER:
        return '#d3d3d3';
      // return '#efefef';
    }
  };

  const tagTextColor = (variant: AnswerTagVariant) => {
    switch (variant) {
      case AnswerTagVariant.CORRECT:
      case AnswerTagVariant.INCORRECT:
        return 'text-white';
      case AnswerTagVariant.ANSWER:
        return 'text-dark';
    }
  };

  return (
    <div
      className='d-flex flex-row gap-0 align-items-center position-absolute'
      style={{
        width: 'fit-content',
        top: variant === AnswerTagVariant.INCORRECT ? '3px' : '-3px',
        left: '-162px',
        zIndex: 50,
      }}
    >
      <span
        className={`${tagTextColor(
          variant
        )} py-1 px-2 rounded-start text-center`}
        style={{
          width: '150px',
          height: '30px',
          lineHeight: '22px',
          backgroundColor: tagArrowColor(variant),
        }}
      >
        {tagText(variant)}
      </span>
      <div
        style={{
          fontSize: '0px',
          lineHeight: '0%',
          width: '0px',
          borderTop: '15px solid transparent',
          borderLeft: `10px solid ${tagArrowColor(variant)}`,
          borderBottom: '15px solid transparent',
        }}
      />
    </div>
  );
}
