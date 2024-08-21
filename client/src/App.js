import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UpdateCustomer from './components/UpdateCustomer';
import Header from "./components/utils/Header";

function App() {
    const [query, setQuery] = useState('');
    return (
        <Router>
            <div className="App">
                <Header query={query} setQuery={setQuery} />
                <Routes >
                    <Route path="/" exact element={<Home  query={query}/>} />
                    <Route path="/add" element={<UpdateCustomer />} />
                    <Route path="/update/:id" element={<UpdateCustomer />} />
                </Routes >
            </div>
        </Router>
    );
}

export default App;
