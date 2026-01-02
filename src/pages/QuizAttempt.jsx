import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cssQuestions from "../data/cssQuestions";
import basicComputerQuestions from "../data/basicComputerQuestions";
import "../styles/quiz.css";

const QuizAttempt = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  const questions =
    type === "css"
      ? cssQuestions
      : type === "basic"
      ? basicComputerQuestions
      : [];

  const TOTAL = questions.length;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  /* ===== RESUME SUPPORT ===== */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("kyp_active_test"));
    if (saved && saved.type === type) {
      setCurrent(saved.currentIndex || 0);
      setAnswers(saved.answers || {});
    }
  }, [type]);

  /* ===== AUTO SAVE ===== */
  useEffect(() => {
    localStorage.setItem(
      "kyp_active_test",
      JSON.stringify({
        type,
        currentIndex: current,
        answers
      })
    );
  }, [current, answers, type]);

  /* ===== OPTION SELECT (AUTO NEXT) ===== */
  const handleSelect = (index) => {
    setAnswers((prev) => ({
      ...prev,
      [current]: index
    }));

    // auto next (except last question)
    if (current < TOTAL - 1) {
      setTimeout(() => {
        setCurrent((c) => c + 1);
      }, 120); // fast, exam-like
    }
  };

  const handleNext = () => {
    if (current < TOTAL - 1) {
      setCurrent(current + 1);
    }
  };

  const handleFinish = () => {
    localStorage.removeItem("kyp_active_test");

    localStorage.setItem(
      "kyp_last_attempt",
      JSON.stringify({
        type,
        answers
      })
    );

    navigate("/result");
  };

  if (!questions.length) return null;

  return (
    <div className="quiz-console">
      {/* ===== HEADER ===== */}
      <header className="quiz-header">
        <h2>{type.toUpperCase()} Quiz</h2>
        <span>
          {current + 1} / {TOTAL}
        </span>
      </header>

      {/* ===== QUESTION ===== */}
      <div className="question-box">
        <h3>{questions[current].question}</h3>

        <div className="options">
          {questions[current].options.map((opt, i) => (
            <div
              key={i}
              className={`option ${
                answers[current] === i ? "selected" : ""
              }`}
              onClick={() => handleSelect(i)}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>

      {/* ===== CONTROLS (ALWAYS VISIBLE) ===== */}
      <div className="quiz-controls">
        <button onClick={handleNext} disabled={current === TOTAL - 1}>
          Next
        </button>

        <button className="finish-btn" onClick={handleFinish}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default QuizAttempt;
