import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    district: "",
    centre: ""
  });

  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------- INPUT CHANGE ---------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* ---------- IMAGE UPLOAD ---------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files allowed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, mobile, email, password, district, centre } = formData;

    if (!name || !mobile || !email || !password || !district || !centre) {
      setError("All fields are required");
      return;
    }

    if (mobile.length !== 10) {
      setError("Mobile number must be 10 digits");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    /* ---------- LOCAL SAVE (APP AUTH) ---------- */
    const userData = {
      ...formData,
      profilePic,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("kyp_user", JSON.stringify(userData));

    /* ---------- SUPABASE INSERT (COMPETITION POOL) ---------- */
    const { data, error: sbError } = await supabase
      .from("users")
      .insert([
        {
          name: name,
          centre: centre
        }
      ])
      .select()
      .single();

    if (sbError) {
      console.error("Supabase user insert error:", sbError.message);
      setError("Registration failed. Please try again.");
      setLoading(false);
      return;
    }

    // Save Supabase user id for leaderboard
    localStorage.setItem("kyp_user_id", data.id);

    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>KYP Student Registration</h2>

        {error && <p className="error-text">{error}</p>}

        {/* PROFILE PIC */}
        <div className="profile-upload">
          {profilePic ? (
            <img src={profilePic} alt="Profile Preview" />
          ) : (
            <div className="avatar-placeholder">Photo</div>
          )}

          <label className="upload-btn">
            Choose Profile Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            maxLength="10"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
          />

          <input
            type="text"
            name="centre"
            placeholder="Centre Name"
            value={formData.centre}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-link">
          Already registered?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
