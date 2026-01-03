import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobile: "",
    password: ""
  });

  const [error, setError] = useState("");

  /* 🔐 AUTO REDIRECT IF ALREADY LOGGED IN */
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("kyp_logged_in");
    if (isLoggedIn === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("kyp_user"));

    if (!savedUser) {
      setError("No user found. Please register first.");
      return;
    }

    if (
      formData.mobile !== savedUser.mobile ||
      formData.password !== savedUser.password
    ) {
      setError("Invalid mobile number or password");
      return;
    }

    /* ✅ LOGIN SUCCESS – PERSIST STATE */
    localStorage.setItem("kyp_logged_in", "true");

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>KYP Student Login</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            maxLength="10"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <p className="auth-link">
          New user?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
