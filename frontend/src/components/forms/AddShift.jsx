import React, { useState, useEffect } from 'react';
import { getProcedures } from '../../requests';
import { formatDate } from '../../functions';

export default function AddShift({ setShown, requestFunction, initialData={} }) {
    const { shift_id, complexity_limit, shift_date, procedures = [] } = initialData;
    const initialProcedures = procedures.map(p => p.procedure_id);
    const [newData, setNewData] = useState({
        complexity_limit: complexity_limit || '',
        shift_date: formatDate(shift_date, "html") || '',
        procedures: initialProcedures || [],
    });

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const curDate = `${year}-${month}-${day}`;


    const [proceduresList, setProceduresList] = useState([]);

    useEffect(() => {
        getProcedures(setProceduresList);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, selectedOptions } = e.target;

        if (type === 'select-multiple') {
            const values = Array.from(selectedOptions).map((option) => option.value);
            setNewData((prevData) => ({
                ...prevData,
                [name]: values,
            }));
        } else {
            setNewData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
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
            <h2>{shift_id ? "Редактирование смены" : "Добавление смены"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-input-block">
                    <label htmlFor="shift_date">Дата</label>
                    <input
                        name="shift_date"
                        type="date"
                        min={curDate}
                        value={newData.shift_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-input-block">
                    <label htmlFor="complexity_limit">Суммарная сложность процедур</label>
                    <input
                        name="complexity_limit"
                        type="number"
                        placeholder="5"
                        value={newData.complexity_limit}
                        min="5"
                        max="10"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-select-block">
                    <label htmlFor="procedures">Процедуры</label>
                    <select
                        name="procedures"
                        value={newData.procedures}
                        onChange={handleChange}
                        multiple
                        size="10"
                        required
                    >
                        <option value="" disabled>
                            --Выберите процедуры--
                        </option>
                        {proceduresList.map((element) => (
                            <option key={element.procedure_id} value={element.procedure_id}>
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