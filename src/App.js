import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import HomePage from './pages/homepage/HomePage';
import HomeLoans from "./Components/HomeLoans/HomeLoans";

function App() {
  return (
    <>
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/HomeLoans" element={<HomeLoans />} />
          </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
