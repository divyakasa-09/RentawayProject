    import express from 'express';
    import * as loginController from '../controllers/login-controller.js';

    const loginRouter = express.Router();

    // Set up login post when there are no parameters in the request
    loginRouter.route('/')
        .post(loginController.post)

    export default loginRouter;