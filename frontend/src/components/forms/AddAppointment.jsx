import { useEffect, useState } from "react";
import { getProcedures } from "../../requests";

export default function AddAppointment({ setShown, requestFunction, parentData, procedureInShift, currentComplexitySum}) {
    const {shift_id, complexity_limit} = parentData;
    const [newData, setNewData] = useState({
        shift_id: shift_id,
        patient_name: '',
        procedure_id: '',
    });

    const [proceduresList, setProceduresList] = useState([]);

    useEffect(() => {
        getProcedures(setProceduresList);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const complexity = proceduresList.filter((element) => {
            return element.procedure_id === parseInt(value);
        })?.[0]?.procedure_complexity;

        if(name === "procedure_id" && !procedureInShift(newData.shift_id, value)){
            alert("В данную смену нельзя записаться на эту процедуру");
            return;
        }

        if(name === "procedure_id" && (complexity_limit - currentComplexitySum(newData.shift_id) < parseInt(complexity))){
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

        const res = await requestFunction(newData, shift_id);
        if (res === 200) {
            setShown(false);
            window.location.reload();
        }
    };

    return (
        <div className="form-block">
            <h2>Добавление записи</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-input-block">
                    <label htmlFor="patient_name">ФИО пациента</label>
                    <input
                        name="patient_name"
                        type="text"
                        placeholder="Иванов Иван Иванович"
                        value={newData.patient_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-select-block">
                    <label htmlFor="procedure_id">Процедуры</label>
                    <select
                        name="procedure_id"
                        value={newData.procedure_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            --Выберите процедуру--
                        </option>
                        {proceduresList.map((element) => (
                            <option key={element.procedure_id} value={element.procedure_id} data-complexity={element.procedure_complexity}>
                                {element.procedure_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="buttons-block">
                    <button className="grey-button" type="button" onClick={() => setShown(false)}>Отменить</button>
                    <button className="filed-button" type="submit">{shift_id ? "Сохранить" : "Добавить"}</button>
                </div>
            </form>
        </div>
    );
}