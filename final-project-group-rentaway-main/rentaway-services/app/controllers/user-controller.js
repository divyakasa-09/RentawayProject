    import { save, remove, search, searchId, findUser, update } from './../services/user-service.js';
    import {setSuccessfulResponse, setErrorResponse} from './../utils.js';

    // Saves a new user to the database
    export const post = async (request, response) => {
        try {
            const { firstName, lastName, email, password } = request.body;

            // Check if email already exists in the database
            const existingUser = await findUser(email);

            if (existingUser) {
                // Returns a 409 if the email already exists
                setErrorResponse('Email already exists', response, 409);
            }
            else
            {
                const savedUser = await save(request.body);

                // Return a 201 if the post request is successful
                setSuccessfulResponse(savedUser, response, 201);
            }
        } catch (err) {
            // Return a 400 if the post is unsuccessful
            setErrorResponse(err, response, 400);
        }
    }

    // Returns a single user
    export const get = async (request, response) => {
        try {
            const id = request.params.id;
            const user = await searchId(id);

            if (!user)
            {
                // If the user cannot be found return a 404
                const errorMessage = `No user found with id ${id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the user is successfully found, return a 200
                setSuccessfulResponse(user, response, 200);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    export const getUserInfo = async (request, response) => {
        try {
            const { email } = request.params;
            const user = await findUser(email);

            if (!user)
            {
                // If the user cannot be found return a 404
                const errorMessage = `No user found with email ${email}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {

                const { phoneNumber, _id } = user;
                // If the number is successfully found, return a 200
                setSuccessfulResponse({phoneNumber, _id}, response, 200);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Replaces a user with a new user
    export const replace = async (request, response) => {
        try {
            const id = request.params.id;
            const newUser = request.body;
            const updatedUser = await update(id, newUser);
        
            if (!updatedUser)
            {
                // If the user cannot be found return a 404
                const errorMessage = `No user found with id ${id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the user is successfully updated, return a 200
                setSuccessfulResponse(updatedUser, response, 200);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }

    // Delete a user
    export const discard = async (request, response) => {
        try {
            const id = request.params.id;
            const deletedUser = await remove(id);

            if (!deletedUser)
            {
                // If the user cannot be found return a 404
                const errorMessage = `No user found with id ${id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the user is successfully deleted, return a no content 204
                setSuccessfulResponse(null, response, 204);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }