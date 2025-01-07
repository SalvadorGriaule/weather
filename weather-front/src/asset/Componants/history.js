import { useEffect, useState } from "react";

function DisplayHistory() {
    const [history, setHistory] = useState("")

    async function fetchHistory() {
        try {
            const resp = await fetch(`http://localhost:5000/history`, {
                mode: "cors",
                credentials: "include"
            }).then(val => val.json());
            setHistory(resp);
            console.log(resp);
            return resp
        } catch (error) {
            console.log(error);
        }
    }
    if (history == "") fetchHistory();

    return (
        <div>
            <p>Historique</p>
            {history && (
                <div>
                    {history.map((data) => (
                        <div>
                            <p>{data.position}</p>
                            <p>{data.weather}</p>
                            <p>{data.time}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DisplayHistory;

