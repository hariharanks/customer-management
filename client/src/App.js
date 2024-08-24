import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UpdateCustomer from './components/UpdateCustomer';
import Login from './components/auth/login';
import PrivateRoutes from './components/utils/PrivateRoutes';
import { AuthProvider } from './components/context/authContext';
import RefreshHandler from './components/utils/RefreshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthProvider>
      <Router>
        <div className="App">
        <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
          <Routes>
            {/* Protected Routes */}
            <Route element={<PrivateRoutes isAuthenticated={isAuthenticated}/>}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home/>} />
              <Route path="/add" element={<UpdateCustomer />} />
              <Route path="/update/:id" element={<UpdateCustomer />} />
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
