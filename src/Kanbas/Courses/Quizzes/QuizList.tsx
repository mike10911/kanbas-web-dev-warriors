import { useEffect, useState } from "react";
import "./index.css";
import {
    FaEllipsisV,
    FaCheckCircle,
    FaGripVertical,
    FaCaretDown,
    FaPlus,
    FaRegCheckCircle,
} from "react-icons/fa";
import { useParams } from "react-router";
import { KanbasState, Module } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
    addModule,
    deleteModule,
    setModule,
    updateModule,
} from "../Modules/modulesReducer";
import { Link } from "react-router-dom";
import { formatDate } from "../Assignments";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const QUIZ_API = `${API_BASE}/api`;


interface Question {
    _id: string;
    type: string;
    points: number;
    description: string;
    options: (string | number)[];
    answers: (string | number)[];
}

interface Quiz {
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
    dueDate: Date;
    availableDate: Date;
    untilDate: Date;
}
//mock data

// Mock data for Quiz 1
const quiz1 = {
    _id: "quiz1",
    courseId: "course123",
    title: "Math Quiz 1",
    description: "Test your basic math skills.",
    type: "graded",
    points: 20,
    assignmentGroup: "Math Quizzes",
    shuffleAnswers: true,
    timeLimit: 15,
    isPublished: true,
    multipleAttempts: false,
    showCorrectAnswers: "after_attempt",
    accessCode: "123456",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: true,
    dueDate: new Date("2024-05-01T23:59:59Z"), // Date object for due date
    availableDate: new Date("2024-04-20T00:00:00Z"), // Date object for available date
    untilDate: new Date("2024-05-01T23:59:59Z"), // Date object for until date
    questions: [
        {
            _id: "q1",
            question_type: 1,
            points: 10,
            description: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correct: [1],
        },
        {
            _id: "q2",
            question_type: 2,
            points: 10,
            description: "Is 10 divisible by 2?",
            options: ["True", "False"],
            correct: [0],
        },
    ],
};

// Mock data for Quiz 2
const quiz2 = {
    _id: "quiz2",
    courseId: "course456",
    title: "Science Quiz",
    description: "Test your knowledge of scientific concepts.",
    type: "graded",
    points: 30,
    assignmentGroup: "Science Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    isPublished: true,
    multipleAttempts: true,
    showCorrectAnswers: "after_due_date",
    accessCode: "987654",
    oneQuestionAtATime: false,
    webcamRequired: true,
    lockQuestionsAfterAnswering: false,
    dueDate: new Date("2024-05-01T23:59:59Z"), // Date object for due date
    availableDate: new Date("2024-04-20T00:00:00Z"), // Date object for available date
    untilDate: new Date("2024-05-01T23:59:59Z"), // Date object for until date
    questions: [
        {
            _id: "q3",
            question_type: 1,
            points: 15,
            description: "What is the boiling point of water?",
            answers: ["50°C", "75°C", "100°C", "150°C"],
            correct: [2],
        },
        {
            _id: "q4",
            question_type: 2,
            points: 15,
            description: "Is the sun a star?",
            answers: ["Yes", "No"],
            correct: [0],
        },
    ],
};

// Array of quizzes
const quizzes = [quiz1, quiz2];

async function findCourseQuizzes(courseId: string): Promise<Quiz[]> {
  const response = await axios.get(`${QUIZ_API}/${courseId}/quizzes`);
  return response.data;
}


function QuizList() {
    // const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
    // const { courseId } = useParams();

    // const handleAddQuiz = () => {



    // };
    // useEffect(() => {
    //     const fetchQuizzes = async () => {
    //         try {
    //             const data = await findCourseQuizzes(courseId || "");
    //             setQuizzes(data || []);
    //             setLoading(false);
    //         } catch (err) {
    //             setError("Failed to fetch quizzes");
    //             setLoading(false);
    //             setQuizzes([]);
    //         }
    //     };

    //     fetchQuizzes();
    // }, [courseId]);
    function getAvailabilityStatus(quiz: Quiz): string {
      const now = new Date();
      if (now < quiz.availableDate) {
          return "Not available yet";
      } else if (now > quiz.untilDate) {
          return "Expired";
      } else {
          return "Available";
      }
  }

    return (
        <div>
            <h1>Quiz List</h1>
            <button className="add-quiz-btn">+ Quiz</button>
            <div className="quiz-list-container">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => (
                        <div key={index} className="quiz-box">
                            <Link
                                to={`${quiz._id}`}
                                style={{
                                    textDecoration: "none",
                                    display: "block",
                                    flexGrow: 1,
                                }}
                            >
                                <div>
                                    <div
                                        className="quiz-title"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {quiz.title}
                                    </div>
                                    <div className="quiz-details">
                                        {/* <span className="availability-status">
                                {getAvailabilityStatus(quiz)}
                            </span> | */}
                                        Due {formatDate(quiz.dueDate)} | Points:{" "}
                                        {quiz.points} | {quiz.questions.length}{" "}
                                        Questions
                                    </div>
                                </div>
                            </Link>
                            <span
                                className={`publish-status ${
                                    quiz.isPublished ? "published" : "unpublished"
                                }`}
                            >
                                {quiz.isPublished ? "✅" : "🚫"}
                            </span>
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="quiz-context-menu"
                            >
                                {/* Implement the context menu here */}
                                ...
                            </div>
                        </div>
                    ))
                ) : (
                    <p>
                        No quizzes available. Click "+ Quiz" to add a new one.
                    </p>
                )}
            </div>
        </div>
    );
}

export default QuizList;


