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
// impport quiz data from mock data json file
import { quizzes } from "../../Database";
import { MdOutlineRocketLaunch } from "react-icons/md";
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
    dueDate: string;
    availableDate: string;
    untilDate: string;
}

export async function findCourseQuizzes(courseId: string): Promise<Quiz[]> {
    const response = await axios.get(`${QUIZ_API}/${courseId}/quizzes`);
    return response.data;
}
export const createQuiz = async (courseId: any, quiz: any) => {
    const response = await axios.post(`${QUIZ_API}/${courseId}/quizzes`, quiz);
    return response.data;
};

function QuizList() {
    // const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
    // const { courseId } = useParams();
    // TODO: filter by courseId

    // const  handleAddQuiz = () => {
    //     // add quiz
    //     const newQuiz = {
    //         courseId: '',
    //         isPublished: false,
    //         questions: [],
    //         title: "New Quiz",
    //         description: "This is a new quiz",
    //         type: "Graded Quiz",
    //         points: 10,
    //         assignmentGroup: "Quizzes",
    //         shuffleAnswers: false,
    //         timeLimit: 0,
    //         multipleAttempts: false,
    //         showCorrectAnswers: "",
    //         accessCode: "",
    //         oneQuestionAtATime: false,
    //         webcamRequired: false,
    //         lockQuestionsAfterAnswering: false,
    //         dueDate: "2022-12-31T23:59:59.999Z",
    //         availableDate: "2022-12-31T23:59:59.999Z",
    //         untilDate: "2022-12-31T23:59:59.999Z",
    //     };
    //     createQuiz(courseId, newQuiz);
    // }

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
        const availableDate = new Date(quiz.availableDate);
        const untilDate = new Date(quiz.untilDate);
        if (now < availableDate) {
            return "Not available yet";
        } else if (now > untilDate) {
            return "Expired";
        } else {
            return "Available";
        }
    }

    return (
        <div className="flex-fill">
            <h1>Quiz List</h1>
            <div className="d-flex justify-content-between">
                <input
                    className="border border-muted rounded"
                    type="text"
                    placeholder="Search for Quiz"
                />
                <div className="d-flex gap-1">
                    <button className="btn btn-danger d-flex align-items-center">
                        <FaPlus className="me-1" /> Quiz
                    </button>
                    <button className="btn wd-modules-btn p-1">
                        <FaEllipsisV />
                    </button>
                </div>
            </div>
            <div className="quiz-list-container">
                {quizzes.length > 0 ? (
                    quizzes.map((quiz, index) => (
                        <div className="d-flex flex-row align-items-center justify-content-between quiz-box">
                            <div className="d-flex flex-row align-items-center gap-3">
                                <MdOutlineRocketLaunch
                                    className="fs-5"
                                    style={{ color: "green" }}
                                />
                                <div className="d-flex flex-column">
                                    <Link
                                        to={`${quiz._id}`}
                                        style={{
                                            textDecoration: "none",
                                            display: "block",
                                            flexGrow: 1,
                                        }}
                                    >
                                        <div
                                            className="quiz-title"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            {quiz.title}
                                        </div>
                                    </Link>

                                    <div className="quiz-details">
                                        <span className="availability-status">
                                            {getAvailabilityStatus(quiz)}
                                        </span>{" "}
                                        | Due{" "}
                                        {formatDate(new Date(quiz.dueDate))} |
                                        Points: {quiz.points} |{" "}
                                        {quiz.questions.length} Questions
                                    </div>
                                </div>
                            </div>
                            <span className="d-flex flex-row gap-1">
                                {quiz.isPublished ? (
                                    <FaCheckCircle className="text-success" />
                                ) : (
                                    "🚫"
                                )}
                                <FaEllipsisV className="ms-2" />
                            </span>
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
