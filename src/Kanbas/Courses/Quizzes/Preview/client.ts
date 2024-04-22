import axios from "axios";
import { Quiz } from ".";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;
export const findQuizById = async (quizId: string): Promise<Quiz> => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: Quiz): Promise<void> => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};
