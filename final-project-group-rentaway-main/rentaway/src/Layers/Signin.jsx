import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.scss";
import axios from "axios";
import img from "../assests/logo-black.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:2000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("enterted send otp");

      const { token, role } = await response.json();
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "guest") {
        // If the user is a guest, send a request to the server to retrieve their phone number

        console.log("email", email);
        const guestresponse = await axios.get(
          `http://localhost:2000/users/guest/phone/${email}`
        );
        console.log("guestresponse", guestresponse.data);
        // Store the guest's phone number and user ID in local storage for future use
        localStorage.setItem("phoneNumber", guestresponse.data.phoneNumber);
        localStorage.setItem("guestuserid", guestresponse.data._id);

        // Navigate to the guest page
      } else if (role === "host") {
        // If the user is a host, send a request to the server to retrieve their phone number
        const hostresponse = await axios.get(
          `http://localhost:2000/users/host/phone/${email}`
        );
        console.log("hostresponse", hostresponse.data);

        // Store the host's phone number and user ID in local storage for future use
        localStorage.setItem("phoneNumber", hostresponse.data.phoneNumber);
        localStorage.setItem("hostuserid", hostresponse.data._id);
      } else {
        alert("Unknown user role");
      }
      // Send OTP to user's mobile number
      const phoneNumber = localStorage.getItem("phoneNumber");
      console.log("phoneNumberghjkl", phoneNumber);
      const data = {
        originator: "SignOTP",
        recipient: phoneNumber,
        content:
          "{} is OTP to login to your RentAway account. Valid for 10 mins. Do not share OTP for security reasons",
        expiry: "600",
        data_coding: "text",
      };
      const payload = JSON.stringify(data);
      console.log("payload", payload);
      const otpResponse = await axios.post(
        "https://api.d7networks.com/verify/v1/otp/send-otp",
        payload,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiYTVkZmJlNWUtYmQxZS00ZmM2LTgyMmUtZGNhNzdlNmU3ZGY1In0.21eTZ9-P_5eChCn9WTugtQ524GG-f5T_T9PtwM-X1Ww",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://192.168.1.124:3000", // add this header to allow requests from your React app
          },
        }
      );
      console.log("otpResponse", otpResponse.status);
      const otp_id = otpResponse.data.otp_id;
      console.log("otp_id", otp_id);
      if (otpResponse.status === 200) {
        console.log("otp_id", otp_id);
        // Show OTP verification modal to user
        const otp = prompt("Enter the OTP received on your mobile number:");
        // Verify OTP
        const verifyOtpResponse = await axios.post(
          "https://api.d7networks.com/verify/v1/otp/verify-otp",
          {
            otp_id: otp_id,
            otp_code: otp,
          },
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiYTVkZmJlNWUtYmQxZS00ZmM2LTgyMmUtZGNhNzdlNmU3ZGY1In0.21eTZ9-P_5eChCn9WTugtQ524GG-f5T_T9PtwM-X1Ww",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "http://192.168.1.124:3000", // add this header to allow requests from your React app
            },
          }
        );
        console.log("verifyOtpResponse", verifyOtpResponse.status);
        if (
          verifyOtpResponse.status === 200 &&
          verifyOtpResponse.status === 200
        ) {
          const token = localStorage.getItem("token");
          const role = localStorage.getItem("role");
          if (token) {
            if (role === "guest") {
              navigate("/guest");
            } else if (role === "host") {
              navigate("/host");
            } else {
              alert("Unknown user role");
            }
          } else {
            alert("User does not exist");
          }
        } else {
          alert("Incorrect OTP");
        }
      } else {
        alert("Error sending OTP");
      }
    } else {
      alert("Incorrect email or password");
    }
  };

  return (
    <div class="maindiv">
      <div className="signin-container">
        <br></br>
        <img src={img} alt="RentAway" width="250px" heigh="250px" />
        <br></br>
        <h2 class="signindiv">LOGIN</h2>
        <form onSubmit={handleSubmit} className="formdiv">
          <label>
            Email:
            <input
              className="emailinput"
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="signup-label">
            Password:
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
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
          </label>
          <button type="submit" class="primary">
            Sign in
          </button>
          <div className="signup-link">
            <h3>Does not have any account?</h3> <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;