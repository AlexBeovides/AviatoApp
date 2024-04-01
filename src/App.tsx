import "./styles/_main.scss";
import { NavBar } from "./components/NavBar";
import { FooterSection } from "./components/FooterSection";
import { Home } from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ClientsManager } from "./pages/ClientsManager";
import { WorkersManager } from "./pages/WorkersManager";
import { AirportsManager } from "./pages/AirportsManager";
import { FacilitiesManager } from "./pages/FacilitiesManager";
import { ServicesManager } from "./pages/ServicesManager";
import { ReviewsManager } from "./pages/ReviewsManager";
import { PlanesManager } from "./pages/PlanesManager";
import { FlightsManager } from "./pages/FlightsManager";
import { Register } from "./pages/Register";
import { LogIn } from "./pages/LogIn";
import { Facilities } from "./pages/Facilities";
import { Services } from "./pages/Services";
import { MyPlanes } from "./pages/MyPlanes";
FlightsManager

function App() {
  const [locked, setLock] = useState(false);

  return (
    <>
      {/* <div className={`${locked ? 'locked' : 'null'} main-container`}> */}
      <div className={`main-container`}>
        <NavBar setLock={setLock} />

        <Routes>
          <Route path="/aviatoapp/" element={<Home />}></Route> 
          <Route path="/aviatoapp/clients_manager" element={<ClientsManager />}></Route>
          <Route path="/aviatoapp/workers_manager" element={<WorkersManager />}></Route>
          <Route path="/aviatoapp/airports_manager" element={<AirportsManager />}></Route>
          <Route path="/aviatoapp/facilities_manager" element={<FacilitiesManager />}></Route>
          <Route path="/aviatoapp/services_manager" element={<ServicesManager />}></Route>
          <Route path="/aviatoapp/reviews_manager" element={<ReviewsManager />}></Route>
          <Route path="/aviatoapp/planes_manager" element={<PlanesManager />}></Route>
          <Route path="/aviatoapp/flights_manager" element={<FlightsManager />}></Route>
          <Route path="/aviatoapp/myplanes" element={<MyPlanes />}></Route>
          <Route path="/aviatoapp/facilities" element={<Facilities />}></Route>
          <Route path="/aviatoapp/services" element={<Services/>}></Route>
          <Route path="/aviatoapp/register" element={<Register />}></Route>
          <Route path="/aviatoapp/login" element={<LogIn/>}></Route>
        </Routes>

        <FooterSection />
      </div>
    </>
  );
}

export default App;
