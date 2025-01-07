import { useState } from "react";

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
                        <div className="p-3 my-3 space-y-2 border-solid border-2 border-black">
                            <div className="flex justify-center bg-black text-white rounded-lg items-center border-solid border-2 border-black w-fit p-1">
                                <p>{data.id}</p>
                            </div>
                            <div>
                                <div>{Object.entries(JSON.parse(data.position)).map((elem) => (
                                    <p>{elem[0]} : {elem[1]}</p>
                                ))}</div>
                                <div>{Object.entries(JSON.parse(data.weather)).map((elem) => (
                                    <p>{elem[0]} : {elem[1]}</p>
                                ))}</div>
                                <p>Fait le {data.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DisplayHistory;

