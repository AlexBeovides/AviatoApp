import "../styles/Facilities.scss";
import { FacilityCard } from "../components/FacilityCard";
import { API_BASE_URL } from "../config";
import { useEffect, useState, useRef } from "react";

type Airport = {
  id: number;
  name: string;
  address: string;
  isDeleted: Boolean;
};

type Facility = {
  id: number;
  name: string;
  imgUrl: string;
  facilityType: string;
  isDeleted: Boolean;
};

export const Facilities = () => {
  const [airportsData, setAirportsData] = useState<Airport[]>([]);
  const [facilitiesData, setFacilitiesData] = useState<Facility[]>([]);
  const [selectedAirportId, setSelectedAirportId] = useState<number | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [selectWidth, setSelectWidth] = useState("auto");
  const token = localStorage.getItem("token");

  const getFacilities = (airportId: number) => {
    fetch(`${API_BASE_URL}/Facilities/WithType/${airportId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        setFacilitiesData(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const airportId = Number(event.target.value);
    setSelectedAirportId(airportId);
    getFacilities(airportId);
  
    // Save the selected airport id to localStorage
    localStorage.setItem('selectedAirportId', String(airportId));
  
    // Adjust the width of the select element
    if (selectRef.current) {
      const select = selectRef.current;
      if (select.selectedIndex !== -1) {
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption) {
          setSelectWidth(`${selectedOption.text.length - 2}ch`);
        }
      }
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/Airports`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        setAirportsData(data);
  
        // Retrieve the selected airport id from localStorage
        const savedAirportId = localStorage.getItem('selectedAirportId');
        if (savedAirportId) {
          setSelectedAirportId(Number(savedAirportId));
          getFacilities(Number(savedAirportId));
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (selectedAirportId) {
      getFacilities(selectedAirportId);
    }
  }, [selectedAirportId]);

  const hStyle = { color: "#FF385C" };

  return (
    <>
      <div className="facilities-section">
        <div className="intro-text">
          <h1>
            <select
              name=""
              id="airports-select"
              ref={selectRef}
              style={{ width: selectWidth }}
              value={selectedAirportId || ""}
              onChange={handleSelectChange}
            >
              <option disabled value="">
                Choose an airport
              </option>
              {airportsData.map(
                (airport) =>
                  !airport.isDeleted && (
                    <option key={airport.id} value={airport.id}>
                      Airport {airport.name}
                    </option>
                  )
              )}
            </select>{" "}
            | <span style={hStyle}>Facilities</span>
          </h1>
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
          {facilitiesData.map(
            (facility, index) =>
              !facility.isDeleted && (
                <FacilityCard
                  key={index}
                  name={facility.name}
                  type={facility.facilityType}
                  url={facility.imgUrl}
                  id={facility.id}
                  airportId={selectedAirportId}
                />
              )
          )}
        </div>
      </div>
    </>
  );
};