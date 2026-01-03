import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import cssQuestions from "../data/cssQuestions";
import clsQuestions from "../data/clsQuestions";
import basicComputerQuestions from "../data/basicComputerQuestions";

import "../styles/quiz.css";

const QuizAttempt = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  /* ================= QUESTIONS SELECTOR ================= */
  const questions =
    type === "css"
      ? cssQuestions
      : type === "cls"
      ? clsQuestions
      : type === "basic"
      ? basicComputerQuestions
      : [];

  const TOTAL = questions.length;

  /* ================= STATE ================= */
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * TOTAL); // 30 sec / question

  /* ================= RESUME SUPPORT ================= */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("kyp_active_test"));
    if (saved && saved.type === type) {
      setCurrent(saved.currentIndex || 0);
      setAnswers(saved.answers || {});
      if (saved.timeLeft) setTimeLeft(saved.timeLeft);
    }
  }, [type]);

  /* ================= AUTO SAVE ================= */
  useEffect(() => {
    localStorage.setItem(
      "kyp_active_test",
      JSON.stringify({
        type,
        currentIndex: current,
        answers,
        timeLeft
      })
    );
  }, [current, answers, timeLeft, type]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* ================= HELPERS ================= */
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  /* ================= OPTION SELECT (AUTO NEXT) ================= */
  const handleSelect = (index) => {
    setAnswers((prev) => ({
      ...prev,
      [current]: index
    }));

    if (current < TOTAL - 1) {
      setTimeout(() => {
        setCurrent((c) => c + 1);
      }, 120); // fast, exam-like
    }
  };

  const handleNext = () => {
    if (current < TOTAL - 1) {
      setCurrent((c) => c + 1);
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

  if (!questions.length) {
    return (
      <div className="quiz-console">
        <div className="question-box">
          <h3>No questions available.</h3>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="quiz-console">
      {/* ===== HEADER ===== */}
      <header className="quiz-header">
        <div>
          <h2>{type.toUpperCase()} Quiz</h2>
          <span>
            Question {current + 1} / {TOTAL}
          </span>
        </div>

        <div className="quiz-timer">
          ⏱ {formatTime(timeLeft)}
        </div>
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

      {/* ===== CONTROLS ===== */}
      <div className="quiz-controls">
        <button
          onClick={handleNext}
          disabled={current === TOTAL - 1}
        >
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
