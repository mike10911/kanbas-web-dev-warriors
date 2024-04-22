import { createSlice } from "@reduxjs/toolkit";

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const initialState = {
  quizzes: [] as any[],
  quiz: {
    title: "New Quiz",
    availableDate: formatDate("2023-01-15"),
    availableUntilDate: formatDate("2023-02-15"),
    dueDate: formatDate("2023-02-10"),
    point: 100,
    numberOfQuestions: 0,
    isPublished: false,
    type: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: true,
    timeLimitMinutes: 20,
    multipleAttempts: false,
    showCorrectAnswer: true,
    accessCode: "",
    oneQuestionAtATime: true,
    webcameRequired: false,
    lockQuestionAfterAnswering: false,
  },
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz(state, action) {
      state.quizzes = [action.payload, ...state.quizzes];
    },
    deleteQuiz(state, action) {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },

    updateQuiz(state, action) {
      state.quizzes = state.quizzes.map((quiz: any) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz(state, action) {
      state.quiz = action.payload;
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    setPublish: (state, action) => {
      const quiz = state.quizzes.find(
        (quiz) => quiz._id === action.payload.quizId
      );
      if (quiz) {
        quiz.isPublished = action.payload.isPublished;
      }
    },
  },
});
export const {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
  setPublish,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;