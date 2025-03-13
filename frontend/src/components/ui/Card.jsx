import { useState } from "react"
import { updateShift, deleteShift, addAppointment} from "../../requests";
import { formatDate } from "../../functions";

import AddShift from "../forms/AddShift";
import InnerCard from "./InnerCard";
import AddAppointment from "../forms/AddAppointment";

export default function Card({data, currentComplexitySum, procedureInShift, allData}) {
    const {shift_id, shift_date, complexity_limit, appointments = [], procedures = []} = data;
    const parentData = {
        shift_id: shift_id,
        complexity_limit: complexity_limit,
    };
    const[edit, setEdit] = useState(false);
    const [shown, setShown] = useState(false);

    const handleDelete = async () => {
        if (window.confirm(`Вы уверены, что хотите удалить смену на ${formatDate(shift_date)}?`)) {
            const res = await deleteShift(shift_id);
            if(res){
                alert(res.message);
                window.location.reload();
            }
            
        }
    };

    return (
        <div className="card-block">
            {edit?(
                <AddShift setShown={setEdit} requestFunction={updateShift} initialData={data}/>
            ):(
                <>
                    <div className="card-block-title">
                        <h2 className="card-block-title-name">
                            {formatDate(shift_date)}
                        </h2>
                        <div>
                            <img src="/images/icon-edit.png" onClick={() => setEdit(true)} className="card-block-title-edit-button" alt="Изменить" />
                            <img src="/images/icon-remove.png" onClick={() => handleDelete()} className="card-block-title-delete-button" alt="Удалить" />
                        </div>
                    </div>
                    <div className="card-block-subitems">
                        <h3>Доступные процедуры:</h3>
                        <div className="card-block-subitems-list">
                            {procedures.map((element, index) => {
                                return (
                                    <div key={index} className="card-block-subitems-list-item">
                                        {element.procedure_name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {appointments.length > 0?(
                        <>
                            <h3>Записи ({currentComplexitySum(shift_id)}/{complexity_limit}):</h3>
                            <div className="card-block-tasks-list">
                                {appointments.map((element, index) => {
                                    return (
                                        <InnerCard key={index} data={element} parentData={parentData} allData={allData} currentComplexitySum={currentComplexitySum} procedureInShift={procedureInShift}/>
                                    )
                                })}

                            </div>
                        </>
                    ):(
                        <div className="card-block-tasks-title">Нет записей ({currentComplexitySum(shift_id)}/{complexity_limit})</div>
                    )}
                    {shown?(
                        <AddAppointment setShown={setShown} parentData={parentData} requestFunction={addAppointment} currentComplexitySum={currentComplexitySum} procedureInShift={procedureInShift}/>
                    ):(
                        <div className="buttons-block">
                            <button className="unfiled-button" onClick={() => setShown(true)}>Добавить запись</button>
                        </div>
                    )}
                    

                </>
            )}
        </div>
    )
}