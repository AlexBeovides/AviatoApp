import "../styles/Card.scss";
import "../styles/FacilityCard.scss";

interface CardProps {
  name: string;
  type: string;
  url: string;
}

export const FacilityCard = (props: CardProps) => {
  const propUrl = props.url;
  const propName = props.name;
  const propType = props.type;

  const handleClick = () => () => {
    window.location.href='/aviatoapp/services';
  }

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
