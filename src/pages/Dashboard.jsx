import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("kyp_user"));
  const userId = localStorage.getItem("kyp_user_id");

  const activeTest = JSON.parse(localStorage.getItem("kyp_active_test"));

  // 🔒 USER-SPECIFIC BASIC LOCK
  const basicLastAttempt = JSON.parse(
    localStorage.getItem(`kyp_basic_last_attempt_${userId}`)
  );

  const [notice, setNotice] = useState("");

  const today = new Date().toISOString().split("T")[0];

  /* ===== LOCK LOGIC ===== */

  // Resume lock (unfinished test)
  const resumeLockedType = activeTest?.type || null;

  // Daily basic lock (USER SPECIFIC)
  const isBasicLockedToday =
    basicLastAttempt && basicLastAttempt.date === today;

  /* ===== HELPERS ===== */

  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 2500);
  };

  const handleSubjectClick = (type) => {
    // Resume test pending
    if (resumeLockedType === type) {
      showNotice(
        "Please complete your resume test to unlock this section."
      );
      return;
    }

    // Daily basic completed (user specific)
    if (type === "basic" && isBasicLockedToday) {
      showNotice(
        "Daily Basic Computer test already completed. Try again tomorrow."
      );
      return;
    }

    navigate(`/quiz/${type}`);
  };

  return (
    <div className="dashboard-container">
      {/* 🔔 NOTIFICATION */}
      {notice && <div className="dashboard-notice">{notice}</div>}

      {/* ===== HEADER ===== */}
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h2>KYP Digital</h2>
          <span>Student Dashboard</span>
        </div>

        <div className="dashboard-user">
          {user?.profilePic ? (
            <img src={user.profilePic} alt="User" />
          ) : (
            <div className="dashboard-avatar">
              {user?.name?.charAt(0)}
            </div>
          )}

          <div className="user-meta">
            <strong>{user?.name}</strong>
            <small>{user?.centre}</small>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("kyp_logged_in");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* ===== SUBJECT SECTION ===== */}
      <section className="dashboard-content">
        {/* CSS */}
        <div
          className={`dashboard-card ${
            resumeLockedType === "css" ? "disabled" : ""
          }`}
          onClick={() => handleSubjectClick("css")}
        >
          <h3>CSS Quiz</h3>
          <p>Practice · Computer Software Skills</p>
        </div>

        {/* CLS */}
        <div
          className={`dashboard-card ${
            resumeLockedType === "cls" ? "disabled" : ""
          }`}
          onClick={() => handleSubjectClick("cls")}
        >
          <h3>CLS Quiz</h3>
          <p>Practice · Computer Lab Skills</p>
        </div>

        {/* BASIC COMPUTER */}
        <div
          className={`dashboard-card ${
            isBasicLockedToday ? "disabled" : ""
          }`}
          onClick={() => handleSubjectClick("basic")}
        >
          <h3>Basic Computer (Daily Test)</h3>
          <p>100 Questions · Exam Oriented</p>
        </div>
      </section>

      {/* ===== LEADERBOARD ENTRY ===== */}
      <section className="dashboard-content">
        <div
          className="dashboard-card"
          onClick={() => navigate("/leaderboard")}
        >
          <h3>Daily Leaderboard</h3>
          <p>Basic Computer · Today’s Ranking</p>
        </div>
      </section>

      {/* ===== RESUME SECTION ===== */}
      {activeTest && (
        <section className="dashboard-content">
          <div
            className="dashboard-card resume-card"
            onClick={() => navigate(`/quiz/${activeTest.type}`)}
          >
            <h3>Resume Test</h3>
            <p>
              Incomplete {activeTest.type.toUpperCase()} Test <br />
              Continue where you left off
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
