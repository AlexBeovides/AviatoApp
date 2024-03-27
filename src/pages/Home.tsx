import { BodySection } from "../components/BodySection";
import cuateClient from "../assets/images/cuate-client.svg";
import cuateSecurity from "../assets/images/cuate-security.svg";
import cuateManteinance from "../assets/images/cuate-manteinance.svg";
import cuateDirector from "../assets/images/cuate-director.svg";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export const Home = () => {
  const { token, userRole, userName } = useContext(AuthContext);
  console.log(token);
  return (
    <>
      <div className="main-header">
        <div className="landing-img">
          <div className="centered-content">
            <h1>Elevating Airport Management</h1>
            <p>
              We are commited to seamless airport management and efficient
              services requests. Explore a new dimension of service excellence
              with us!
            </p>
            <a href="/aviatoapp/login">Explore</a>
          </div>
        </div>
      </div>

      <BodySection
        title="Find the perfect service"
        text="Explore the infinite possibilities of airport services. Select the airport of your destination, and you will certainly find what you need among it's facilities."
        imageUrl={cuateClient}
      />
      <BodySection
        title="Direct your dream airport"
        text="Management made easy by our simple-to-use website. If you are the director of an airport, log in to start directing it to it's best future..."
        imageUrl={cuateDirector}
      />
      <BodySection
        title="Secure your security"
        text="From clients, to ships, to flights, we must make sure everything is in order. Airport security is your passion/job? Register with us to start!"
        imageUrl={cuateSecurity}
      />
      <BodySection
        title="Mantain everything working"
        text="I've got a screw to spare, hmmm... Don't worry, the chief mechanic is logued in right now."
        imageUrl={cuateManteinance}
      />
    </>
  );
};
