import { QuestionType } from "./Preview/constants";

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
