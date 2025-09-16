// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Login } from "./pages/login/login";
import Main from "./pages/main/main";
import { CreatePost } from "./pages/create-post/CreatePost";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
<Route path="/createpost" element={<CreatePost />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
