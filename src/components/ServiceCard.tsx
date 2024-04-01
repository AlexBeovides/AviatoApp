/*import "../styles/Card.scss";*/
import "../styles/ServiceCard.scss";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

interface CardProps {
  id: number;
  name: string;
  description: string;
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
  const [newReview, setnewReview] = useState<Review>({
    rating: 1,
    comment: "",
    serviceId: null,
  });

  const propId = props.id;
  const propPrice = props.price;
  const propName = props.name;
  const propAverageRating = props.averageRating;
  const propImgUrl = props.imgUrl;

  const token = localStorage.getItem("token");

  const handleReviewPost = () => {
    fetch(`${API_BASE_URL}/Reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newReview),
    });
  };

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
    setnewReview({ rating: index, comment: "", serviceId: propId });
    handleReviewPost();
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
            <span>{propAverageRating}</span>
          </div>
          <button className="fluid ui button">Request</button>
        </div>
      </div>
    </div>
  );
};
