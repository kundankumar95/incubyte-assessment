import React, { useState } from "react";
import "../styles/loginsignup.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [mode, setMode] = useState("LOGIN");
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "CUSTOMER",
    adminCode: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "LOGIN" ? loginUser() : registerUser();
  };

  /* ================= LOGIN ================= */
  const loginUser = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      //  SINGLE SOURCE OF TRUTH
      authLogin(data.token, data.role);

      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  /* ================= REGISTER ================= */
  const registerUser = async () => {
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        adminCode: formData.role === "ADMIN" ? formData.adminCode : undefined,
      };

      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      // auto-login after signup
      authLogin(data.token, data.role);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{mode === "LOGIN" ? "Login" : "Register"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={changeHandler}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={changeHandler}
              required
            />

            {mode === "REGISTER" && (
              <>
                <select
                  name="role"
                  value={formData.role}
                  onChange={changeHandler}
                  className="role-select"
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="ADMIN">Admin</option>
                </select>

                {formData.role === "ADMIN" && (
                  <input
                    type="password"
                    name="adminCode"
                    placeholder="Admin Code"
                    value={formData.adminCode}
                    onChange={changeHandler}
                    required
                  />
                )}
              </>
            )}
          </div>

          <button type="submit">
            {mode === "LOGIN" ? "Login" : "Register"}
          </button>

          {mode === "LOGIN" ? (
            <p className="loginsignup-login">
              New user?{" "}
              <span onClick={() => setMode("REGISTER")}>Create account</span>
            </p>
          ) : (
            <p className="loginsignup-login">
              Already registered?{" "}
              <span onClick={() => setMode("LOGIN")}>Login here</span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
