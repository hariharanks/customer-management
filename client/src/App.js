import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UpdateCustomer from './components/UpdateCustomer';

import Login from './components/auth/login';
import PrivateRoutes from './components/utils/PrivateRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes >
          <Route element={<PrivateRoutes />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/add" element={<UpdateCustomer />} />
            <Route path="/update/:id" element={<UpdateCustomer />} />
          </Route>
          <Route element={<Login />} path="/login" />
        </Routes >
      </div>
    </Router>
  );
}

export default App;
