import { useState } from "react";


function DisplayHoroscope() {
    const [horoscope, setHoroscope] = useState("");

    async function fetchHoroscope() {
        try {
            const resp = await fetch(`https://kayoo123.github.io/astroo-api/jour.json`, {
                mode: "cors",
                credentials: "include"
            }).then(val => val.json());
            setHoroscope(resp);
            console.log(resp);
            return resp
        } catch (error) {
            console.log(error);
        }
    }

    if (horoscope == "") fetchHoroscope();

    return (
        <div>
            <h2>Horoscope</h2>
            {horoscope && (
                <div className="p-3 my-3 space-y-2 border-solid border-2 border-black">
                    <div className="space-y-2">{Object.entries(horoscope).map((elem) => (
                        <p><span className="font-bold">{elem[0]}</span> : {elem[1]}</p>
                    ))}</div>
                </div>
            )}
        </div>
    )

}

export default DisplayHoroscope;