import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Adopt from "./Components/Adopt";
import ContactUs from "./Components/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/adopt" replace />} />
        <Route path="/adopt" element={<Adopt />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
