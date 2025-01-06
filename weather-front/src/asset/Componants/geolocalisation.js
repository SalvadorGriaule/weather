import { useState } from "react";
import Weather from "./weather";

function Position(props) {
    return (
        <div>
            <p>Latitiude : {props.latitude}</p>
            <p>Longitude: {props.longitude}</p>
        </div>
    )
}

function DisplayGeoLoc() {
    const [userLocation, setUserLocation] = useState(null);

    async function getLocalisation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude })
            }, (err) => {
                console.log(err.message)
            })
        } else {
            console.log("error");
            return "error"
        }
    }

    getLocalisation();


    return (
        <div>
            {userLocation && (
                <div>
                    <Position latitude={userLocation.latitude} longitude={userLocation.longitude} />
                    <Weather latitude={userLocation.latitude} longitude={userLocation.longitude} />
                </div>
            )}
        </div>
    )
}

export default DisplayGeoLoc;
