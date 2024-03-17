import React from 'react';
import Editor from './components/Editor';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/docs/:id" element={<Editor />} />
      </Routes>
    </Router>
  );
};

export default App;
