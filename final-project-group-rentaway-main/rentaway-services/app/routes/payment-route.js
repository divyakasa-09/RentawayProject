    import express from 'express';
    import * as paymentController from './../controllers/payment-controller.js';

    const router = express.Router();

    // Set up post and get when there are no parameters in the request
    router.route('/booking')
        .post(paymentController.payForBooking);

    // Set up post and get when there is a host and an id in the request
    router.route('/host/:id')
        .post(paymentController.post)
        .get(paymentController.getPaymentsForHost);

    // Set up get when there is a guest and an id in the request
    router.route('/guest/:id')
        .get(paymentController.getPaymentsForGuest);    

    export default router;