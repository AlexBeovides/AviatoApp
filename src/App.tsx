import "./styles/_main.scss";
import { NavBar } from "./components/NavBar";
import { FooterSection } from "./components/FooterSection";
import { Home } from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { ClientsManager } from "./pages/ClientsManager";
import { AirportsManager } from "./pages/AirportsManager";
import { FacilitiesManager } from "./pages/FacilitiesManager";
import { ServicesManager } from "./pages/ServicesManager";
import { PlanesManager } from "./pages/PlanesManager";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Facilities } from "./pages/Facilities";

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
          <Route path="/aviatoapp/airports_manager" element={<AirportsManager />}></Route>
          <Route path="/aviatoapp/facilities_manager" element={<FacilitiesManager />}></Route>
          <Route path="/aviatoapp/services_manager" element={<ServicesManager />}></Route>
          <Route path="/aviatoapp/planes_manager" element={<PlanesManager />}></Route>
          <Route path="/aviatoapp/facilities" element={<Facilities />}></Route>
          <Route path="/aviatoapp/register" element={<Register />}></Route>
          <Route path="/aviatoapp/login" element={<Login/>}></Route>
        </Routes>

        <FooterSection />
      </div>
    </>
  );
}

export default App;
