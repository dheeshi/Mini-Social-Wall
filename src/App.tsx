import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import { NavBar } from './components/navbar';
import { Footer } from './components/footer';
import { CreatePost } from './pages/create-post/CreatePost';
import { Login } from './pages/login';
import { Main } from './pages/main/main';


function App() {
  return (
    <div className=' w-full h-full bg-cover'>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/"  element={<Main />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/createpost"  element={<CreatePost />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
