// ---------- Адрес сервера ----------

const URL = "http://localhost:5000";

// ---------- Запрос на получение всех механиков, их марок и задач ----------

export const fetchAllData = async (setData) => {
    try {
      const response = await fetch(`${URL}/shifts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }

      const data = await response.json();
      
      setData(data);
    } catch (error) {
      console.error('Ошибка при первичной загрузке данных:', error.message);
      alert('Ошибка при первичной загрузке данных: ' + error.message);
    }
  };

// ---------- Запрос на добавление смены ----------

export const addShift = async (data) => {
  try {

    const response = await fetch(`${URL}/shifts/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении смены');
    }

    alert('Смена успешно добавлена!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошибка при добавлении смены: ' + error.message);
  }
};

// ---------- Запрос на удаление смены по его ID ----------

export const deleteShift = async (id) => {
    try {
        const response = await fetch(`${URL}/shifts/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка при удалении смены');
        }

        const result = await response.json();
        return result; 
    } catch (error) {
        console.error('Ошибка:', error.message);
        alert('Ошибка при удалении смены: ' + error.message);
    }
};

// ---------- Запрос на обновление данных о смене ----------

export const updateShift = async (data, id) => {
  try {

    const response = await fetch(`${URL}/shifts/edit/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении данных');
    }

    alert('Данные успешно обновлены!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошибка при обновлении данных: ' + error.message);
  }
};


// ---------- Запрос на добавление процедуры ----------

export const addProcedure = async (data) => {
  try {

    const response = await fetch(`${URL}/procedures/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении процедуры');
    }

    alert('Процедура успешно добавлена!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошибка при добавлении процедуры: ' + error.message);
  }
};

// ---------- Запрос на получение всех процедур ----------

export const getProcedures = async (setData) => {
  try {
      const response = await fetch(`${URL}/procedures`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error('Ошибка при получении процедур');
      }

      const data = await response.json();
      setData(data)
  } catch (error) {
      console.error('Ошибка при загрузке процедур:', error.message);
      alert('Ошибка при загрузке процедур: ' + error.message);
  }
};

// ---------- Запрос на добавление записи на процедуру ----------

export const addAppointment = async (data) => {
  try {

    const response = await fetch(`${URL}/appointments/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении записи на процедуру');
    }

    alert('Запись на процедуру успешно добавлена!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошибка при добавлении записи на процедуру: ' + error.message);
  }
};

// ---------- Запрос на удаление записи на процедуру ----------

export const deleteAppointment = async (id) => {
  try {
      const response = await fetch(`${URL}/appointments/delete/${id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Ошибка при удалении записи на процедуру');
      }

      const result = await response.json();
      return result; 
  } catch (error) {
      console.error('Ошибка:', error.message);
      alert('Ошибка при удалении записи на процедуру: ' + error.message);
  }
};

// ---------- Запрос на перенаправление записи на процедуру ----------

export const moveAppointment = async (id, data) => {
  try {

    const response = await fetch(`${URL}/appointments/move/${id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Ошибка при перенаправлении записи на процедуру');
    }

    alert('Задача успешно перенаправлена!');
    return 200;

  } catch (error) {
    console.error('Ошибка:', error.message);
    alert('Ошшибка при перенаправлении записи на процедуру: ' + error.message);
  }
};