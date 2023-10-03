    import express from 'express';
    import * as bookingController from './../controllers/booking-controller.js';

    const router = express.Router();

    // Set up post when there are no parameters in the request
    router.route('/')
        .post(bookingController.post);

    // Set up put when an Id is provided
    router.route('/:id')
        .put(bookingController.replace);

    // Set up get for a guest with an id
    router.route('/guest/:id')
        .get(bookingController.getGuestBookings);

    // Set up get for a host with an id
    router.route('/host/:id')
        .get(bookingController.getHostBookings);

    export default router;