import React, { useState } from "react";
import axios from "axios";
import "./Payment.scss";
import { Link } from "react-router-dom";

function Payment() {
  const [paymentDetails] = useState({
    BookingId: localStorage.getItem("bookingId"),
    amount: localStorage.getItem("price"),
    title: localStorage.getItem("property_name"),
  });
  const propertyId = localStorage.getItem("propertyId");
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const checkInDate = localStorage.getItem("checkInDate");
  const checkOutDate = localStorage.getItem("checkOutDate");
  const numPersons = localStorage.getItem("Number_of_persons");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const gst = ((Number(paymentDetails.amount) * 18) / 100).toFixed(2);
  const service_tax = ((Number(paymentDetails.amount) * 2) / 100).toFixed(2);
  const totalAmount = (
    Number(paymentDetails.amount) +
    Number(gst) +
    Number(service_tax)
  ).toFixed(2);
  const [phonenumber, setPhoneNumber] = useState("");
  // eslint-disable-next-line
  const [selectedGuest, setSelectedGuest] = useState("");

  // handles the form submission when the user clicks the "Pay Now" button
  const handleSubmit = async (event) => {
    event.preventDefault();
    let paymentMethodData;
    if (
      selectedPaymentMethod === "paypal" ||
      selectedPaymentMethod === "applepay"
    ) {
      if (phone) {
        paymentMethodData = { phone: phone };
      } else {
        alert("Phone number is required.");
        return;
      }
    } else {
      if (!cardNumber) {
        alert("Card number is required.");
        return;
      }
      if (!expiryDate) {
        alert("Expiry date is required.");
        return;
      }
      if (!cvv) {
        alert("CVV is required.");
        return;
      }
      paymentMethodData = {
        cardNumber: cardNumber,
        expiryDate: expiryDate,
        cvv: cvv,
      };
    }
    const totalAmount = (
      Number(paymentDetails.amount) +
      Number(gst) +
      Number(service_tax)
    ).toFixed(2);
    const data = {
      listingId: propertyId,
      bookingId: paymentDetails.BookingId,
      amount: totalAmount,
      paymentMethod: selectedPaymentMethod,
      paymentMethodData: paymentMethodData,
    };
    try {

      // send a request to the server to process the payment
      const response = await axios.post(
        "http://localhost:2000/payments/booking",
        JSON.stringify(data),
        {
          headers: {
           
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      window.scrollTo(0, 0); // scrolls to the top of the page
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 500000); // hide the popup after 500 seconds
      localStorage.setItem("totalAmount", totalAmount);
    } catch (error) {
      console.log(error);
      alert("Failed to process payment");
    }

    try {
        const token = localStorage.getItem("token");
      console.log("token",token)
      const history = {
        title: paymentDetails.title,
        price: paymentDetails.amount,
        propertyId:propertyId
      };
      console.log("history",history)

      // send a request to the server to update the user's booking history
      const response = await axios.post(
        "http://localhost:2000/history",
        JSON.stringify(history),
        {
          headers: {
            // set the authorization header with the user's token and content type header to JSON
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      window.scrollTo(0, 0); // scrolls to the top of the page
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 500000); // hide the popup after 500 seconds
      localStorage.setItem("totalAmount", totalAmount);
    } catch (error) {
      console.log(error);
      alert("Failed to process payment");
    }

    try {
        console.log("enter")
        const bookingId = paymentDetails.BookingId;
        const checkInDate = localStorage.getItem('checkInDate');
        const checkOutDate = localStorage.getItem('checkOutDate');
        const amountPaid = totalAmount;
        const contactInfo = +16178344778;
        const message = `Thank you for booking a room through Rentaway! Your payment has been successfully processed and your booking is now confirmed.
        Please find below the details of your booking:
        Booking ID: ${bookingId}
        Check-In Date: ${checkInDate}
        Check-Out Date: ${checkOutDate}
        Total Amount Paid: ${amountPaid}
        If you have any questions or concerns, please don't hesitate to reach out to us at ${contactInfo}.

        We hope you have a pleasant stay with us!

        Best regards,
        The Rentaway Team`;
        const response = await fetch("https://api.twilio.com/2010-04-01/Accounts/AC980ded64d2e76fcbed8754c15ba068c7/Messages.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: 'Basic QUM5ODBkZWQ2NGQyZTc2ZmNiZWQ4NzU0YzE1YmEwNjhjNzowZDg2YTIyYTJiNDBhZWZlOTVmNmNmOWQ1OTI3NTNjNg=='
          },
          body: new URLSearchParams({
            Body: message,
            From: "+15077105077",
            To: String(phonenumber)
          })
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("data",data)

        // do something with the response data
      } catch (error) {
        console.error("Error sending Twilio message:", error);
      }
  };

  // Set showPaymentMethods state to true when payment methods button is clicked
  const handlePaymentMethodsClick = () => {
    setShowPaymentMethods(true);
  };

  // Set payment method and update selected payment method state when payment method is selected
  const handlePaymentMethodSelect = (paymentMethod) => {
    console.log(`Selected payment method: ${paymentMethod}`);
    localStorage.setItem("paymentMethod", paymentMethod);
    setSelectedPaymentMethod(paymentMethod); // Update selected payment method state
    setShowPaymentMethods(false); // Hide payment methods
  };

  // Update phone state when phone input is changed
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  // Update phone number state when phone number input is changed
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // Update card number state when card number input is changed
  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  // Update expiry date state when expiry date input is changed
  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };


  // Update CVV state when CVV input is changed
  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  return (
    <div className="payment-container">
      <h2 className="booking-details-heading">Booking Details:</h2>
      <div className="booking-details">
        <p className="property-id">
          Property ID: {localStorage.getItem("propertyId")}
        </p>
        <p className="property-name">
          Property Name: {localStorage.getItem("property_name")}
        </p>
        <p className="check-in-date">Check-in Date: {checkInDate}</p>
        <p className="check-out-date">Check-out Date: {checkOutDate}</p>
        <p className="num-persons">Number of Persons: {numPersons}</p>
      </div>
      <h2>Payment Details</h2>
      <div className="payment-details">
        <label htmlFor="phone">
          Enter Your Phone Number with country code:
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          required
          value={phonenumber}
          onChange={handlePhoneNumberChange}
        />
        <p>Booking Id: {paymentDetails.BookingId}</p>
        <p>Amount: ${paymentDetails.amount}</p>
        <p>IGST (18%): ${gst}</p>
        <p>Service Tax (2%): ${service_tax}</p>
        <p>Total: ${totalAmount}</p>
      </div>

      <div className="payment-methods">
        <h3>Select Payment Method:</h3>
        <button onClick={handlePaymentMethodsClick}>
          Choose Payment Method
        </button>
        {showPaymentMethods && (
          <div className="payment-methods-dropdown">
            <ul>
              <button onClick={() => handlePaymentMethodSelect("paypal")}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/196/196566.png"
                  alt="paypal logo"
                  width="30px"
                  height="auto"
                />
              </button>
              <button onClick={() => handlePaymentMethodSelect("applepay")}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png"
                  alt="Apple Pay logo"
                  width="30px"
                  height="auto"
                />
              </button>
              <button onClick={() => handlePaymentMethodSelect("card")}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/60/60378.png"
                  alt="card logo"
                  width="30px"
                  height="auto"
                />
              </button>
            </ul>
          </div>
        )}
      </div>
      {selectedPaymentMethod === "paypal" && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="phone">Enter ID:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={phone}
            onChange={handlePhoneChange}
          />
          <button type="submit">Pay Now</button>
        </form>
      )}
      {selectedPaymentMethod === "applepay" && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="phone">Enter ID:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={phone}
            onChange={handlePhoneChange}
          />
          <button type="submit">Pay Now</button>
        </form>
      )}
      {selectedPaymentMethod === "card" && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            required
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
          <label htmlFor="expiryDate">Expiry Date (MM/YY):</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            required
            value={expiryDate}
            onChange={handleExpiryDateChange}
          />
          <label htmlFor="cvv">CVV:</label>
          <input
            type="password"
            id="cvv"
            name="cvv"
            required
            value={cvv}
            onChange={handleCvvChange}
          />
          <button type="submit">Pay Now</button>
        </form>
      )}
      {paymentSuccess && (
        <div className="payment-success">
          <h2>Payment Successful!</h2>
          <Link to="/payment_confirmation">
            <button>View Conformation</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Payment;
