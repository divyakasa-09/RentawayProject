    import { login } from './../services/login-service.js';
    import { hostLogin } from './../services/host-service.js';
    import jwt from 'jsonwebtoken';
    import {setSuccessfulResponse, setErrorResponse} from './../utils.js';

    // Login guest or host
    export const post = async (request, response) => {
        const {email, password} = request.body;
        try {
            // Check if user is a guest
            const guest = await login(email);
            if (guest && guest.password === password) {
                const token = jwt.sign({ id: guest._id }, 'secret_key');
                setSuccessfulResponse({ token, role: 'guest' }, response, 200);
                return;
            }

            // Check if user is a host
            const host = await hostLogin(email);
            if (host && host.password === password) {
                const token = jwt.sign({ id: host._id }, 'secret_key');
                setSuccessfulResponse({ token, role: 'host' }, response, 200);
                return;
            }

            setErrorResponse('Incorrect email or password', response, 401);
        } catch (err) {
            // Return a 400 if login is unsuccessful
            setErrorResponse(err.message, response, 400);
        }
    }