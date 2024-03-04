import { BodySection } from "../components/BodySection";
import cuateClient from "../assets/images/cuate-client.png";
import cuateSecurity from "../assets/images/cuate-security.png";
import cuateManteinance from "../assets/images/cuate-manteinance.png";
import cuateDirector from "../assets/images/cuate-director.png";

export const Home = () => {
  return (
    <>
      <div className="main-header">
        <div className="landing-img">
          <div className="centered-content">
            <h1>Elevating Airport Management</h1>
            <p>
              We are dedicated to seamless airport management and efficient
              services requests. Explore a new dimension of service excellence
              with us!
            </p>
            <button>Explore</button>
          </div>
        </div>
      </div>

      <BodySection
        title="Find the perfect service"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, facilis libero pariatur recusandae distinctio excepturi officia. Tenetur quod sequi odit molestias pariatur aut ipsa asperiores in dolorum, eos, dignissimos quae!"
        imageUrl={cuateClient}
      />
      <BodySection
        title="Direct your dream airport"
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem ad doloremque harum nam nobis suscipit at facere ipsum adipisci. Ut quae vitae natus iste ea repudiandae voluptatem adipisci neque eaque."
        imageUrl={cuateDirector}
      />
      <BodySection
        title="Secure your security"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum possimus sequi suscipit? Aut deserunt fugiat cumque obcaecati voluptate corrupti suscipit maxime asperiores, quo aliquid perspiciatis dignissimos accusantium ducimus qui at."
        imageUrl={cuateSecurity}
      />
      <BodySection
        title="Mantain everything working"
        text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus dolorum sunt culpa tenetur obcaecati adipisci nam explicabo. Incidunt, explicabo, temporibus non delectus dolore numquam eveniet eligendi provident impedit, praesentium mollitia!"
        imageUrl={cuateManteinance}
      />
    </>
  );
};
