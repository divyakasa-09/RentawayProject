import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./User.scss";
import result from "../assests/logo-black.png";
import axios from "axios";
import { FaLocationArrow } from "react-icons/fa";
import { BiGroup } from "react-icons/bi";

function User() {
  const [listings, setListings] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  


  // Fetch listings from backend API using axios and set the state with the data
  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:2000/listings/active", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("id", response.data[0]._id);
      setListings(response.data);
    };
    fetchListings();
  }, []);


    // Fetch listings based on search query or price range
  const fetchListings = async (searchQuery, minPrice, maxPrice) => {
    try {
      const token = localStorage.getItem("token");
      let response;
      if (searchQuery !== "") {
        response = await axios.get(
          `http://localhost:2000/listings/search?search=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.get("http://localhost:2000/listings/filter", {
          params: {
            minPrice,
            maxPrice,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setListings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [showContactInfo, setShowContactInfo] = useState(false);

  // Delete user account
  const handleDeleteAccount = async () => {
    try {
      const guestuserid = localStorage.getItem("guestuserid");

      const delresponse = await axios.delete(
        `http://localhost:2000/users/guest/delete/${guestuserid}`, // replace userId with the user ID of the currently logged-in user
      );
      
      console.log(delresponse.data)
      alert("Account Suspended Successfully")
      window.location.href = "/"; // redirect the user to the login page
    } catch (error) {
      console.error(error);
    }
  };

  // View contact information for a listing's host
  const handleViewContact = async (listing) => {
    try {
      const response = await axios.get(
        `http://localhost:2000/users/host/${listing.userId}`
      );
      const updatedListings = listings.map((l) => {
        if (l._id === listing._id) {
          return {
            ...l,
            host: response.data,
          };
        }
        return l;
      });
      setListings(updatedListings);
      setShowContactInfo(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Close contact information popup and refresh the page
  const handleCloseContact = () => {
    setShowContactInfo(false);
    window.location.reload();
  };


   // Toggle dropdown menu for user options
  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  // Redirect to booking history page
  const handleBookingHistoryClick = () => {
    setShowDropdown(false);
    window.location.href = "/booking_history";
  };
  // Open Google Maps with latitude and longitude coordinates
  const navigateToLocation = (lat, lng) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    );
  };

  return (
    <div className="user-container">
      <nav>
        <img src={result} alt="RentAway Logo" />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            const searchQuery = event.target.elements.search.value;
            const minPrice = event.target.elements.minPrice.value;
            const maxPrice = event.target.elements.maxPrice.value;
            fetchListings(searchQuery, minPrice, maxPrice);
            event.target.elements.search.value = ""; // Reset the search input value
            event.target.elements.minPrice.value = "";
            event.target.elements.maxPrice.value = "";
          }}
        >
          <input type="text" placeholder="Search Property" name="search" />
          <input type="number" placeholder="Min Price" name="minPrice" />
          <input type="number" placeholder="Max Price" name="maxPrice" />
          <button type="submit">Search</button>
        </form>
        <ul>
        <li>
          <BiGroup
          className="profileIcon"
             onClick={handleDropdownClick}
             width="6px"
             height="2px"
             />
            {showDropdown && (
              <li className="dropdown">
                <li onClick={handleBookingHistoryClick}>Booking History</li>
                <li>
                  <Link to="/update">Update Account</Link>
                </li>
                <li onClick={handleDeleteAccount}>Suspend Account</li>
              </li>
            )}
          </li>
          <li>
            <Link to="/">LogOut</Link>
          </li>
        </ul>
      </nav>

      <h1>Welcome to RentAway!</h1>
      <div className="listings">
        {listings.map((listing) => (
          <div class ="listingdiv" key={listing._id}>
            <img
              src={listing.image || "http://via.placeholder.com/200x300"}
              alt="uploaded images"
              height="200"
              width="100%"
              className="propimage"
            />
            <h2>{listing.title}</h2>
            <p>{listing.description}</p>
            <p>Price: {listing.price}</p>

            <p>
              Availability:{" "}
              {new Date(listing.availability).toLocaleDateString()}
            </p>
            <p>House Rules: {listing.houseRules}</p>
            <p>
              <FaLocationArrow
                onClick={() =>
                  navigateToLocation(listing.latitude, listing.longitude)
                }
              />
              Address: {listing.address}
            </p>
            <Link to={`/property/${listing._id}`}>
              <button>View Property</button>
            </Link>
            <button onClick={() => handleViewContact(listing)}>
              View Contact
            </button>
            {listing.host && showContactInfo && (
              <div className="contactinfo">
                <h3>Contact Information</h3>
                <p>First Name: {listing.host.firstName}</p>
                <p>Last Name: {listing.host.lastName}</p>
                <p>Phone Number: {listing.host.phoneNumber}</p>
                <p>Email: {listing.host.email}</p>
                <button onClick={handleCloseContact}>Close</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;