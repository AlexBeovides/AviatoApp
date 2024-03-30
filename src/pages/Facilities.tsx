import "../styles/Facilities.scss";
import { FacilityCard } from "../components/FacilityCard";

// Change for generic imports, fetch from database
import Breadway from "../assets/images/Breadway.jpg";
import AMXWorkshop from "../assets/images/AMX-Workshop.jpg";
import Tascon from "../assets/images/Tascon.jpg";
import ArtesaniaDominicana from "../assets/images/ArtesaniaDominicana.jpg";
import CambioExchange from "../assets/images/Cambio.jpg";
import Ryu from "../assets/images/Ryu.jpg";
import Tagliatella from "../assets/images/Tagliatella.jpg";


export const Facilities = () => {
  const hStyle = { color: '#FF385C' };

  return (
    <>
      <div className="facilities-section">
        <div className="intro-text">
          
          <h1> 
            <select name="" id="airports-select">
              <option value="">Aeropuerto Internacional de Jardines del Rey</option>
              <option value="">Aeropuerto Internacional José Martí</option>
              <option value="">Aeropuerto Internacional Ignacio Agramonte</option>
              <option value="">Aeropuerto Gustavo Rizo</option>
              <option value="">Aeropuerto Carlos Manuel de Céspedes</option>
              <option value="">Aeropuerto de Pinar del Río</option>
              <option value="">Aeropuerto de Sancti Spíritus</option>
            </select> | <span style={hStyle}>Facilities</span></h1>
          <p>
            {" "}
            Hey there! 🛫 Are you ready to explore all the awesome amenities our
            airport has to offer? From cozy 🍔cafeterias🍹 serving up delicious
            snacks to convenient 🛍️shops🎁 where you can find the perfect
            souvenir, we've got you covered. Need a quick tune-up for your
            ships? Our 🛠️workshops🛩️ have everything you need. Let's take a
            virtual tour together and discover the 🎉fantastic facilities🛒 that
            make our airport a top-notch destination for travelers like you!🌟{" "}
          </p>
        </div>

        <div className="facilities-container">
          <FacilityCard
            name="Breadway"
            type="Cafeteria"
            url={Breadway}
          />
          <FacilityCard
            name="AMXWorkshop"
            type="Workshop"
            url={AMXWorkshop}
          />
          <FacilityCard
            name="Tascon"
            type="Clothing store"
            url={Tascon}
          />
          <FacilityCard
            name="ArtesaniaDominicana"
            type="Gift shop"
            url={ArtesaniaDominicana}
          />
          <FacilityCard
            name="CambioExchange"
            type="Currency exchange office"
            url={CambioExchange}
          />
          <FacilityCard 
            name="Ryu" 
            type="Sushi Bar" 
            url={Ryu} 
          />
          <FacilityCard
            name="Tagliatella"
            type="Restaurant"
            url={Tagliatella}
          />
        </div>
      </div>
    </>
  );
};
