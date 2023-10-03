    import listingRouter from './listing-route.js';
    import bookingRouter from './booking-route.js';
    import paymentRouter from './payment-route.js';
    import reviewRouter from './review-route.js';
    import userRouter from './user-route.js';
    import loginRouter from './login-route.js';
    import historyRouter from './history-route.js';

    // Set up the application to use default routes for each router
    const route = (app) => {
        app.use('/listings', listingRouter);
        app.use('/bookings', bookingRouter);
        app.use('/payments', paymentRouter);
        app.use('/reviews', reviewRouter);
        app.use('/users', userRouter);
        app.use('/login', loginRouter);
        app.use('/history', historyRouter);
        app.use('/properties', reviewRouter);
    }

    // Exports the route
    export default route;