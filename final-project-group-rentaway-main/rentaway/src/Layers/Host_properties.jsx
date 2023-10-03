import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import './Property.scss';
import './Host_properties.scss';
import img from '../assests/logo-black.png';
import { BiGroup } from "react-icons/bi";
import { Link } from "react-router-dom";
import  './Host.scss';
import "./User.scss";


// This component displays the details of a property hosted by the user

function HostProperty() {
    
    //Define state variables property and reviews using the useState hook
    const { id } = useParams(); // get the id from the route parameters
    //Add state initialization for property and reviews
    const [property, setProperty] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
      };
      const handleDeleteAccount = async () => {
        try {
          const hostuserid = localStorage.getItem("hostuserid");
    
          const delresponse = await axios.delete(
            `http://localhost:2000/users/host/delete/${hostuserid}`, // replace userId with the user ID of the currently logged-in user
          );
          
          console.log(delresponse.data)
          alert("Account Suspended Successfully")
          window.location.href = "/"; // redirect the user to the login page
        } catch (error) {
          console.error(error);
        }
      };
    
    //Add useEffect hook to fetch the property and reviews details
    useEffect(() => {
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
        fetchProperty();
        fetchReviews();
    }, [id]);

    //Add loading state handling
    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div class="container1">
            <nav class ="navbarhost">
        <img src={img} alt="RentAway Logo" />
        <ul>
        <li>
        <BiGroup onClick={handleDropdownClick}/>
            {showDropdown && (
              <li className="dropdown">
                <li>
                  <Link to="/hostupdate">Update Account</Link>
                </li>
                <li onClick={handleDeleteAccount}>Suspend Account</li>
              </li>
            )}
          </li>
          <li>
            <Link  to="/">Logout</Link>
          </li>
        </ul>
      </nav>
        <div className='property1'>
               <img className='imageclass1'
                src={property.image || "http://via.placeholder.com/400x300"}
                alt="uploaded images"
                width="100%"
                height="400px"
               
            />
            <div className='intro1'>
            <h1 className='h1tagtext'>{property.title}</h1>
            <p className='ptagclass'>Description:{property.description}</p>
            <p className='ptagclass'> Price: {property.price}</p>
            <p className='ptagclass'>Availability: {new Date(property.availability).toLocaleDateString()}</p>
            <p className='ptagclass'>House Rules: {property.houseRules}</p>
           
              <div>
            <h3 className='ptagclass' >Reviews:</h3>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li key={review._id}>
                            <p  className='ptagclass'>Feedback: {review.feedback}</p>
                            <p className='ptagclass' >Rating: {review.rating}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='ptagclass'>No reviews yet.</p>
            )}
             </div>
        </div>
        </div>
        </div>
    );
}

export default HostProperty;
