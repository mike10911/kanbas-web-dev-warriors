import { useEffect, useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate } from "../Assignments";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { addQuiz, deleteQuiz, setPublish } from "../../store/quizzesReducer";
import * as client from "./client";
import { Quiz } from "./client";

function QuizList() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [contextMenu, setContextMenu] = useState<{ [key: string]: boolean }>(
        {}
    );
    const toggleContextMenu = (quizId: string) => {
        setContextMenu((prev) => ({ ...prev, [quizId]: !prev[quizId] }));
    };
    const dispatch = useDispatch();
    //randomly genreate ID
    const defaultQuiz = {
        _id: Math.random().toString(36),
        courseId: "",
        isPublished: true,
        questions: [],
        title: "Sample Quiz",
        description: "This is a sample quiz to test your knowledge.",
        type: "Graded Quiz",
        points: 10,
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        showCorrectAnswers: "2024-04-10T00:00:00.000Z",
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "2024-04-10T00:00:00.000Z",
        availableDate: "2024-04-10T00:00:00.000Z",
        untilDate: "2024-04-10T00:00:00.000Z",
    };

    const handleAddQuiz = () => {
        if (!courseId) return;
        defaultQuiz.courseId = courseId;
        client.createQuiz(defaultQuiz).then((defaultQuiz) => {
            dispatch(addQuiz(defaultQuiz));
            const quizId = defaultQuiz._id;
            navigate(`./${quizId}/editor/Details`);
        });
    };

    useEffect(() => {
        if (courseId) {
            client
                .findCourseQuizzes(courseId)
                .then((data) => {
                    setQuizzes(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [courseId]);

    const handleEditQuiz = (quizId: string) => {
        navigate(`./${quizId}/editor/Details`);
    };
    const handleDeleteQuiz = async (quizId: string) => {
        client.deleteQuiz(quizId).then(() => {
            dispatch(deleteQuiz(quizId));
        });
        window.location.reload();
    };

    const handlePublishToggle = async (quizId: string, quiz: Quiz) => {
        const isPublished = quiz.isPublished;
        client.publishQuiz(quizId, !isPublished);
        dispatch(setPublish({ quizId, isPublished: !isPublished }));
        window.location.reload();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
                    <button
                        onClick={handleAddQuiz}
                        className="btn btn-danger d-flex align-items-center"
                    >
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
                            <span
                                onClick={() =>
                                    handlePublishToggle(quiz._id, quiz)
                                }
                                className="d-flex flex-row gap-1"
                            >
                                {quiz.isPublished ? (
                                    <FaCheckCircle className="text-success" />
                                ) : (
                                    "🚫"
                                )}
                                <FaEllipsisV
                                    className="ms-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleContextMenu(quiz._id);
                                    }}
                                >
                                    ⋮
                                </FaEllipsisV>
                                {contextMenu[quiz._id] && (
                                    <div className="quiz-context-menu">
                                        <button
                                            className="rounded"
                                            onClick={() =>
                                                handleEditQuiz(quiz._id)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="rounded"
                                            onClick={() =>
                                                handleDeleteQuiz(quiz._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="rounded"
                                            onClick={() =>
                                                handlePublishToggle(
                                                    quiz._id,
                                                    quiz
                                                )
                                            }
                                        >
                                            {quiz.isPublished
                                                ? "Unpublish"
                                                : "Publish"}
                                        </button>
                                    </div>
                                )}
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
