import { BrowserRouter, Routes, Route } from "react-router";
import { useState,useEffect, useContext} from "react";
import './App.css'
import CreateBrand from './components/CreateBrand'
import CreateInfluencer from './components/CreateInfluencer'
import LandingPage from './components/LandingPage'
import DashboardInfluencer from "./components/DashboardInfluencer";
import DashboardBrand from "./components/DashboardBrand";
import ProfileBrand from "./components/ProfileBrand";
import ProfileInfluencer from "./components/ProfileInfluencer";
import BrandState from './context/brands/BrandState';
import InfluencerState from './context/influencers/InfluencerState';
import AlertState from "./context/alert/AlertState";
import BrandDetails from "./components/BrandDetails";
import InfluencerDetails from "./components/InfluencerDetails";
import loaderContext from "./context/loader/loaderContext";
import LoadingBar from "react-top-loading-bar";

function App() {
  const lContext = useContext(loaderContext);
  const {progress,setLoader} = lContext;
  const [infToken, setInfToken] = useState(localStorage.getItem("infToken"));
  const [comToken, setComToken] = useState(localStorage.getItem("comToken"));

  useEffect(() => {
    setInfToken(localStorage.getItem("infToken"));
    setComToken(localStorage.getItem("comToken"));
  }, []);
  return (
    <>
    <AlertState>
    <InfluencerState>
    <BrandState>
    <BrowserRouter>
    <LoadingBar
        color="#ffffff"
        progress={progress}
        onLoaderFinished={() =>setLoader(0)}
    />
    <Routes>
    <Route exact path="/" element={<LandingPage/>} />
    <Route exact path="/signInInfluencer" element={<CreateInfluencer/>} />
    <Route exact path="/signInBrand" element={<CreateBrand/>} />
    <Route exact path="/dashboardInfluencer" element={<DashboardInfluencer/>} />
    <Route exact path="/dashboardBrand" element={<DashboardBrand/>} />
    <Route exact path="/profileInfluencer" element={<ProfileInfluencer setInfToken={setInfToken}/>} />
    <Route exact path="/profileBrand" element={<ProfileBrand setComToken={setComToken}/>} />
    <Route exact path="/:id/brandDetails" element={<BrandDetails/>} />
    <Route exact path="/:id/influencerDetails" element={<InfluencerDetails/>} />
    </Routes>
    </BrowserRouter>
    </BrandState>
    </InfluencerState>
    </AlertState>
    </>
  )
}

export default App
