    import express from 'express';
    import * as listingController from './../controllers/listing-controller.js';
    import { authMiddleware } from '../utils.js';

    const router = express.Router();

    // Set up post and get when there are no parameters in the request and add authentication middleware
    router.route('/')
        .all(authMiddleware)
        .post(listingController.post)
        .get(listingController.getListingForUser);

    // Set up get active listings and add authentication middleware
    router.route('/active')
        .all(authMiddleware)
        .get(listingController.getActiveListings);

    // Set up search on get and add authentication middleware
    router.route('/search')
        .all(authMiddleware)
        .get(listingController.searchListings);

    // Set up filter on get and add authentication middleware
    router.route('/filter')
        .all(authMiddleware)
        .get(listingController.filterListings);

    // Set up delete, put, and get when there is an id in the request
    router.route('/:id')
        .all(authMiddleware)
        .delete(listingController.discard)
        .put(listingController.replace)
        .get(listingController.get);

    export default router;