    import { save, update, findGuestBookings, findHostBookings } from './../services/booking-service.js';
    import {setSuccessfulResponse, setErrorResponse} from './../utils.js';

    // Saves a new booking to the database
    export const post = async (request, response) => {
        try {
        const newBooking = request.body;
        const savedBooking = await save(newBooking);

        // Return a 201 if the post request is successful
        setSuccessfulResponse(savedBooking, response, 201);
        } catch (err) {
            // Return a 400 if the post is unsuccessful
            setErrorResponse(err, response, 400);
        }
    }

    // Replaces a booking with a new booking
    export const replace = async (request, response) => {
        try {
            const id = request.params.id;
            const newBooking = request.body;
            const updatedBooking = await update(id, newBooking);

            if (!updatedBooking)
            {
                // If the booking cannot be found return a 404
                const errorMessage = `No booking found with id ${id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the booking is successfully updated, return a 200
                setSuccessfulResponse(updatedBooking, response, 200);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Gets a guests bookings
    export const getGuestBookings = async (request, response) => {
        try{
            const bookings = await findGuestBookings(request.params.id);
            // If the history is successfully found, return a 200
            setSuccessfulResponse(bookings, response, 200);
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Gets a hosts bookings
    export const getHostBookings = async (request, response) => {
        try{
            const bookings = await findHostBookings(request.params.id);
            // If the history is successfully found, return a 200
            setSuccessfulResponse(bookings, response, 200);
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }