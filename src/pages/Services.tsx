import "../styles/Services.scss";
import { ServiceCard } from "../components/ServiceCard";
import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";

type Service = {
  id: number;
  name: string;
  price: number;
  averageRating: number;
  isDeleted: Boolean;
};

export const Services = () => {
  const [servicesData, setServicesData] = useState<Service[]>([]);

  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const facilityId = urlParams.get("facilityId");
  const facilityName = urlParams.get("facilityName");

  useEffect(() => {
    fetch(`${API_BASE_URL}/Services/Facility/${facilityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        setServicesData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const hStyle = { color: "#FF385C" };

  return (
    <>
      <div className="services-section">
        <div className="intro-text">
          <h1>
            {facilityName} | <span style={hStyle}>Services</span>
          </h1>
        </div>

        <div className="services-container">
          {servicesData.map(
            (service) =>
              !service.isDeleted && (
                <ServiceCard
                  key={service.id}
                  name={service.name}
                  price={service.price}
                  averageRating={service.averageRating}
                />
              )
          )}
        </div>
      </div>
    </>
  );
};
