export enum QuestionType {
  MultipleChoice = "Multiple Choice",
  TrueFalse = "True/False",
  FillInTheBlank = "Fill in the Blank",
}

export type Question = {
  title: string;
  type: QuestionType;
  points: number;
  description: string;
  options: string[];
  answers: string[];
};

export enum TrueFalseAnswer {
  true = "True",
  false = "False",
}
