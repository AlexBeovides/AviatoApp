import "../styles/Services.scss";
import { ServiceCard } from "../components/ServiceCard";
import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  averageRating: number;
  isDeleted: Boolean;
};

type Facility = {
  id: number;
  name: string;
  description: string;
  address: string;
};

export const Services = () => {
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [facilityData, setfacilityData] = useState<Facility>();

  const token = localStorage.getItem("token");
  const urlParams = new URLSearchParams(window.location.search);
  const facilityId = urlParams.get("facilityId");

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

    fetch(`${API_BASE_URL}/Facilities/ByClient/${facilityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        setfacilityData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const hStyle = { color: "#FF385C" };

  return (
    <>
      <div className="services-section">
        <div className="intro-text">
          <h1>
            {facilityData?.name} | <span style={hStyle}>Services</span>
          </h1>
          <p>{facilityData?.description}</p>
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
                  imgUrl={service.imgUrl}
                  id={service.id}
                />
              )
          )}
        </div>
      </div>
    </>
  );
};
