import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Login from "./components/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import "./styles.css";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
