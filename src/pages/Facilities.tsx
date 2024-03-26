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
  return (
    <>
      <div className="facilities-section">
        <div className="intro-text">
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
            stars={4}
            url={Breadway}
          />
          <FacilityCard
            name="Nuts&Screws"
            type="Workshop"
            stars={5}
            url={AMXWorkshop}
          />
          <FacilityCard
            name="Tascon"
            type="Clothing store"
            stars={3}
            url={Tascon}
          />
          <FacilityCard
            name="ArtesaniaDominicana"
            type="Gift shop"
            stars={3}
            url={ArtesaniaDominicana}
          />
          <FacilityCard
            name="Cambio Exchange"
            type="Currency exchange office"
            stars={5}
            url={CambioExchange}
          />
          <FacilityCard name="Ryu" type="Sushi Bar" stars={4} url={Ryu} />
          <FacilityCard
            name="Tagliatella"
            type="Restaurant"
            stars={5}
            url={Tagliatella}
          />
        </div>
      </div>
    </>
  );
};
