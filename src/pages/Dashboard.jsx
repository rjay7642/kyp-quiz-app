import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("kyp_user"));
  const userId = localStorage.getItem("kyp_user_id");

  const activeTest = JSON.parse(localStorage.getItem("kyp_active_test"));

  // USER-SPECIFIC BASIC LOCK
  const basicLastAttempt = JSON.parse(
    localStorage.getItem(`kyp_basic_last_attempt_${userId}`)
  );

  const [notice, setNotice] = useState("");
  const [timeLabel, setTimeLabel] = useState("");
  const [currentUser, setCurrentUser] = useState(user);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    centre: user?.centre || "",
    district: user?.district || "",
    mobile: user?.mobile || ""
  });
  const [profilePic, setProfilePic] = useState(
    user?.profilePic || ""
  );

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const label = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });
      const greeting =
        hours < 12
          ? "Good Morning"
          : hours < 18
          ? "Good Afternoon"
          : "Good Evening";
      setTimeLabel(`${greeting} - ${label}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  /* ===== LOCK LOGIC ===== */

  // Resume lock (unfinished test)
  const resumeLockedType = activeTest?.type || null;

  // Daily basic lock (USER SPECIFIC)
  const isBasicLockedToday =
    basicLastAttempt && basicLastAttempt.date === today;

  /* ===== STATS ===== */
  const history = useMemo(() => {
    return (
      JSON.parse(localStorage.getItem("kyp_attempt_history")) || []
    );
  }, []);

  const todayAttempts = history.filter(
    (h) => h.date === today
  );

  const totalAttempts = history.length;

  const avgScore = totalAttempts
    ? Math.round(
        (history.reduce((sum, h) => {
          if (!h.total) return sum;
          return sum + h.score / h.total;
        }, 0) /
          totalAttempts) *
          100
      )
    : 0;

  const bestScore = totalAttempts
    ? Math.max(
        ...history.map((h) =>
          h.total ? Math.round((h.score / h.total) * 100) : 0
        )
      )
    : 0;

  const dailyGoalPercent = todayAttempts.length ? 100 : 0;

  const getStreak = () => {
    const basicDates = new Set(
      history
        .filter((h) => h.type === "basic")
        .map((h) => h.date)
    );

    if (!basicDates.size) return 0;

    let streak = 0;
    let cursor = new Date(today);

    while (true) {
      const key = cursor.toISOString().split("T")[0];
      if (basicDates.has(key)) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = getStreak();

  const achievements = [
    {
      id: "first",
      title: "First Quiz",
      description: "Complete your first quiz",
      done: totalAttempts >= 1
    },
    {
      id: "perfect",
      title: "Perfect Score",
      description: "Score 100 percent in a quiz",
      done: history.some(
        (h) => h.total && h.score === h.total
      )
    },
    {
      id: "streak",
      title: "7 Day Streak",
      description: "Complete Basic quiz for 7 days",
      done: streak >= 7
    }
  ];

  /* ===== HELPERS ===== */

  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 2500);
  };

  const handleProfileChange = (e) => {
    setProfileForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = () => {
    const updated = {
      ...currentUser,
      ...profileForm,
      profilePic
    };

    localStorage.setItem("kyp_user", JSON.stringify(updated));
    setCurrentUser(updated);
    setIsEditingProfile(false);
    showNotice("Profile updated");
  };

  const handleProfileCancel = () => {
    setProfileForm({
      name: currentUser?.name || "",
      centre: currentUser?.centre || "",
      district: currentUser?.district || "",
      mobile: currentUser?.mobile || ""
    });
    setProfilePic(currentUser?.profilePic || "");
    setIsEditingProfile(false);
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
      {/* NOTIFICATION */}
      {notice && <div className="dashboard-notice">{notice}</div>}

      {/* ===== HEADER ===== */}
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h2>KYP Digital</h2>
          <span className="time-badge">{timeLabel}</span>
        </div>

        <div className="dashboard-user">
          {currentUser?.profilePic ? (
            <img src={currentUser.profilePic} alt="User" />
          ) : (
            <div className="dashboard-avatar">
              {currentUser?.name?.charAt(0)}
            </div>
          )}

          <div className="user-meta">
            <strong>{currentUser?.name}</strong>
            <small>{currentUser?.centre}</small>
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

      {/* ===== QUICK STATS ===== */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <p className="stat-label">Daily Goal</p>
            <span className="stat-badge">
              {todayAttempts.length ? "Completed" : "Pending"}
            </span>
          </div>
          <div className="stat-value stat-animate">
            {dailyGoalPercent}%
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${dailyGoalPercent}%` }}
            />
          </div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-top">
            <p className="stat-label">Streak</p>
            <span className="stat-badge">Basic Quiz</span>
          </div>
          <div className="stat-value stat-animate">{streak} days</div>
          <p className="stat-sub">
            Keep the daily Basic test alive
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <p className="stat-label">Progress</p>
            <span className="stat-badge">Overall</span>
          </div>
          <div className="stat-metrics">
            <div className="stat-animate">
              <span>{totalAttempts}</span>
              <small>Attempts</small>
            </div>
            <div className="stat-animate">
              <span>{avgScore}%</span>
              <small>Avg Score</small>
            </div>
            <div className="stat-animate">
              <span>{bestScore}%</span>
              <small>Best</small>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROFILE CARD ===== */}
      <section className="profile-card">
        <div className="profile-left">
          <div className="profile-avatar">
            {profilePic ? (
              <img src={profilePic} alt="Profile" />
            ) : (
              <div className="profile-placeholder">
                {currentUser?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div className="profile-meta">
            <strong>{currentUser?.name || "Student"}</strong>
            <small>{currentUser?.centre || "Add your centre"}</small>
            <span>{currentUser?.district || "Add district"}</span>
          </div>
        </div>
        <div className="profile-actions">
          <button
            className="profile-edit-btn"
            onClick={() => setIsEditingProfile((s) => !s)}
          >
            {isEditingProfile ? "Close" : "Edit Profile"}
          </button>
        </div>
      </section>

      {isEditingProfile && (
        <section className="profile-editor">
          <div className="profile-form">
            <label className="profile-upload">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={profileForm.name}
              onChange={handleProfileChange}
            />
            <input
              type="text"
              name="centre"
              placeholder="Centre Name"
              value={profileForm.centre}
              onChange={handleProfileChange}
            />
            <input
              type="text"
              name="district"
              placeholder="District"
              value={profileForm.district}
              onChange={handleProfileChange}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              maxLength="10"
              value={profileForm.mobile}
              onChange={handleProfileChange}
            />
            <div className="profile-buttons">
              <button
                className="profile-save"
                onClick={handleProfileSave}
              >
                Save Changes
              </button>
              <button
                className="profile-cancel"
                onClick={handleProfileCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}

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
          <p>Practice - Computer Software Skills</p>
        </div>

        {/* CLS */}
        <div
          className={`dashboard-card ${
            resumeLockedType === "cls" ? "disabled" : ""
          }`}
          onClick={() => handleSubjectClick("cls")}
        >
          <h3>CLS Quiz</h3>
          <p>Practice - Computer Lab Skills</p>
        </div>

        {/* BASIC COMPUTER */}
        <div
          className={`dashboard-card ${
            isBasicLockedToday ? "disabled" : ""
          }`}
          onClick={() => handleSubjectClick("basic")}
        >
          <h3>Basic Computer (Daily Test)</h3>
          <p>100 Questions - Exam Oriented</p>
        </div>
      </section>

      {/* ===== LEADERBOARD ENTRY ===== */}
      <section className="dashboard-content">
        <div
          className="dashboard-card"
          onClick={() => navigate("/leaderboard")}
        >
          <h3>Daily Leaderboard</h3>
          <p>Basic Computer - Today's Ranking</p>
        </div>
      </section>

      {/* ===== ACHIEVEMENTS ===== */}
      <section className="achievements-grid">
        {achievements.map((item) => (
          <div
            key={item.id}
            className={`achievement-card ${
              item.done ? "done" : ""
            }`}
          >
            <div className="achievement-title">
              {item.title}
            </div>
            <p>{item.description}</p>
            <span className="achievement-status">
              {item.done ? "Unlocked" : "Locked"}
            </span>
          </div>
        ))}
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

      <Navbar />
    </div>
  );
};

export default Dashboard;
