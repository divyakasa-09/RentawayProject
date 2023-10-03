    import { save, update, getReviewsForUser, getReviewsForHost, getPropertyReviews } from './../services/review-service.js';
    import { searchListingById } from '../services/listing-service.js';
    import {setSuccessfulResponse, setErrorResponse} from './../utils.js';


    export const postReview = async (request, response) => {
        const { propertyId, rating, feedback } = request.body;
        const userId = request.user.id;

        try{
            const property = await searchListingById(propertyId);
            if (!property)
            {
                // If the property cannot be found return a 404
                const errorMessage = `No property found with id ${propertyId}`;
                setErrorResponse(errorMessage, response, 404);
            }

            const savedReview = await save(propertyId, rating, feedback, userId);
            // Return a 201 if the post request is successful
            setSuccessfulResponse(savedReview, response, 201);
        } catch (err) {
            // Return a 400 if the post is unsuccessful
            setErrorResponse(err, response, 400);
        }
    }

    // Returns reviews for a property
    export const getReviews = async (request, response) => {
        const propertyId = request.params.propertyId;
        const userId = request.user.id;
        try {
            const reviews = await getReviewsForUser(propertyId, userId);

            // If the review is successfully found, return a 200
            setSuccessfulResponse(reviews, response, 200);
            } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Returns reviews for a host
    export const getHostReviews = async (request, response) => {
        const propertyId = request.params.propertyId;

        try {
            const reviews = await getReviewsForHost(propertyId);

            // If the reviews are successfully found, return a 200
            setSuccessfulResponse(reviews, response, 200);
            } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    export const getReviewsForProperty = async (request, response) => {
        const propertyId = request.params.propertyId;

        try {
            const reviews = await getPropertyReviews(propertyId);

            // If the reviews are successfully found, return a 200
            setSuccessfulResponse(reviews, response, 200);
            } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Replaces a review with a new review
    export const replace = async (request, response) => {
        try {
            const id = request.params.id;
            const newReview = request.body;
            const updatedReview = await update(id, newReview);

            if (!updatedReview)
            {
                // If the review cannot be found return a 404
                const errorMessage = `No review found with id ${id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the review is successfully updated, return a 200
                setSuccessfulResponse(updatedReview, response, 200);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }