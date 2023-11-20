import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import HomeLoans from "./Components/HomeLoans/HomeLoans";

function App() {
  return (
    <>
    <BrowserRouter>
        <Header />
        <HomeLoans/>
          <Routes>
            <Route path="/" />
          </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
