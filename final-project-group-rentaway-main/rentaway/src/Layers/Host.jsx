import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Host.scss";
import result from "../assests/logo-black.png";
import axios from "axios";
import { storage } from "../firebase/index";
import { FaLocationArrow } from "react-icons/fa";
import { BiGroup } from "react-icons/bi";


function AddPropertyForm() {
  // State variables for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [availability, setAvailability] = useState(new Date());
  const [houseRules, setHouseRules] = useState("");
  const [image, setImage] = useState(null);
  // eslint-disable-next-line
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0); // Add progress state
  // eslint-disable-next-line
  const [selectedHost, setSelectedHost] = useState("");
  const key = "AIzaSyAH8T6uBUGJDNQq7qUlOTGRhWuVw4tcFBE";
  const [placeData, setPlaceData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const handleCloseContact = () => {
    setShowForm(false);
    window.location.reload();
  };

  // Handle selecting a place from the Google Places API autocomplete
  const handlePlaceSelect = async (e) => {
    try {
      const placeId = e.target.value;
      const response = await axios.get(
        `/api/place/findplacefromtext/json?input=${placeId}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${key}`
      );
      console.log("location", response.data);
      setPlaceData(response.data.candidates[0]);

      console.log("placeData", placeData);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch place details");
    }
  };
  // Handle submitting the form and adding a new property
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const data = {
      //   title: title,
      //   description: description,
      //   image: image,
      //   price: price,
      //   availability: availability,
      //   houseRules: houseRules,

      //   hostId: selectedHost,
      //   status: "available",
      // };
      // console.log("image", image);

      // const response = await axios.post(
      //   "http://localhost:2000/listings",
      //   data,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log(response.data);
      // setTitle("");
      // setDescription("");
      // setPrice(0);
      // setAvailability(new Date());
      // setHouseRules("");
      // alert("Property added successfully");
      // // window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to add property");
    }
  };

  // Handle changing the file input for the property image
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Handle uploading the property image to Firebase Storage and adding the new property to the database
  const handleUpload = () => {
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track the upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log(`Upload is ${progress}% done`);
          
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Get the download URL for the uploaded image and make the POST request with the new property data
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setImageUrl(url);

              //  POST request with the image URL
              const token = localStorage.getItem("token");
              console.log("title", title);
              const response = axios.post(
                "http://localhost:2000/listings",
                {
                  title: title,
                  description: description,
                  image: url, // passing the image URL in the POST request
                  price: price,
                  availability: availability,
                  houseRules: houseRules,
                  hostId: selectedHost,
                  status: "available",
                  address: placeData.formatted_address,
                  longitude: placeData.geometry.location.lng,
                  latitude: placeData.geometry.location.lat,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log(response.data);
              setTitle("");
              setDescription("");
              setPrice(0);
              setAvailability(new Date());
              setHouseRules("");
              setPlaceData(null);
              alert("Property added successfully");
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="popup">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />

      <label htmlFor="availability">Availability:</label>
      <input
        type="date"
        id="availability"
        value={availability.toISOString().slice(0, 10)}
        onChange={(e) => setAvailability(new Date(e.target.value))}
      />

      <label htmlFor="houseRules">House Rules:</label>
      <textarea
        id="houseRules"
        value={houseRules}
        onChange={(e) => setHouseRules(e.target.value)}
      />

      <label htmlFor="location">Location:</label>
      <input type="text" id="location" onChange={handlePlaceSelect} />

      {placeData && (
        <div>
          <p>{placeData.formatted_address}</p>
          <p>
            Latitude: {placeData.geometry.location.lat}, Longitude:{" "}
            {placeData.geometry.location.lng}
          </p>
        </div>
      )}

      <progress value={progress} max="100" />
      <br />
      <label htmlFor="images">Upload Image:</label>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload} disabled={!placeData}>
        Upload
      </button>
      <button className="primary"  onClick={handleCloseContact} > Close </button>
    </form>
  );
}

// Component for updating a property listing
function UpdatePropertyForm({ listingId }) {
  // State variables for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [availability, setAvailability] = useState(new Date());
  const [houseRules, setHouseRules] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Get authorization token from localStorage
      const token = localStorage.getItem("token");
      // Construct data object from form fields
      const data = {
        title,
        description,
        price,
        availability,
        houseRules,
      };
       // Send PUT request to update listing with ID
      const response = await axios.put(
        `http://localhost:2000/listings/${listingId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Property updated successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to update property");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="popup">
      <label htmlFor="title">Title:</label>
      <input
        
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />

      <label htmlFor="availability">Availability:</label>
      <input
        type="date"
        id="availability"
        value={availability.toISOString().slice(0, 10)}
        onChange={(e) => setAvailability(new Date(e.target.value))}
      />

      <label htmlFor="houseRules">House Rules:</label>
      <textarea
        id="houseRules"
        value={houseRules}
        onChange={(e) => setHouseRules(e.target.value)}
      />

      <button class ="primary" type="submit">Submit</button>
    </form>
  );
}

function Host() {

  // State variables for form fields
  const [showForm, setShowForm] = useState(false);
 
  const [listings, setListings] = useState([]);
  const [selectedListingId, setSelectedListingId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // fetch listings on component mount
  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:2000/listings", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setListings(response.data);
    };
    fetchListings();
  }, []);

  // navigate to location on Google Maps
  const navigateToLocation = (lat, lng) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    );
  };

  // handle dropdown click event
  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  // handle delete property
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:2000/listings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Property deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Failed to delete property");
    }
  };

  // handle update property
  const handleUpdate = (id) => {
    setSelectedListingId(id);
  };
  // handle delete host account
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
  return (
    <div className="user-container">
      <nav>
        <img src={result} alt="RentAway Logo" />
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
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
      <h1>Welcome to RentAway!</h1>
      <button className="addpropertybutton" onClick={() => setShowForm(true)}>
        Add Property
      </button>
      {showForm && <AddPropertyForm />}
      {selectedListingId && (
        <UpdatePropertyForm listingId={selectedListingId} />
      )}
      <div className="listings">
        {listings.map((listing) => (
          <div className ="listingdiv" key={listing._id}>
            <h2 className="titlename">{listing.title}</h2>
            <p>{listing.description}</p>
            <p>Price: {listing.price}</p>
            <p>
              Availability:{" "}
              {new Date(listing.availability).toLocaleDateString()}
            </p>
            <p>House Rules: {listing.houseRules}</p>
            <p>Status: {listing.status}</p>
            <img
              src={listing.image || "http://via.placeholder.com/200x300"}
              alt="uploaded images"
              height="200"
              width="100%"
            />
            <p>
              <FaLocationArrow
                onClick={() =>
                  navigateToLocation(listing.latitude, listing.longitude)
                }
              />
              Address: {listing.address}
            </p>
            
            <section class="buttons">
            <button  className="primary6" onClick={() => handleDelete(listing._id)}>Delete</button>
            <Link to={`/host_property/${listing._id}`} class="linkdivv"> 
              <button className="primary6">View Property</button>
            </Link>
            <button className="primary6" onClick={() => handleUpdate(listing._id)}>Update</button>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Host;
