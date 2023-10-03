import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Property.scss";
import img from '../assests/logo-black.png';
import { BiGroup } from "react-icons/bi";

function Property() {
  const { id } = useParams(); // get the id from the route parameters
  const [property, setProperty] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [price, setPrice] = useState(null);
  const [reviews, setReviews] = useState([]);
  const handleBookingHistoryClick = () => {
    setShowDropdown(false);
    window.location.href = "/booking_history";
  };
  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };
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
  // Use useEffect hook to fetch property and reviews data when component mounts
  useEffect(() => {
    // Define async function to fetch property data
    const fetchProperty = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:2000/listings/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            console.log("data", response.data)
            setProperty(response.data);
        } catch (error) {
            console.log(error);
            alert('Failed to fetch property details');
        }
    };
    // Define async function to fetch reviews data
    const fetchReviews = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:2000/properties/${id}/hostreviews`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            });
            console.log("reviews", response.data)
            setReviews(response.data);
        } catch (error) {
            console.log(error);
            alert('Failed to fetch reviews');
        }
    };
    // Call both async functions
    fetchProperty();
    fetchReviews();
}, [id]);


// Define function to handle booking
  const handleBookNow = () => {
    localStorage.setItem("propertyId", id);
    localStorage.setItem("property_name", property.title);
    localStorage.setItem("price", property.price);
  };

  // If property data is still not fetched (in case of slow internet), display a loading message again
  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div class = "container1">
      <nav className="navbarhost">
        <img src={img} alt="RentAway Logo" />

    
        
          
       
          <li class="linktext" >
            <Link className="logouttext" to="/">Logout</Link>
          </li>
      
      </nav>
    <div className="property1">
        <img className = "imageclass"
        src={property.image || "http://via.placeholder.com/400x300"}
        alt="uploaded images"
        height="500px"
        width="500px"
      />
      <div class ="intro1">
      <h1 className='h1tagtext1' >{property.title}</h1>
      <p className='ptagclass' >{property.description}</p>
      <p className='ptagclass'>Price: {property.price}</p>
      <p className='ptagclass'>
        Availability: {new Date(property.availability).toLocaleDateString()}
      </p>
      <p className='ptagclass'>House Rules: {property.houseRules}</p>
      <p className='ptagclass'>Status: {property.status}</p>
      
      {property.status === "available" && (
        <Link to="/booking" onClick={handleBookNow}>
          <button class="primary">Book Now</button>
        </Link>
      )}
      <h3 className='ptagclass' >Reviews:</h3>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li key={review._id}>
                            <p className='ptagclass'>Feedback: {review.feedback}</p>
                            <p className='ptagclass'>Rating: {review.rating}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='ptagclass'>No reviews yet.</p>
            )}
    </div>
    </div>
    </div>
    
  );
}

export default Property;