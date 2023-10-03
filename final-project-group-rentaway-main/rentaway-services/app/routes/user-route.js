import express from 'express';
import * as userController from './../controllers/user-controller.js';
import * as hostController from './../controllers/host-controller.js';

const router = express.Router();

// Set up post for a guest
router.route('/guest')
    .post(userController.post);

// Set up get for a guest
router.route('/guest/:id')
    .get(userController.get);

// Set up get for guest with an email
router.route('/guest/phone/:email')
    .get(userController.getUserInfo);

// Set up put for a guest
router.route('/guest/update/:id')
    .put(userController.replace);
    
// Set up put for a guest
router.route('/guest/delete/:id')
    .delete(userController.discard);

// Set up post for a host
router.route('/host')
    .post(hostController.post);

// Set up get for a host with an id
router.route('/host/:id')
    .get(hostController.get);

// Set up get for a host with an email
router.route('/host/phone/:email')
    .get(hostController.getHostInfo);

// Set up put for a host
router.route('/host/update/:id')
    .put(hostController.replace);

// Set up delete for a host
router.route('/host/delete/:id')
    .delete(hostController.discard);
    

export default router;