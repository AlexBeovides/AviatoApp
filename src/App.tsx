import "./styles/_main.scss";
import { NavBar } from "./components/NavBar"; 
import { FooterSection } from "./components/FooterSection";
import { Home } from "./pages/Home"

import { Route , Routes } from 'react-router-dom'
import { useState } from "react";

function App() {
  const [ locked , setLock ] = useState(false);

  return (
    <>
      {/* <div className={`${locked ? 'locked' : 'null'} main-container`}> */}
      <div className={`main-container`}>
        <NavBar setLock={setLock}/> 

        <Routes>
          <Route path="/aviatoapp/" element={<Home/>}></Route>
        </Routes>

        <FooterSection/>
    </div>

    </>
    
    
  )
}

export default App
