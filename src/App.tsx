import "./styles/_main.scss";
import { NavBar } from "./components/NavBar";
import { FooterSection } from "./components/FooterSection";
import { Home } from "./pages/Home";

import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Airports } from "./pages/Airports";
import { Register } from "./pages/Register";

function App() {
  const [locked, setLock] = useState(false);

  return (
    <>
      {/* <div className={`${locked ? 'locked' : 'null'} main-container`}> */}
      <div className={`main-container`}>
        <NavBar setLock={setLock} />

        <Routes>
          <Route path="/aviatoapp/" element={<Home />}></Route>
          {/* <Route path="/aviatoapp/clients" element={<Clients />}></Route> */}
          <Route path="/aviatoapp/airports" element={<Airports />}></Route>
          <Route path="/aviatoapp/login" element={<Register />}></Route>
        </Routes>

        <FooterSection />
      </div>
    </>
  );
}

export default App;
