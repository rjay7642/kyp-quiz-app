import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cssQuestions from "../data/cssQuestions";
import basicComputerQuestions from "../data/basicComputerQuestions";
import { supabase } from "../supabaseClient";
import "../styles/result.css";

const Result = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("kyp_last_attempt"));
    if (!stored) {
      navigate("/dashboard");
      return;
    }

    const { type, answers } = stored;

    const questions =
      type === "css"
        ? cssQuestions
        : type === "basic"
        ? basicComputerQuestions
        : [];

    let correct = 0;
    let attempted = 0;

    questions.forEach((q, index) => {
      if (answers[index] !== undefined) {
        attempted++;
        if (answers[index] === q.correctIndex) {
          correct++;
        }
      }
    });

    const wrong = attempted - correct;
    const score = correct;
    const total = questions.length;

    /* ================= BASIC DAILY LOGIC ================= */
    if (type === "basic") {
      const today = new Date().toISOString().split("T")[0];
      const user = JSON.parse(localStorage.getItem("kyp_user"));
      const userId = localStorage.getItem("kyp_user_id");

      /* ===== USER-SPECIFIC DAILY LOCK ===== */
      if (userId) {
        localStorage.setItem(
          `kyp_basic_last_attempt_${userId}`,
          JSON.stringify({ date: today })
        );
      }

      /* ===== SUPABASE LEADERBOARD UPSERT ===== */
      if (userId && user) {
        supabase
          .from("daily_leaderboard")
          .upsert(
            [
              {
                user_id: userId,
                name: user.name,
                centre: user.centre,
                score: score,
                exam_date: today
              }
            ],
            {
              onConflict: "user_id,exam_date"
            }
          )
          .then(({ error }) => {
            if (error) {
              console.error(
                "Supabase leaderboard upsert error:",
                error.message
              );
            }
          });
      }
    }

    setResult({
      type,
      total,
      attempted,
      correct,
      wrong,
      score
    });
  }, [navigate]);

  if (!result) return null;

  return (
    <div className="result-container">
      <header className="result-header">
        <h2>{result.type.toUpperCase()} Result</h2>
        <span>Exam Summary</span>
      </header>

      <main className="result-body">
        <div className="result-box">
          <h3>Score: {result.score}</h3>
          <p>Total Questions: {result.total}</p>
          <p>Attempted: {result.attempted}</p>
          <p className="correct">Correct: {result.correct}</p>
          <p className="wrong">Wrong: {result.wrong}</p>
        </div>

        {result.type === "basic" && (
          <div className="result-note">
            This was a daily test.
            <br />
            You can attempt the next Basic Computer test tomorrow.
          </div>
        )}

        <div className="result-actions">
          <button
            className="back-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default Result;
