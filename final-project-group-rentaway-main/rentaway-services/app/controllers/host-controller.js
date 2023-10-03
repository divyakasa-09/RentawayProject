    import { save, remove, searchId, findHost, update } from './../services/host-service.js';
    import {setSuccessfulResponse, setErrorResponse} from './../utils.js';

    // Saves a new host to the database
    export const post = async (request, response) => {
        try {
            const { firstName, lastName, phoneNumber, email, password } = request.body;

            // Check if email already exists in the database
            const existingHost = await findHost(email);

            if (existingHost) {
                // Returns a 409 if the email already exists
                setErrorResponse('Email already exists', response, 409);
            }
            else
            {
                const savedHost = await save(request.body);

                // Return a 201 if the post request is successful
                setSuccessfulResponse(savedHost, response, 201);
            }
        } catch (err) {
            // Return a 400 if the post is unsuccessful
            setErrorResponse(err, response, 400);
        }
    }

    // Returns a single host
    export const get = async (request, response) => {
        try {
            const id = request.params.id;
            const host = await searchId(id);

            if (!host)
            {
                // If the host cannot be found return a 404
                const errorMessage = `No host found with id ${id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the host is successfully found, return a 200
                setSuccessfulResponse(host, response, 200);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Gets host information like phone number and first name
    export const getHostInfo = async (request, response) => {
        try {
            const { email } = request.params;
            const host = await findHost(email);

            if (!host)
            {
                // If the host cannot be found return a 404
                const errorMessage = `No host found with email ${email}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {

                const { phoneNumber, _id } = host;
                // If the number is successfully found, return a 200
                setSuccessfulResponse({phoneNumber, _id}, response, 200);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Replaces a host with a new host
    export const replace = async (request, response) => {
        try {
            const id = request.params.id;
            const newHost = request.body;
            const updatedHost = await update(id, newHost);
            
            if (!updatedHost)
            {
                // If the host cannot be found return a 404
                const errorMessage = `No host found with id ${id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the host is successfully updated, return a 200
                setSuccessfulResponse(updatedHost, response, 200);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Delete a host
    export const discard = async (request, response) => {
        try {
            const id = request.params.id;
            const deletedHost = await remove(id);

            if (!deletedHost)
            {
                // If the host cannot be found return a 404
                const errorMessage = `No host found with id ${id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the host is successfully deleted, return a no content 204
                setSuccessfulResponse(null, response, 204);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }