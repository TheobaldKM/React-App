// App.js
import { React, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import "./dist/custom.css";
import '@fortawesome/fontawesome-free/css/all.css';
import { UserProvider } from './UserContext';

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import MyPlants from "./pages/MyPlants";
import HowItWorks from "./pages/HowItWorks";
import Plant from "./pages/PlantSingle";
import UpdateProgress from "./pages/UpdateProgress";
import NewPlant from "./pages/NewPlant";
import CommunityMap from "./pages/CommunityMap";
import Leaderboard from "./pages/Leaderboard";
import UpdateProgress_Wildlife from './pages/UpdateProgress_Wildlife';
import SuburbDetails from './pages/SuburbSingle';
import AllPlants from './pages/AllPlants';
import IndividualPlant from './pages/AvailablePlant';
import Nurseries from './pages/Nurseries';
import Eligibility from './pages/Eligibility';
import Vouchers from './pages/Vouchers';

function App() {
  useEffect(() => {
    document.title = 'Free Native Plants Program';
  }, []);
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/plants" element={<MyPlants />} />
              <Route path="/plant/:userPlantsID" element={<Plant />} />
              <Route path="/updatePlant/:userPlantsID" element={<UpdateProgress />} />
              <Route path="/updateProgress-wildlife" element={<UpdateProgress_Wildlife />} />
              <Route path="/new-plant" element={<NewPlant />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/community-map" element={<CommunityMap />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/suburb/:suburbSlug" element={<SuburbDetails />} />
              <Route path="/allplants" element={<AllPlants />} />
              <Route path="/allplants/:PlantID" element={<IndividualPlant />} />
              <Route path="/nurseries" element={<Nurseries />} />
              <Route path="/eligibility" element={<Eligibility />} />
              <Route path="/vouchers" element={<Vouchers />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
