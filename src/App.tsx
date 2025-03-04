import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import Header from "./shared/components/Header";

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
