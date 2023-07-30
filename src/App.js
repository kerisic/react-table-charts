import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
