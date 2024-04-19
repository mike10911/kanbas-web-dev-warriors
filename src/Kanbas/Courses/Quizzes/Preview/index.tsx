import React, { useState } from "react";
import QuizHeaderPreview from "./QuizPreviewHeader";
import QuizContent from "./QuizContent";
import QuestionList from "./QuestionList";
import { quizzes } from "../../../Database";

export type Answer = {
  answer: string;
  correct: boolean;
};

export enum QuestionType {
  MULTIPLE_CHOICE = "Multiple Choice",
  TRUE_FALSE = "True/False",
  FILL_IN_THE_BLANK = "Fill in the Blank",
}

export type Question = {
  _id: number;
  title: string;
  type: QuestionType;
  points: number;
  description: string;
  answers: Answer[];
  options: string[];
};

export enum QuizType {
  GRADED_QUIZ = "Graded Quiz",
  PRACTICE_QUIZ = "Practice Quiz",
  GRADED_SURVEY = "Graded Survey",
  UNGRADED_SURVEY = "Ungraded Survey",
}

export enum AssignmentGroup {
  QUIZZES = "Quizzes",
  ASSIGNMENTS = "Assignments",
  EXAMS = "Exams",
  PROJECTS = "Projects",
}

export type Quiz = {
  _id: number;
  isPublished: boolean;
  questions: Question[];
  title: string;
  description: string;
  type: QuizType;
  points: number;
  assignmentGroup: AssignmentGroup;
  shuffleAnswers: boolean;
  timeLimit?: number;
  multipleAttempts: boolean;
  showCorrectAnswers?: Date;
  accessCode?: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: Date;
  availableDate: Date;
  untilDate: Date;
};

/*

preview needs:
- quiz title
banner to say that it's a preview
- date quiz started at (assume it's the datetime the moment the faculty click to preview the quiz)
- show question either one at a time or all at once in a long vertical scroll
- each question needs to show:
  - title in top left
  - description
  - points in top right
  - list of all answers in the proper input format
  - next button to go to next question if there are more questions (dont show if it's the last question)
- show submit button for overall quiz below question box and with the last updated at time next to it
- show button below submit for going back to quiz editor screen for the particular question
- at bottom, show list of all questions where the links are all clickable and the current question link is bolded
*/
const QuizPreview = () => {
  const quizTitle = "Q1 - HTML";
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleChangeQuestion = (index: number) =>
    setCurrentQuestionIndex(index);

  return (
    <div className="d-flex flex-column gap-1">
      <QuizHeaderPreview title={quizTitle} startedAt={new Date()} />
      <QuizContent
        oneQuestionAtATime={true}
        currentQuestionIndex={currentQuestionIndex}
        questions={quizzes[0].questions as Question[]}
        handleChangeQuestion={setCurrentQuestionIndex}
        // TODO: wire in to change from quiz preview to editor
        handleEdit={() => {}}
        handleSubmit={() => {}}
      />
      <QuestionList
        questions={quizzes[0].questions as Question[]}
        currentQuestionIndex={currentQuestionIndex}
        handleChangeQuestion={handleChangeQuestion}
      />
    </div>
  );
};

export default QuizPreview;
