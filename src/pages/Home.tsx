import { BodySection } from "../components/BodySection";
import { MenuSection } from "../components/MenuSection";

import { useState, useRef } from "react";

export const Home= () => {
  const [ inView1 , setInView1 ] = useState(false);
  const [ inView2 , setInView2 ] = useState(false);
  

  return (
    <>
      <div className='main-header'>
        <div className="landing-img"></div>
      </div>
      
      <BodySection/>

      
      <MenuSection 
        setInView={setInView1}
      />
      
    </>
  );
}