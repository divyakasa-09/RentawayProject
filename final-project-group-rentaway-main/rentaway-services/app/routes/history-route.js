    import express from 'express';
    import * as historyController from './../controllers/history-controller.js';
    import { authMiddleware } from '../utils.js';

    const router = express.Router();

    // Set up post when there are no parameters in the request and add authentication middleware
    router.route('/')
        .all(authMiddleware)
        .post(historyController.post);

    // Set up post when user is in the request and add authentication middleware
    router.route('/user')
        .all(authMiddleware)
        .get(historyController.get);

    export default router;