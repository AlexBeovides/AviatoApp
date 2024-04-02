/*import "../styles/Card.scss";*/
import "../styles/ServiceCard.scss";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface CardProps {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  averageRating: number;
}

interface Review {
  rating: number;
  comment: string;
  serviceId: number | null;
}

export const ServiceCard = (props: CardProps) => {
  const [activeStars, setActiveStars] = useState(0);
  const [clickedStars, setClickedStars] = useState(0);

  const propId = props.id;
  const propPrice = props.price;
  const propName = props.name;
  const propAverageRating = props.averageRating;
  const propImgUrl = props.imgUrl;
  console.log(propId);

  const token = localStorage.getItem("token");

  const handleStarHover = (index: number) => {
    setActiveStars(index + 1);
  };

  const handleStarLeave = () => {
    if (clickedStars === 0) {
      setActiveStars(0);
    }
  };

  const handleStarClick = (index: number) => {
    setClickedStars(index + 1);

    const review: Review = {
      rating: index + 1,
      comment: "", // You might want to set this to a meaningful value
      serviceId: propId,
    };

    fetch(`${API_BASE_URL}/Reviews`, {
      // Replace '/api/reviews' with your actual API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // If your API requires authentication
      },
      body: JSON.stringify(review),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const stars = [];
  for (let index = 0; index < 5; index++) {
    const starClass =
      index < activeStars || (index < clickedStars && clickedStars !== 0)
        ? "active"
        : "inactive";
    stars.push(
      <div
        key={index}
        className={`star ${starClass} ${clickedStars !== 0 ? "noHover" : ""}`}
        onMouseEnter={() => handleStarHover(index)}
        onMouseLeave={handleStarLeave}
        onClick={() => handleStarClick(index)}
      ></div>
    );
  }

  return (
    <div className="card">
      {
        <div className="card__image-container">
          <div
            className="card__image"
            style={{ backgroundImage: `url(${propImgUrl})` }}
          ></div>
        </div>
      }
      <div className="card__info">
        <div className="card__info--title">
          <h3>{propName}</h3>
        </div>
        <div className="card__info--price">
          <p>$ {propPrice}</p>
          <div className="stars-container bottom-row">
            {stars}
            <span>{propAverageRating.toFixed(1)}</span>
          </div>
          <Popup
            trigger={
              <button
                className="fluid ui button request-button"
                onClick={() => {
                  fetch(`${API_BASE_URL}/ServiceRequests`, {
                    // Replace '/api/request' with your actual API endpoint
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`, // If your API requires authentication
                    },
                    body: JSON.stringify({ serviceId: propId }),
                  })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                }}
              >
                Request
              </button>
            }
          >
            <div>Service request confirmed!</div>
          </Popup>
        </div>
      </div>
    </div>
  );
};
