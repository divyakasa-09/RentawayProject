import React, { useState } from 'react';
import axios from 'axios';
import './Booking.scss';

function Booking() {
  // Initialize state for form data
  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    Number_of_persons: ''
  });
  
  // Retrieve data from local storage
  const propertyId = localStorage.getItem('propertyId');
  const property_name = localStorage.getItem('property_name');
  const price = localStorage.getItem('price');

  console.log("price:",price)
  console.log("propertyId:",propertyId)
  console.log("property_name:",property_name)

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { checkInDate, checkOutDate } = formData;
  if (new Date(checkOutDate) <= new Date(checkInDate)) {
    alert('Check out date must be greater than check in date');
    return;
  }
    try {
      const response = await axios.post('http://localhost:2000/bookings', {
        propertyId,
        property_name,
        ...formData
      });
      console.log(response.data);
      localStorage.setItem('bookingId', response.data._id);
      localStorage.setItem('price',price);
      localStorage.setItem('checkInDate', formData.checkInDate);
      localStorage.setItem('checkOutDate', formData.checkOutDate);
      localStorage.setItem('Number_of_persons', formData.Number_of_persons);
      window.location.href = '/payment'; // redirect to payment page
    } catch (error) {
      console.log(error);
      alert('Failed to create booking');
    }
  };
  
  
  // Handle form input changes
  const handleChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <div className="booking-container">
  <h2 className="booking-heading">Please Enter Booking Details</h2>
  <div className="property-id">Property Id : {propertyId}</div>
  <div className="property-name">Property Name : {property_name}</div>
  <form onSubmit={handleSubmit} className="booking-form">
    <div className="form-group">
      <label htmlFor='checkInDate' className="form-label">Check In Date:</label>
      <input
        type='date'
        id='checkInDate'
        name='checkInDate'
        value={formData.checkInDate}
        onChange={handleChange}
        required
        className="form-input"
      />
    </div>
    <div className="form-group">
      <label htmlFor='checkOutDate' className="form-label">Check Out Date:</label>
      <input
        type='date'
        id='checkOutDate'
        name='checkOutDate'
        value={formData.checkOutDate}
        onChange={handleChange}
        required
        className="form-input"
      />
    </div>
    <div className="form-group">
      <label htmlFor='Number_of_persons' className="form-label">Number of Persons:</label>
      <input
        type='number'
        id='Number_of_persons'
        name='Number_of_persons'
        value={formData.Number_of_persons}
        onChange={handleChange}
        required
        className="form-input"
      />
    </div>
    <button type='submit' className="form-submit-btn">Pay Now</button>
  </form>
</div>

  );
}

export default Booking;
