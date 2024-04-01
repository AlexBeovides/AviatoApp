import "../styles/Card.scss";
import "../styles/FacilityCard.scss";

interface CardProps {
  id: number;
  name: string;
  type: string;
  url: string;
  airportId: number;
}

export const FacilityCard = (props: CardProps) => {
  const propUrl = props.url;
  const propName = props.name;
  const propType = props.type;
  const propId = props.id;
  const propAirportId = props.airportId;

  const handleClick = () => () => {
    window.location.href = `/aviatoapp/services?airportId=${propAirportId}&facilityId=${propId}`;
  };

  return (
    <div className="card" onClick={handleClick()}>
      <div className="card__image-container">
        <div
          className="card__image"
          style={{ backgroundImage: `url(${propUrl})` }}
        ></div>
        {/* <img src={`${propUrl}`} alt="Salad" width="500" height="333" /> */}
      </div>
      <div className="card__info">
        <div className="car__info--title">
          <h3>{propName}</h3>
          <div className="bottom-row">{propType}</div>
        </div>
      </div>
    </div>
  );
};
