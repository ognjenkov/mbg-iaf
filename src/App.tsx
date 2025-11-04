import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Vehicles from "./pages/Vehicles";
import CreateVehicle from "./pages/CreateVehicle";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <main className="container flex-grow-1 py-3">
        <Routes>
          <Route path="/" element={<Vehicles />} />
          <Route path="/create-vehicle" element={<CreateVehicle />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App
