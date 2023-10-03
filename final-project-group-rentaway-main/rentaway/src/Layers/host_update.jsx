import React, { useState } from "react";
import "./updare_user.scss";

function HostUpdate() {
  // State variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Get hostuserid from local storage
  const hostuserid = localStorage.getItem("hostuserid");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Log form data and hostuserid
      console.log(JSON.stringify({ firstName,lastName, phoneNumber, email, password }));
      console.log(hostuserid);

      // Make PUT request to update host data
      const response = await fetch(
        `http://localhost:2000/users/host/update/${hostuserid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName,lastName, phoneNumber, email, password }),
        }
      );

      // Handle errors
      if (response.status === 409) {
        alert(
          `Email already registered.`
        );
        return;
      }

      alert("User updated successfully!");
      // Clear form fields
      setFirstName("");
      setlastName("");
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
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setlastName(event.target.value)}
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

export default HostUpdate;