import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import HomePage from './pages/homepage/HomePage';
import HomeLoans from "./Components/HomeLoans/HomeLoans";
import AmortizationTable from "./Components/AmortizationTable/AmortizationTable";
import autolLoans from "./pages/autoLoans/autoloans";

function App() {
  return (
    <>
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/HomeLoans" element={<HomeLoans />} />
            <Route path="/AmortizationTable" element={<AmortizationTable />} />
            <Route path="/autoLoans" element={<autoLoans />} />
          </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
