import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Layers/Home';
import Signup from './Layers/Signup';
import Signin from './Layers/Signin';
import User from './Layers/User';
import Host from './Layers/Host'
import HostUpdate from './Layers/host_update';
import Property from './Layers/Property';
import HostProperty from './Layers/Host_properties';
import Booking from './Layers/Booking';
import Payment from './Layers/Payment'
import PaymentConfirmation from './Layers/Payment_conformation'
import History from './Layers/Booking_history'
import GuestUpdate from './Layers/update_user'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/guest" element={<User />} />
        <Route exact path="/host" element={<Host />} />
        <Route exact path="/hostupdate" element={<HostUpdate />} />
        <Route exact path="/property/:id" element={<Property />} />
        <Route exact path="/host_property/:id" element={<HostProperty />} />
        <Route exact path="/booking" element={<Booking />} />
        <Route exact path="/payment" element={<Payment />} />
        <Route exact path="/payment_confirmation" element={<PaymentConfirmation />} />
        <Route exact path="/booking_history" element={<History />} />
        <Route exact path="/update" element={<GuestUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
