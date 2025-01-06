import { useEffect, useState } from "react";

function Weather(props) {
    const [weatherRes, setWeatherRes] = useState(null)

    let today = new Date();
    let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    let month = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
    let time = today.getFullYear() + "-" + month + "-" + day + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "Z";


    async function fetchWeather() {
        try {
            const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${props.latitude}&longitude=${props.longitude}&current=temperature_2m,precipitation,wind_speed_10m`, {
                mode: "cors",
                credentials: "include"
            }).then(val => val.json());
            setWeatherRes(resp.current);
            console.log(weatherRes);
        } catch (error) {
            console.log(error);
        }
    }

    if (weatherRes == null) fetchWeather();

    return (
        <div>
            <p>{time}</p>
            {weatherRes && (
                <div>
                    <p>{Object.entries(weatherRes)}</p>
                    {Object.entries(weatherRes).map((data) => {
                        <p>{data}</p>
                    })}
                </div>
            )}
            {/* {weatherRes && (
                    <div>
                    {weatherRes.map((data) => {
                        <div>{data}</div>
                    })}
                    </div>
            )} */}
        </div>
    )
}

export default Weather;