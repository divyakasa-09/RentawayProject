import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Payment_conformation.scss";
import QRCode from 'qrcode.react';


function PaymentConfirmation() {
  const bookingId = localStorage.getItem('bookingId');
  const totalAmount = localStorage.getItem('totalAmount');
  const paymentMethod = localStorage.getItem('paymentMethod');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // state to show success popup
  const [countdown, setCountdown] = useState(3); // state for countdown timer
  const PaymentConfirmation = "Payment Confirmation";
  const msg ="Thank you for booking with Rentaway. Your payment has been successfully processed and your booking is now confirmed";

  const history = useNavigate();
  

  useEffect(() => {

    // Set the state to show the success popup
    setShowSuccessPopup(true);
    let timer;
    if (showSuccessPopup && countdown > 0) {

      // If the countdown is still running, set a timer to decrement it by 1 every second
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (showSuccessPopup && countdown === 0) {
      
      // If the countdown has finished, hide the success popup and navigate back to the guest page
      setShowSuccessPopup(false);
      history('/guest');
    }
    return () => clearTimeout(timer);
  }, [showSuccessPopup, countdown, history]);

  return (
    <div className='container'>
    <div className="payment-confirmation">
      <h2>Payment Confirmation</h2>
      <p>Booking ID: {bookingId}</p>
      <p>Total Amount: ${totalAmount}</p>
      <p>Payment Method: {paymentMethod}</p>
      <p>Thank you for booking with Rentaway. Your payment has been successfully processed and your booking is now confirmed.</p>
      <QRCode value={`PaymentConfirmation:${PaymentConfirmation}, bookingId:${bookingId}, totalAmount:${totalAmount}, paymentMethod:${paymentMethod}, ${msg}`} />

      {showSuccessPopup && (
        <div className="signup-success-popup">
          Payment successfully! Redirecting to Home page in {countdown} seconds...
        </div>
      )}
    </div>
    </div>
    
  );
}
  

export default PaymentConfirmation;
