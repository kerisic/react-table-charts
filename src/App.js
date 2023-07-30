import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigationbar from "./components/NavigationBar";
import "./App.css";
import Home from "./pages";
import Table from "./pages/table";

function App() {
  return (
    <Router>
      <Navigationbar />
      <Routes>
        <Route exact path="/" exact element={<Home />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </Router>
  );
}

export default App;
