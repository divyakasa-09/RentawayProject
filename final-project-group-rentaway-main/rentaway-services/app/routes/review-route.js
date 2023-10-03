    import express from 'express';
    import * as reviewController from './../controllers/review-controller.js';
    import { authMiddleware } from '../utils.js';

    const router = express.Router();

    router.route('/:propertyId')
        .all(authMiddleware)
        .get(reviewController.getReviewsForProperty);

    router.route('/:id')
        .all(authMiddleware)
        .put(reviewController.replace);

    router.route('/:propertyId/reviews')
        .all(authMiddleware)
        .post(reviewController.postReview)
        .get(reviewController.getReviews);

    router.route('/:propertyId/hostreviews')
        .all(authMiddleware)
        .get(reviewController.getHostReviews);

    export default router;