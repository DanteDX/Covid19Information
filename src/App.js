import React, { useEffect, useState } from "react";
import Spinner from "./img/spinner.gif";
import axios from "axios";

function App() {
  const [info, setInfo] = useState([]);
  const [selectedCountryInfo,setSelectedCountryInfo] = useState([]);
  useEffect(() => {
    axios.get("http://api.covid19api.com/summary")
      .then((response) => {
        setInfo(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const globalData = info.Global;
  const todayDate = new Date().toUTCString();
  const submitHandler = e =>{
    e.preventDefault();
    const countryName = e.target.countryName.value;
    const countryNameInfo = info.Countries.filter(eachCountry => eachCountry.Country === countryName);
    setSelectedCountryInfo([...countryNameInfo]);
  }

  return (
    <div className="App">
      <h1 style={{textAlign:'center'}}>Devil May Cry Covid19 Information</h1>
      {info.length === 0 ? (
        <img src={Spinner} alt="Loading Spinner" />
      ) : (
        <div className="AppContent">

          <div className="globalInformation">
              <h1 style={{textDecoration:'underline'}}>World Information</h1>
              <h3>
                Information Date:<span style={{ color: "blue" }}>{todayDate}</span>
              </h3>
              <h3>
                Newly Confirmed:<span style={{ color: "red" }}>{globalData.NewConfirmed}</span>
              </h3>
              <h3>
                Newly Deaths:<span style={{ color: "red" }}>{globalData.NewDeaths}</span>
              </h3>
              <h3>
                Newly Recovered:<span style={{ color: "green" }}>{globalData.NewRecovered}</span>
              </h3>
              <h3>
                Total Confirmed:<span style={{ color: "red" }}>{globalData.TotalConfirmed}</span>
              </h3>
              <h3>
                Total Deaths:<span style={{ color: "red" }}>{globalData.TotalDeaths}</span>
              </h3>
              <h3>
                Total Recovered:<span style={{ color: "green" }}>{globalData.TotalRecovered}</span>
              </h3>
          </div>
          <div className="countrySelection">
          <h1 style={{textDecoration:'underline'}}>Countrywise Information</h1>
          <div className="countrySelectionForm">
              <form onSubmit={e => submitHandler(e)}>
                <label htmlFor="countryName">Select a Country Name for further information:</label>
                <br/>
                <select className="countrySelector" id="countryName" name="countryName">
                  {info.Countries.map(eachCountry =>{
                    return(
                      <option key={Math.random()} value={eachCountry.Country}>
                        {eachCountry.Country}
                      </option>
                    )
                  })}
                </select>
                <button className="countrySelectorButton" type="submit">Select</button>
              </form>
          </div>
          
          <div className="countryInformationContainer">
            {selectedCountryInfo.length === 0 ? (<p>No Country is Selected yet</p>) : (<div className="countryInformation">
              
              <h4>Country:<span style={{color:'blue'}}>{selectedCountryInfo[0].Country}</span></h4>
              <h4>New Confirmed Today:<span style={{color:'green'}}>{selectedCountryInfo[0].NewConfirmed}</span></h4>
              <h4>New Deaths Today:<span style={{color:'red'}}>{selectedCountryInfo[0].NewDeaths}</span></h4>
              <h4>New Recovered Today:<span style={{color:'green'}}>{selectedCountryInfo[0].NewRecovered}</span></h4>
              <h4>Total Confirmed:<span style={{color:'red'}}>{selectedCountryInfo[0].TotalConfirmed}</span></h4>
              <h4>Total Deaths:<span style={{color:'red'}}>{selectedCountryInfo[0].TotalDeaths}</span></h4>
              <h4>Total Recovered:<span style={{color:'green'}}>{selectedCountryInfo[0].TotalRecovered}</span></h4>
            </div>)}
          </div>
        </div>
          </div>
          
      )}
    </div>
  );
}

export default App;
