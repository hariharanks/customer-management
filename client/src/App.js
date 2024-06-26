import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UpdateCustomer from './components/UpdateCustomer';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes >
                    <Route path="/" exact element={ <Home/> } />
                    <Route path="/add" element={<UpdateCustomer/>} />
                    <Route path="/update/:id" element={<UpdateCustomer/>} />
                </Routes >
            </div>
        </Router>
    );
}

export default App;
