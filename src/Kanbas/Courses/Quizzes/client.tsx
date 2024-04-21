import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const QUIZ_API = `${API_BASE}/api`;


export interface Question {
    _id: string;
    type: string;
    points: number;
    description: string;
    options: string[];
    answers: string[];
}

export interface Quiz {
    _id: string;
    courseId: string;
    isPublished: boolean;
    questions: Question[];
    title: string;
    description: string;
    type: string;
    points: number;
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    showCorrectAnswers: string;
    accessCode: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate: string;
    availableDate: string;
    untilDate: string;
}

export async function findCourseQuizzes(courseId: string): Promise<Quiz[]> {
    // /course/:courseId/quizzes
    const response = await axios.get(`${QUIZ_API}/quizzes/course/${courseId}`);
    return response.data;
};
export const createQuiz = async (quiz: any) => {
    const response = await axios.post(`${QUIZ_API}/quizzes`, quiz);
    return response.data;
};

export const deleteQuiz = async (quizId: any) => {
    const response = await axios.delete(`${QUIZ_API}/quizzes/${quizId}`);
    return response.data;
};
export const updateQuiz = async (quiz: any) => {
    const response = await axios.put(`${QUIZ_API}/quizzes/${quiz._id}`, quiz);
    return response.data;
}
export const publishQuiz = async (quizId: any, isPublished: any) => {
    const response = await axios.put(`${QUIZ_API}/quizzes/${quizId}/publish`, { isPublished });
    return response.data;
};
export const findQuiz = async (quizId: any) => {
    const response = await axios.get(`${QUIZ_API}/quizzes/${quizId}`);
    return response.data;
};




