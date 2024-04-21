import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./index.css";
import "../index.css";
import { Link } from "react-router-dom";
import { quizzes } from "../../../Database";
import { FaEllipsisV } from "react-icons/fa";
import EditorNav from "../DetailsEditor/EditorNav";
import { setPublish } from "../../../store/quizzesReducer";
import { useDispatch } from "react-redux";
import * as client from "../client";

interface QuizDetailsProps {
    quizId: string;
}

const QuizDetails = () => {
    const [quiz, setQuiz] = useState<any>(null);
    const { quizId } = useParams();
    const API_BASE = process.env.REACT_APP_API_BASE;
    const dispatch = useDispatch();
    useEffect(() => {
        // Fetch quiz details from API using quizId
        // Replace the API_URL with your actual API endpoint
        fetch(`${API_BASE}/api/quizzes/${quizId}`)
            .then((response) => response.json())
            .then((data) => setQuiz(data))
            .catch((error) => console.error(error));
    }, [API_BASE, quizId]);

    const isPublished = quiz?.isPublished;
    const handlePublish = () => {
        client.publishQuiz(quizId, !isPublished);
        dispatch(setPublish({ quizId, isPublished: !isPublished }));
        window.location.reload();
      };

    if (!quiz) {
        return <div>Loading quiz details...</div>;
    }


    return (
        <><div className="text-left">
            <h1>{quiz.title}</h1>
            <div className="d-flex justify-content-end gap-2">
                {/* <Link type="button" to={`...`} className="btn btn-success">
                    Publish
                </Link> */}
                {quiz.isPublished ? (
                                <button  className="btn btn-danger" onClick={handlePublish}>
                                  Unpublish
                                </button>
                              ) : (
                                <button className="btn btn-success" onClick={handlePublish}>Publish</button>
                              )}
                <Link
                    type="button"
                    to={`Preview`}
                    className="btn wd-modules-btn p-1"
                >
                    Preview
                </Link>
                <Link
                    type="button"
                    to={`Editor/Details`}
                    className="btn wd-modules-btn p-1"
                >
                    Edit
                </Link>
                <Link
                    type="button"
                    to={`...`}
                    className="btn wd-modules-btn p-1"
                >
                    <FaEllipsisV />
                </Link>
            </div>

            <table className="mx-auto">
                <tr>
                    <td className="list-bold">
                        <b>Quiz Type</b>
                    </td>
                    <td>{quiz.type}</td>
                </tr>
                <tr>
                    <td className="list-bold">
                        <b>Points</b>
                    </td>
                    <td>{quiz.points}</td>
                </tr>
                <tr>
                    <td className="list-bold">
                        <b>Assignment Group</b>
                    </td>
                    <td>{quiz.assignmentGroup}</td>
                </tr>
                <tr>
                    <td className="list-bold">
                        <b>Shuffle Answers</b>
                    </td>
                    <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
                </tr>
                <tr>
                    <td className="list-bold">
                        <b>Time Limit</b>
                    </td>
                    <td>{quiz.timeLimit} minutes</td>
                </tr>
                <tr>
                    <td className="list-bold">
                        <b>Multiple Attempts</b>
                    </td>
                    <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
                </tr>
                <tr>
                    <td className="list-bold">
                        <b>Show Correct Answers</b>
                    </td>
                    <td>
                        {new Date(quiz.showCorrectAnswers).toLocaleString()}
                    </td>
                </tr>
                <tr>
                    <td className="list-bold">
                        <b>Access Code</b>
                    </td>
                    <td>{quiz.accessCode}</td>
                </tr>
                <tr>
                    <td className="list-bold">
                        <b>One Question at a Time</b>
                    </td>
                    <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
                </tr>
                <tr>
                    <td className="list-bold">
                        <b>Webcam Required</b>
                    </td>
                    <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
                </tr>
                <tr>
                    <td className="list-bold">
                        <b>Lock Questions After Answering</b>
                    </td>
                    <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                </tr>
            </table>
            <br></br>
            <table className="mx-auto flex-fill">
                <tr className="bordered">
                    <td>
                        <b>Due</b>
                    </td>
                    <td>
                        <b>Available From</b>
                    </td>
                    <td>
                        <b>Until</b>
                    </td>
                </tr>
                <tr>
                    <td className="date">
                        {new Date(quiz.dueDate).toLocaleString()}
                    </td>
                    <td className="date">
                        {new Date(quiz.availableDate).toLocaleString()}
                    </td>
                    <td className="date">
                        {new Date(quiz.untilDate).toLocaleString()}
                    </td>
                </tr>
            </table>
        </div></>
    );
};

export default QuizDetails;
