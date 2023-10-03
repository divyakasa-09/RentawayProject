  import mongoose from "mongoose";

  // Creates the review schema
  const reviewSchema = new mongoose.Schema({
    propertyId : {
      type: String,
      required: true,
    },

      rating: {
          type: Number,
          required: true,
        },
      feedback: {
          type: String,
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
    });
    
    // Exports the review model
    const Review = mongoose.model('Review', reviewSchema);
    export default Review;