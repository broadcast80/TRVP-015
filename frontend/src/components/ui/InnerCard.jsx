import { useState } from "react"
import { deleteAppointment, moveAppointment} from "../../requests";
import { formatDate } from "../../functions";

export default function InnerCard({data, allData, currentComplexitySum, procedureInShift, parentData}) {
    const { appointment_id, patient_name, procedure_complexity, procedure_name, procedure_id} = data;
    const [shown, setShown] = useState(false);
    const [newData, setNewData] = useState({
        new_shift_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const current = allData.filter((element) => {
            return element.shift_id === parseInt(value);
        })[0];

        const complexity = current.procedures.filter((element) => {
            return element.procedure_id === parseInt(procedure_id);
        })?.[0]?.procedure_complexity;


        if(name === "new_shift_id" && !procedureInShift(value, procedure_id)){
            alert("В данную смену нельзя записаться на эту процедуру");
            return;
        }

        if(name === "new_shift_id" && (parseInt(current.complexity_limit) - parseInt(currentComplexitySum(value)) < parseInt(complexity))){
            alert("Данная процедура выходит за рамки сложности смены.");
            return;
        }

        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await moveAppointment(appointment_id, newData);
        if (res === 200) {
            setShown(false);
            window.location.reload();
        }
    };

    const handleChancel = (e) => {
        e.preventDefault();
        setShown(false);
    }

    const handleDelete = async () => {
        if (window.confirm(`Вы уверены, что хотите отменить запись на "${procedure_name}"?`)) {
            const res = await deleteAppointment(appointment_id);
            if(res){
                alert(res.message);
                window.location.reload();
            }
            
        }
    };

    

    return (
        <div className="inner-card-block">
            <div className="inner-card-block-title">
                <span className="inner-card-block-name">
                    {patient_name} → {procedure_name} ({procedure_complexity})
                </span>
                {shown?(
                    <>
                        <form onSubmit={handleSubmit} className="form-block">
                            <div className="form-input-block">
                                <label htmlFor="new_shift_id">Новая смена:</label>
                                <select
                                    name="new_shift_id"
                                    value={newData.new_shift_id}
                                    onChange={(e) => handleChange(e)}
                                    required
                                >
                                    <option value="" disabled>
                                        Выберите дату
                                    </option>
                                    {allData.filter((element) => {return element.shift_id !== parentData.shift_id}).map((element) => (
                                        <option key={element.shift_id} value={element.shift_id}>
                                            {formatDate(element.shift_date)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="buttons-block">
                                <button className="grey-button" type="chancel" onClick={(e) => handleChancel(e)}>Отменить</button>
                                <button className="filed-button" type="submit">Сохранить</button>
                            </div>
                        </form>
                    </>
                ):("")}
            </div>

            <div className="inner-card-block-buttons">
                {!shown && (<img src="/images/icon-change.png" alt="Перенаправить" onClick={() => setShown(true)}/>)}
                <img className="inner-card-block-buttons-delete" src="/images/icon-remove.png" alt="Удалить" onClick={handleDelete}/> 
            </div>
        </div>
    )
}