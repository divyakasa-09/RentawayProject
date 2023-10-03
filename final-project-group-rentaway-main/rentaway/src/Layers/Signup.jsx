import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assests/logo-black.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import "./Signup.scss";

function Signup() {
  // This component manages the registration form
  // It allows users to register as a guest or a host
  // On successful registration, it shows a success popup and redirects to sign-in page after a countdown timer
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isHost, setIsHost] = useState(false); // state to toggle between guest and host form
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // state to show success popup
  const [countdown, setCountdown] = useState(5); // state for countdown timer

  // Navigate to a different page
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Countdown timer to show success popup and redirect to sign-in page
  useEffect(() => {
    let timer;
    if (showSuccessPopup && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (showSuccessPopup && countdown === 0) {
      setShowSuccessPopup(false);
      history("/signin");
    }
    return () => clearTimeout(timer);
  }, [showSuccessPopup, countdown, history]);

  // Handle guest form submission
  const handleGuestSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:2000/users/guest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, phoneNumber, email, password }),
    });
    localStorage.setItem("phoneNumber", phoneNumber);

    if (response.status === 409) {
      setError(
        `Email already registered. Click here to <a href="/signin">sign in</a>.`
      );
      return;
    }

    setFirstName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setShowSuccessPopup(true);
  };

  // Handle host form submission
  const handleHostSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:2000/users/host", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      }),
    });
    localStorage.setItem("phoneNumber", phoneNumber);

    if (response.status === 409) {
      setError(
        `Email already registered. Click here to <a href="/signin">sign in</a>.`
      );
      return;
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setShowSuccessPopup(true);
  };

  return (
    <div className="signup-container">
      <br></br>
      <img src={img} alt="RentAway" width="250px" heigh="250px" />
      <br></br>
      <h2 className="signup-heading">CREATE ACCOUNT</h2>
      <div className="signup-buttons-container">
        <button className="primary" onClick={() => setIsHost(true)}>
          Sign up as Guest
        </button>{" "}
        &nbsp;&nbsp;
        <button className="primary" onClick={() => setIsHost(false)}>
          Sign up as Host
        </button>
      </div>
      {error && (
        <div
          className="signup-error"
          dangerouslySetInnerHTML={{ __html: error }}
        ></div>
      )}
      {showSuccessPopup && (
        <div className="signup-success-popup">
          Account created successfully! Redirecting to Sign In page in{" "}
          {countdown} seconds...
        </div>
      )}
      <form
        className="signup-form"
        onSubmit={isHost ? handleGuestSubmit : handleHostSubmit}
      >
        <label className="signup-label">
          First name:
          <input
            type="text"
            className="emailinput"
            placeholder="First name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </label>
        {!isHost && (
          <label className="signup-label">
            Last name:
            <input
              type="text"
              placeholder="Last name"
              className="emailinput"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </label>
        )}
        <label className="signup-label">
          Phone number:
          <input
            type="tel"
            pattern="^\+(?:[0-9]●?){6,14}[0-9]$"
            className="emailinput"
            required
            placeholder="Please enter your phone number with country code"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>
        <label className="signup-label">
          Email:
          <input
            type="email"
            placeholder="your@email.com"
            className="emailinput"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="signup-label">
          Password:
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              placeholder="Password"
              className="emailinput"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <span className="toggle-password" onClick={handleTogglePassword}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          {password &&
            !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password) && (
              <span className="password-error">
                Password must contain at least:
                <ul>
                  <li
                    className={`${/(?=.*\d)/.test(password) ? "" : "invalid"}`}
                  >
                    one digit
                  </li>
                  <li
                    className={`${
                      /(?=.*[a-z])/.test(password) ? "" : "invalid"
                    }`}
                  >
                    one lowercase letter
                  </li>
                  <li
                    className={`${
                      /(?=.*[A-Z])/.test(password) ? "" : "invalid"
                    }`}
                  >
                    one uppercase letter
                  </li>
                  <li className={`${/^.+$/.test(password) ? "" : "invalid"}`}>
                    be at least 8 characters long
                  </li>
                </ul>
              </span>
            )}
          {password && /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password) && (
            <span className="password-valid">Password meets requirements.</span>
          )}
        </label>

        <button className="primary" type="submit">
          Create account
        </button>
        <div className="signup-link">
          <h3 class="text1div"> Already a user?</h3> &nbsp;&nbsp;
          <a href="/signin">Sign in</a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
