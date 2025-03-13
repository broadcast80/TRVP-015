import { useEffect, useState } from "react"
import { fetchAllData, addShift } from "../requests";

import Card from "./ui/Card";
import AddShift from "./forms/AddShift";

export default function Main() {
    const [data, setData] = useState([]);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        fetchAllData(setData);
    }, [])

    const currentComplexitySum = (id) => {
        let current = data.filter((element) => {
            return element.shift_id === parseInt(id);
        })
        return current[0].appointments.reduce((acc, element) => {return acc + element.procedure_complexity}, 0)
    }

    const procedureInShift = (shift_id, procedure_id) => {

        const current = data.find((element) => element.shift_id === parseInt(shift_id));

        if (current && current.procedures) {

            return current.procedures.some((element) => {
                return element.procedure_id === parseInt(procedure_id);
            });
        }

        return false;
    };

    return (
        <main className="main-block">

            {shown ? (
                <div className="main-block-form">
                    <AddShift setShown={setShown} requestFunction={addShift} />
                </div>
            ):(
                <div className="main-block-menu">
                    <button className="filed-button" onClick={() => {setShown(true); window.scrollTo(0,0);}}>Добавить смену</button>
                </div>
            )}

            <div className="main-block-list">
                {data.map((element, index) => {
                    return (
                        <Card key={index} data={element} currentComplexitySum={currentComplexitySum} procedureInShift={procedureInShift} allData={data}/>
                    )
                })}
            </div>
        </main>
    )
}