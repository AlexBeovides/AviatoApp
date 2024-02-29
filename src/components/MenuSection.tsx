import '../styles/LowerBodySection.scss' 

import { MenuCard } from './MenuCard';

import { useState , useEffect } from 'react';

import { useInView } from 'react-intersection-observer'
 
import mCardImg1 from "../assets/images/menu-card1.png";
import mCardImg2 from "../assets/images/menu-card2.png";
import mCardImg3 from "../assets/images/menu-card3.jpg";
 

export const MenuSection= ({setInView}:{setInView:any}) => { 

  const { ref , inView }  = useInView();

  useEffect (()=> {
    console.log("asd")
    if(inView==true){
      setInView(true);
    }
    else {
      setInView(false);
    }
  },[inView]);

  return (
    <div className='menu-section lower-body-section'>
      <div className='intro-text'>
        <p> Nos enorgullece presentarles nuestra sección de instalaciones aeroportuarias, un espacio dedicado a brindar información detallada sobre las infraestructuras clave de cada aeropuerto que administramos. En esta sección, los usuarios podrán explorar en profundidad las terminales, pistas de aterrizaje, torres de control, áreas de carga y descarga, así como cualquier otra instalación relevante para el funcionamiento eficiente y seguro de cada aeropuerto. Además, hemos incluido mapas interactivos que permiten una navegación intuitiva por las instalaciones, facilitando a los visitantes una comprensión completa de la distribución y organización del aeropuerto. ¡Esperamos que esta sección sea de gran utilidad para pilotos, pasajeros y entusiastas de la aviación por igual! </p>
      </div>

      <div className='container'>
        <MenuCard name="Cafeteria" price="5" stars={5} url={mCardImg1}/>
        <MenuCard name="Taller"  price="7" stars={3} url={mCardImg2}/>
        <MenuCard name="Tienda de ropa" price="3" stars={4} url={mCardImg3}/>
      </div>
 
    </div>
  );
}