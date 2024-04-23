import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import { useParams, Link } from "react-router-dom";
import * as client from "../client";

import { KanbasState } from "../../../store";
import {
  formatDate,
  setPublish,
  setQuiz,
  setQuizzes,
  updateQuiz,
} from "../../../store/quizzesReducer";
import EditorNav from "./EditorNav";

const DetailsEditor = () => {
  const dispatch = useDispatch();
  const { courseId, quizId } = useParams();

  useEffect(() => {
    if (!courseId || !quizId) {
      return;
    }
    client.findCourseQuizzes(courseId).then((quizzes) => {
      dispatch(setQuizzes(quizzes));
      dispatch(setQuiz(quizzes.find((quiz) => quiz._id === quizId)));
    });
  }, [courseId, dispatch, quizId]);

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  const handleUpdateAndPublish = () => {
    client.updateQuiz(quiz);
    client.publishQuiz(quiz._id, true);
    dispatch(updateQuiz(quiz));
    dispatch(setPublish({ quizId: quiz._id, isPublished: true }));
    window.location.reload();
  };
  const handleUpdateQuiz = () => {
    client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="float-end mb-3">
            <span>
              Points {quiz.points}{" "}
              {quiz?.isPublished ? "Published" : "Not published"}
              <button className="btn">
                <BsThreeDotsVertical />
              </button>
            </span>
          </div>
        </div>
        <hr />
        <EditorNav />
        <div className="row mt-4">
          <div className="col">
            <input
              type="text"
              value={quiz?.title}
              onChange={(e) =>
                dispatch(setQuiz({ ...quiz, title: e.target.value }))
              }
              placeholder="Title"
              className="form-control mb-2 w-25"
            />
            <div className="mb-2">Quiz Instructions:</div>
            <textarea
              value={quiz?.description}
              onChange={(e) =>
                dispatch(
                  setQuiz({
                    ...quiz,
                    description: e.target.value,
                  })
                )
              }
              placeholder="Description"
              className="form-control mb-2"
            />
            <div className="w-50">
              <div className="row">
                <div className="col">Quiz Type:</div>
                <div className="col">
                  <select
                    value={quiz?.type || "graded quiz"}
                    onChange={(e) =>
                      dispatch(
                        setQuiz({
                          ...quiz,
                          type: e.target.value,
                        })
                      )
                    }
                    className="form-select mb-2"
                  >
                    <option value="graded quiz">Graded Quiz</option>
                    <option value="practice">Practice Quiz</option>
                    <option value="graded-survey">Graded Survey</option>
                    <option value="ungraded-survey">Ungraded Survey</option>
                  </select>
                </div>
              </div>

              <div className="ml-5">
                <div className="row">
                  <div className="col">Points:</div>
                  <div className="col">
                    <input
                      type="number"
                      value={quiz?.points}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            point: parseInt(e.target.value),
                          })
                        )
                      }
                      className="form-control mb-2"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col">Assignment Group:</div>
                  <div className="col">
                    <select
                      value={quiz?.assignmentGroup}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            assignmentGroup: e.target.value,
                          })
                        )
                      }
                      className="form-select mb-2"
                    >
                      <option value="quizzes">Quizzes</option>
                      <option value="exams">Exams</option>
                      <option value="assignments">Assignments</option>
                      <option value="project">Project</option>
                    </select>
                  </div>
                </div>

                <b>Options:</b>
                <div className="row">
                  <div className="col"></div>
                  <div className="col">
                    <input
                      type="checkbox"
                      checked={quiz?.shuffleAnswers === true}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            shuffleAnswers: e.target.checked,
                          })
                        )
                      }
                      className="form-check-input mb-2"
                    />
                    Shuffle Answers
                  </div>
                </div>

                <div className="row">
                  <div className="col"></div>
                  <div className="col">
                    <input
                      type="checkbox"
                      checked={quiz?.timeLimit === true}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            timeLimit: e.target.checked,
                          })
                        )
                      }
                      className="form-check-input mb-2"
                    />
                    Time Limit
                    {quiz?.timeLimit && (
                      <div>
                        <label htmlFor="timeLimit">Time Limit (minutes):</label>
                        <input
                          id="timeLimit"
                          type="number"
                          value={quiz!.timeLimit}
                          onChange={(e) =>
                            dispatch(
                              setQuiz({
                                ...quiz,
                                timeLimitMinutes: e.target.value,
                              })
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col"></div>
                  <div className="col">
                    <input
                      type="checkbox"
                      checked={quiz?.multipleAttempts}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            multipleAttempts: e.target.checked,
                          })
                        )
                      }
                      className="form-check-input mb-2"
                    />
                    Multiple Attempts
                  </div>
                </div>

                <div className="row">
                  <div className="col"></div>
                  <div className="col">
                    <input
                      type="checkbox"
                      checked={quiz?.showCorrectAnswer === true}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            showCorrectAnswer: e.target.checked,
                          })
                        )
                      }
                      className="form-check-input mb-2"
                    />
                    Show Correct Answer
                    {quiz?.showCorrectAnswer && (
                      <div>
                        <label htmlFor="showDate">
                          Show correct answer from:
                        </label>
                        <input
                          id="showDate"
                          type="date"
                          value={quiz!.showDate}
                          onChange={(e) =>
                            dispatch(
                              setQuiz({
                                ...quiz,
                                showDate: e.target.value,
                              })
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col"></div>
                  <div className="col">
                    <input
                      type="checkbox"
                      checked={quiz?.oneQuestionAtATime}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            oneQuestionAtATime: e.target.checked,
                          })
                        )
                      }
                      className="form-check-input mb-2"
                    />
                    One Question At A Time
                  </div>
                </div>

                <div className="row">
                  <div className="col"></div>
                  <div className="col">
                    <input
                      type="checkbox"
                      checked={quiz?.webcamRequired}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            webcamRequired: e.target.checked,
                          })
                        )
                      }
                      className="form-check-input mb-2"
                    />
                    Webcam Required
                  </div>
                </div>

                <div className="row">
                  <div className="col"></div>
                  <div className="col">
                    <input
                      type="checkbox"
                      checked={quiz?.lockQuestionsAfterAnswering}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            lockQuestionsAfterAnswering: e.target.checked,
                          })
                        )
                      }
                      className="form-check-input mb-2"
                    />
                    Lock Questions After Answering
                  </div>
                </div>

                <div className="row">
                  <div className="col">Access Code: </div>
                  <div className="col">
                    <input
                      id="accessCode"
                      type="text"
                      className="form-control mb-2 w-50"
                      value={quiz?.accessCode || ""}
                      onChange={(e) =>
                        dispatch(
                          setQuiz({
                            ...quiz,
                            accessCode: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* assign to, due date, available */}
            Assign
            <div className="row w-25 border">
              <div className="row mb-3">
                <div className="col">
                  <b>Assign To</b>
                </div>
                <div className="col">
                  <div>Everyone</div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <b>Due</b>
                </div>
                <div className="col">
                  <input
                    id="dueDate"
                    type="date"
                    value={formatDate(quiz?.dueDate)}
                    onChange={(e) =>
                      dispatch(
                        setQuiz({
                          ...quiz,
                          dueDate: formatDate(e.target.value),
                        })
                      )
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <b>Available From</b>
                </div>
                <div className="col">
                  <input
                    id="availableFromDate"
                    type="date"
                    value={formatDate(quiz?.availableDate)}
                    onChange={(e) =>
                      dispatch(
                        setQuiz({
                          ...quiz,
                          availableDate: formatDate(e.target.value),
                        })
                      )
                    }
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <b>Until</b>
                </div>
                <div className="col">
                  <input
                    id="availableUntilDate"
                    type="date"
                    value={formatDate(quiz?.availableUntilDate)}
                    onChange={(e) =>
                      dispatch(
                        setQuiz({
                          ...quiz,
                          availableUntilDate: formatDate(e.target.value),
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 border">
            <div className="float-end">
              <button className="btn m-1">
                <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}>Cancel</Link>
              </button>
              <button onClick={handleUpdateAndPublish} className="btn m-1">
                <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}>
                  Save & Publish
                </Link>
              </button>
              <button onClick={handleUpdateQuiz} className="btn btn-danger m-1">
                <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>
                  Save
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailsEditor;
