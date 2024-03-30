import "../styles/Services.scss";
import { ServiceCard } from "../components/ServiceCard";

// Change for generic imports, fetch from database
import Pastries from "../assets/images/pastries.png";
import Coffee from "../assets/images/coffee.png";
import Sweets from "../assets/images/sweets.png";

export const Services = () => {
    const hStyle = { color: '#FF385C' };
    return (
    <>
      <div className="services-section">
        <div className="intro-text">
            <h1>Breadway | <span style={hStyle}>Services</span></h1>
            <p>🌟Premium quality 🥖bread🍞 produced using a unique sourdough 🌾fermentation process✨ that makes our bread softer, tastier😋 and with a rich aroma👃. Try it now!👌</p>
        </div>

        <div className="services-container">
          <ServiceCard
            name="Pastries"
            stars={5}
            price="3 USD"
            url={Pastries}
          />
          <ServiceCard
            name="Coffee"
            stars={4}
            price="2 USD"
            url={Coffee}
          />
          <ServiceCard
            name="Sweets"
            stars={5}
            price="4 USD"
            url={Sweets}
          />
        </div>
      </div>
    </>
  );
};
