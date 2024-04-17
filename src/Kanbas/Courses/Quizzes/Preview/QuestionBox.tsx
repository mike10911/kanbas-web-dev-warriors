/**
 * the question box with all the question details and stuff
 * <BiSolidTag />
 * <BiTag />
 * 
 * 
 * use these ones:
<PiTagSimple />
<PiTagSimpleFill />


 */
import { PiTagSimple, PiTagSimpleFill } from 'react-icons/pi';
import { Question } from '.';
import { useState } from 'react';
import * as DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import './QuestionBox.css';
import Answers from './Answers';

export interface QuestionBoxProps {
  question: Question;
}

const tagStyle = {
  position: 'relative',
  top: 0,
  right: 0,
  transform: 'translateX(-10px)',
  fontSize: '1.5rem',
  color: 'black',
} as React.CSSProperties;

const testDesc =
  '<p>This is a test <strong>question</strong> <s><u>description</u></s> with different types of editor styling.<em> This is Italics </em><strong><em>woah....</em></strong> back to normal!</p><p><br></p><p>Line break goes crazy!</p>';

export default function QuestionBox({ question }: QuestionBoxProps) {
  const descriptionSanitized = DOMPurify.sanitize(testDesc);
  return (
    <div className='d-flex flex-column question-box'>
      <div className='d-flex flex-row question-box-header'>
        {/* {tagged ? (
          <PiTagSimpleFill style={tagStyle} />
        ) : (
          <PiTagSimple style={tagStyle} />
        )} */}
        <div className='d-flex flex-row w-100 py-2 px-4 justify-content-between align-items-center'>
          <p className='m-0 pt-1'>{question.title}</p>
          <p className='m-0 pt-1' style={{ color: '#6E7173' }}>
            {question.points} pts
          </p>
        </div>
      </div>
      <div className='d-flex flex-column mt-1 pt-4 pb-3 px-3'>
        {parse(descriptionSanitized)}
        <Answers answers={question.answers} variant={question.type} />
      </div>
    </div>
  );
}
