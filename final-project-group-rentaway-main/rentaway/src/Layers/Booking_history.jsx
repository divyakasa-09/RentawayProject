import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Booking_history.scss";


function History() {
  const [history, setHistory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

  // getting booking history for the user
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:2000/history/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setHistory(response.data);
    };
    fetchData();
  }, []);
  

  // after clicking add review button open a for form to give the reviews
  const handleAddReview = async (propertyId) => {
    setShowForm(true);
    setShowReviews(false);
    setPropertyId(propertyId);

  };
  
    // after clicking view review button open a for form to show the reviews
  const handleViewReviews = async (propertyId) => {
    setShowReviews(true);
    setShowForm(false);
    setPropertyId(propertyId);
    
    // api to get reviews
    const response = await axios.get(`http://localhost:2000/properties/${propertyId}/reviews`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  
    setReviews(response.data);
  };
    
  const handleCloseForm = () => {
    setShowForm(false);
    setShowReviews(false);
  };
  
  // api to create reviews
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:2000/properties/${propertyId}/reviews`, // include property ID in URL
      { propertyId,rating, feedback: comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    window.location.reload();
    console.log(response.data);
    alert("review added successfully");
    setShowForm(false);
    setShowReviews(true);
  };

  return (
    <div class="history">
      <h1 class="history__title">Booking History</h1>
       <ul class="history__list">
        {history.map((item) => (
          <li class="history__item" key={item._id}>
            <div class="history__property-id">
              <strong>Property ID:</strong> {item.propertyId}
            </div>
            <div class="history__title">
              <strong>Title:</strong> {item.title}
            </div>
            <div class="history__price">
              <strong>Price:</strong> {item.price}
            </div>
            <div class="history__buttons">
              <button onClick={() => handleAddReview(item.propertyId)}>Add Review</button>
              <button onClick={() => handleViewReviews(item.propertyId)}>View Reviews</button>
            </div>
           
        
            {showForm && item.propertyId === propertyId && (
              <div class="history__review-form">
                <h3>Add Review</h3>
                <form>
                  <div>
                    <label htmlFor="rating">Rating:</label>
                    <input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      class="history__review-form-rating"
                    />
                  </div>
                  <div>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      class="history__review-form-comment"
                    />
                  </div>
                  <div>
                    <button onClick={handleSubmit} type="submit">Submit Review</button>
                    <button onClick={handleCloseForm}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
            {showReviews && item.propertyId === propertyId && (
              <div class="history__reviews">
                <h3>Reviews</h3>
                {reviews.map((review) => (
                  <div key={review._id} class="history__review">
                    <div>
                      <strong>Rating:</strong> {review.rating}
                    </div>
                    <div>
                      <strong>Comment:</strong> {review.feedback}
                    </div>
                  </div>
                ))}
                <button onClick={handleCloseForm}>Close Reviews</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );


  
  
  
}

export default History;
