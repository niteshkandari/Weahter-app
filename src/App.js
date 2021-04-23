import React, { useState } from "react";
import "./style/main.css";
import './Index.css';
export default function App() {
  const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "40f9fa9ce99130eb981f9a435862396d"
  };
  const [city, setCity] = useState('');
  const [apiData, setApiData] = useState({});
  const [theme, setTheme] = useState('moon');
  const searchHandler = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(data => {
          setApiData(data);
          setCity('');
          console.log(data);
          console.log(city);
        })
      if (typeof apiData.main != "undefined") {
        if (apiData.main.temp > 16) {
          setTheme('sunny');
        }
        else {
          setTheme('moon');
        }
      }
      else {
        setTheme('moon');
      }
    }

  }


  const dateBuilder = d => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "Agust", "September", "October", "November", "december"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  }
  return (
    <React.Fragment>
      <main className="flex justify-center rounded-xl bg-gray-700">
        <div className={`${theme} h-screen flex-shrink-0 bg-white  flex flex-col items-center space-y-20 md:max-w-xl w-screen`}>
          <div className="border-2 border-green-500  w-56  border-t-0 border-l-0 border-r-0  ">
            <input className="w-full bg-transparent rounded-xl text-white  outline-none  tracking-wider p-4 text-center text-2xl"
              type="text" value={city} placeholder="Enter Location..." onChange={e => setCity(e.target.value)} onKeyPress={searchHandler} /></div>
          {(typeof apiData.main != 'undefined') ? (
            <div className="flex flex-col items-center space-y-8">
              <div className="box flex mx-4 flex-col space-y-2 text-4xl text-center uppercase text-white rounded-md ">
                <div>{apiData.name},{apiData.sys.country}</div>
                <div>{dateBuilder(new Date())}</div>
              </div>

              <div className="circle text-white font-semibold p-2 text-3xl flex justify-center items-center flex-col space-y-2 ">
                <div>{Math.round(apiData.main.temp)}&deg;c</div>
                <div>{apiData.weather[0].main}</div>
              </div> </div>) : (<p className="absolute bottom-12 text-l text-white uppercase border  border-b-2 border-t-0 border-r-0 border-l-0 border-green-500">weather app </p>)}
        </div>
      </main>
    </React.Fragment>
  );
}

