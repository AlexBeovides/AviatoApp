import { BodySection } from "../components/BodySection";
import { MenuSection } from "../components/MenuSection";

import { useState, useRef } from "react";

export const Home = () => {
  return (
    <>
      <div className="main-header">
        <div className="landing-img"></div>
      </div>

      <BodySection />

      <MenuSection />
    </>
  );
};

// comentario
