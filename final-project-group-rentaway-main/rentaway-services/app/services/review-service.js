import Review from './../models/review-model.js';

// Save a new review to the database
export const save = async (propertyId, rating, feedback, userId) => {
    const review = new Review({propertyId, rating, feedback, userId});
    return review.save();
}

export const getReviewsForUser = async (propertyId, userId) => {
    const reviews = Review.find({propertyId, userId}).exec();
    return reviews;
}

export const getReviewsForHost = async (propertyId) => {
    const reviews = Review.find({propertyId}).exec();
    return reviews;
}

export const getPropertyReviews = async(id) => {
    const reviews = Review.find({propertyId: id}).exec();
    return reviews;
}

// Replace a review with a new review
export const update = async (id, updatedReview) => {
    const review = Review
        .findByIdAndUpdate(id, updatedReview, {new: true})
        .exec();
    return review;
}