import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import HomePage from './pages/homepage/HomePage';
import HomeLoans from "./Components/HomeLoans/HomeLoans";
import AmortizationTable from "./Components/AmortizationTable/AmortizationTable";
import AutolLoans from "./pages/autoLoans/autoloans";
import Footer from "./Components/footer/Footer";
import InflationCalculator from "./pages/money-inflation/MoneyInflation";

function App() {
  return (
    <>
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/HomeLoans" element={<HomeLoans />} />
            <Route path="/AmortizationTable" element={<AmortizationTable />} />
            <Route path="/AutoLoans" element={<AutolLoans />} />
            <Route path="/InflationCalulator" element={<InflationCalculator />} />
          </Routes>
          <Footer/>
    </BrowserRouter>
    </>
    
  );
}

export default App;
