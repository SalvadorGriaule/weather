import { useState } from "react";

function Weather(props) {
    const [weatherRes, setWeatherRes] = useState(null)

    let today = new Date();
    let day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    let month = today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1);
    let time = today.getFullYear() + "-" + month + "-" + day + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


    async function fetchWeather() {
        try {
            const resp = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${props.latitude}&longitude=${props.longitude}&current=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m`, {
                mode: "cors",
                credentials: "include"
            }).then(val => val.json());
            setWeatherRes(resp.current);
        } catch (error) {
            console.log(error);
        }
    }

    if (weatherRes == null) fetchWeather();
    
    return (
        <div>
            <p>temps réel: {time}</p>
            {weatherRes && (
                <div>
                    {Object.entries(weatherRes).map((data) => (
                        <p>{data[0]} : {data[1]}</p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Weather;