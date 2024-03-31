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
  address: string;
  imgUrl: string;
  FacilityTypeId: number;
  isDeleted: Boolean;
};

export const Facilities = () => {
  const [airportsData, setAirportsData] = useState<Airport[]>([]);
  const [facilitiesData, setFacilitiesData] = useState<Facility[]>([]);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [selectWidth, setSelectWidth] = useState("auto");

  const getFacilities = (airportId: number) => {
    fetch(`${API_BASE_URL}/Facilities?airportId=${airportId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        setFacilitiesData(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleSelectChange = () => {
    if (selectRef.current) {
      const select = selectRef.current;
      if (select.selectedIndex !== -1) {
        const selectedOption = select.options[select.selectedIndex];
        if (selectedOption) {
          if (selectedOption.value == "") return;
          setSelectWidth(`${selectedOption.text.length - 2}ch`);
          const facilities = getFacilities(
            airportsData[select.selectedIndex - 1].id
          );
          console.log(facilities);
        }
      }
    }
  };

  useEffect(() => {
    handleSelectChange();
    fetch(`${API_BASE_URL}/Airports`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response:", data);
        setAirportsData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

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
              onChange={handleSelectChange}
            >
              <option selected disabled value="">
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
            (facility) =>
              !facility.isDeleted && (
                <FacilityCard
                  name={facility.name}
                  type={facility.address}
                  url={facility.imgUrl}
                />
              )
          )}
        </div>
      </div>
    </>
  );
};
