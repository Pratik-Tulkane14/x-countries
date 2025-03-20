import { useEffect, useState } from "react";
import "./App.css";
const BASE_URL =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app";
function App() {
  const [search, setSearch] = useState("");
  const [countriesList, setCountriesList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const getCountries = async () => {
    try {
      const response = await fetch(`${BASE_URL}/countries`);
      const data = await response.json();
      setCountriesList(data);
      setFilterList(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filterData = countriesList.filter((item) => {
      return item.common.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterList(filterData);
  };
  useEffect(() => {
    getCountries();
  }, []);
  return (
    <>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e)}
          className="input-box"
          placeholder="Search for countries..."
        />
      </div>
      <div className="countries-container">
        {filterList.length===0 ?<p className="no-result">no-results</p>:null}
        {filterList &&
          filterList?.map((item, index) => {
            return (
              <div className="countryCard" key={index}>
                <img src={item.png} alt={item.common} className="country-img" />
                <p className="country-name">{item.common}</p>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
