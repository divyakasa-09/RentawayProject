import React, { useState } from "react";
import "./updare_user.scss";

function GuestUpdate() {
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const guestuserid = localStorage.getItem("guestuserid");


  // Handle submit button click event
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Log user data and guest user id
      console.log(JSON.stringify({ firstName, phoneNumber, email, password }));
      console.log(guestuserid);

      // Send PUT request to server to update user data
      const response = await fetch(
        `http://localhost:2000/users/guest/update/${guestuserid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, phoneNumber, email, password }),
        }
      );

      // Handle response from server
      if (response.status === 409) {

        // If email already registered, show alert and return
        alert(
          `Email already registered.`
        );
        return;
      }

      alert("User updated successfully!");
      // If user data updated successfully, show success alert and reset form fields
      setFirstName("");
      setPhoneNumber("");
      setEmail("");
      setPassword("");

  
  };

  return (
    <div className="container">
      <form className="guest-update" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default GuestUpdate;