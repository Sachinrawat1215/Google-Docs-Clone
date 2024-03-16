import React from 'react';
import Editor from './components/Editor';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import Login from './components/Login/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Navigate replace to={`/docs/${uuid()}`} />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/docs/:id' element={<Editor />} />
      </Routes>
    </Router>
  )
};

export default App;