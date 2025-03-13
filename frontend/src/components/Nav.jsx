import { useState, useEffect } from "react";
import { addProcedure, getProcedures } from "../requests";

import AddProcedure from "./forms/AddProcedure";

export default function Nav() {
    const [shown, setShown] = useState(false);

    const [proceduresList, setProceduresList] = useState([]);

    useEffect(() => {
        getProcedures(setProceduresList);
    }, [])

    return (
        <nav className="nav-block">
            <div className="nav-block-title">
                <img src="/images/image 48.png" alt="Logo" />
            </div>
            <div className="nav-block-subtitle">
                <img
                    src="/images/матвей.jpg"
                    className="nav-block-subtitle-avatar"
                    alt="nav-block-subtitle-avatar"
                />
                <div className="nav-block-subtitle-block">
                    <span className="nav-block-subtitle-name">
                        Матвей Бондаренко Сергеевич
                    </span>
                    <span className="nav-block-subtitle-profession">
                        Директор института пчеловодства
                    </span>
                </div>

            </div>
            {shown ? (
                <div className="nav-block-form">
                    <AddProcedure setShown={setShown} requestFunction={addProcedure}/>
                </div>
            ):(
                <button className="filed-button" onClick={() => {setShown(true);}}>Добавить процедуру</button>
            )}
            <h3>Все виды процедур специалиста</h3>
            <div className="nav-block-subitems-list">
                {proceduresList.map((element, index) => {
                    return (
                        <div key={index} className="nav-block-subitems-list-item">
                            {element.procedure_name}
                        </div>
                    )
                })}
            </div>
        </nav>
    )
}