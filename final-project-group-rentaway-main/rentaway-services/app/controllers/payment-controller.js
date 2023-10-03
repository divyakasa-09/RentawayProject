    import { save, findPaymentsForGuest, findPaymentsForHost, saveBookingPayment } from './../services/payment-service.js';
    import {setSuccessfulResponse, setErrorResponse} from './../utils.js';

    // Saves a new payment to the database
    export const post = async (request, response) => {
        try {
            const { id } = request.params;
            const { guestId, amount } = request.body;

            // Create new payment instance
            const savedPayment = await save(guestId, id, amount);

            // Return a 201 if the post request is successful
            setSuccessfulResponse(savedPayment, response, 201);
        } catch (err) {
            // Return a 400 if the post is unsuccessful
            setErrorResponse(err, response, 400);
        }
    }

    // Creates a new payment for a booking
    export const payForBooking = async (request, response) => {
        try {

            // Create new payment instance
            const savedPayment = await saveBookingPayment(request.body);

            // Return a 201 if the post request is successful
            setSuccessfulResponse(savedPayment, response, 201);
        } catch (err) {
            // Return a 400 if the post is unsuccessful
            setErrorResponse(err, response, 400);
        }
    }

    // Gets payments for a guest id
    export const getPaymentsForGuest = async (request, response) => {
        try {
            const { id } = request.params;

            // Create new payment instance
            const payments = await findPaymentsForGuest(id);

            // Return a 201 if the get request is successful
            setSuccessfulResponse(payments, response, 200);
        } catch (err) {
            // Return a 400 if the get is unsuccessful
            setErrorResponse(err, response, 400);
        }
    }

    // Gets payments for a host id
    export const getPaymentsForHost = async (request, response) => {
        try {
            const { id } = request.params;
            const payments = await findPaymentsForHost(id);

            // Return a 201 if the get request is successful
            setSuccessfulResponse(payments, response, 200);
        } catch (err) {
            // Return a 400 if the get is unsuccessful
            setErrorResponse(err, response, 400);
        }
    }