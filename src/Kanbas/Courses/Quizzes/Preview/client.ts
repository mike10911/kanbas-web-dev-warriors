import axios from 'axios';
import { Quiz } from '.';
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const QUIZZES_API = `${BASE_API}/api/quizzes`;
export const findQuizById = async (quizId: string): Promise<Quiz> => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  console.log('axios response', response);
  return response.data;
};
