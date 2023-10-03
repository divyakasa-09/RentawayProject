    import { save, findHistory} from './../services/history-service.js';
    import {setSuccessfulResponse, setErrorResponse} from './../utils.js';

    // Saves a new history to the database
    export const post = async (request, response) => {
        const { title, price, propertyId} = request.body;
        const userId = request.user.id
        try {
            const savedHistory = await save(title, price, propertyId, userId);

            // Return a 201 if the post request is successful
            setSuccessfulResponse(savedHistory, response, 201);
        } catch (err) {
            // Return a 400 if the post is unsuccessful
            setErrorResponse(err, response, 400);
        }
    }

    // Returns a single history
    export const get = async (request, response) => {
        try {
            const history = await findHistory(request.user.id);
            if (!history)
            {
                // If the history cannot be found return a 404
                const errorMessage = `No history found with user id ${request.user.id}`;
                setErrorResponse(errorMessage, response, 404);
            }
            else {
                // If the history is successfully found, return a 200
                setSuccessfulResponse(history, response, 200);
            }
        } catch (err) {
            // If there is a different error return a 400
            setErrorResponse(err, response, 400);
        }
    }