import React, { useState, useEffect } from 'react';
import { getProcedures } from '../../requests';

export default function AddProcedure({setShown, requestFunction, initialData={}}) {
    const { procedure_id, procedure_name, procedure_complexity } = initialData;
    const [newData, setNewData] = useState({
        procedure_name: procedure_name || '',
        procedure_complexity: procedure_complexity || '',
    })

    const [proceduresList, setProceduresList] = useState([]);

    useEffect(() => {
        getProcedures(setProceduresList);
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!procedure_id){
            const isExists = proceduresList.some(
                (procedure) =>
                    procedure.procedure_name.toLowerCase() === newData.procedure_name.toLowerCase()
            );
    
            if (isExists) {
                alert('Такая процедура уже есть в списке.');
                return; 
            }
        }

        const res = await requestFunction(newData, procedure_id);

        if (res === 200) {
            setShown(false);
            window.location.reload();
        }
    };

    return (
        <div className="form-block">
            <h2>{procedure_id?`Редактирование процедуры`:"Добавление процедуры"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-input-block">
                    <label htmlFor="procedure_name">Название</label>
                    <input
                        name="procedure_name"
                        type="text"
                        value={newData.procedure_name}
                        placeholder="Перевязка"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-input-block">
                    <label htmlFor="procedure_complexity">Сложность</label>
                    <input
                        name="procedure_complexity"
                        type="number"
                        placeholder='1'
                        value={newData.procedure_complexity}
                        min="1"
                        max="5"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>

                <div className="buttons-block">
                    <button className="grey-button" type="chancel" onClick={() => setShown(false)}>Отменить</button>
                    <button className="filed-button" type="submit">{procedure_id?"Сохранить":"Добавить"}</button>
                </div>
            </form>
        </div>
    );
}