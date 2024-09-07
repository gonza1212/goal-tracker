import React, { useState } from 'react';

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    frequency: [],
  });

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prevGoal => ({
      ...prevGoal,
      [name]: value
    }));
  };

  const handleFrequencyChange = (day) => {
    setNewGoal(prevGoal => ({
      ...prevGoal,
      frequency: prevGoal.frequency.includes(day)
        ? prevGoal.frequency.filter(d => d !== day)
        : [...prevGoal.frequency, day]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGoal.title.trim() !== '') {
      setGoals(prevGoals => [...prevGoals, { ...newGoal, id: Date.now() }]);
      setNewGoal({ title: '', description: '', frequency: [] });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Metas Semanales</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          value={newGoal.title}
          onChange={handleInputChange}
          placeholder="Título de la meta"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="description"
          value={newGoal.description}
          onChange={handleInputChange}
          placeholder="Descripción"
          className="w-full p-2 mb-2 border rounded"
        />
        <div className="mb-2">
          <p className="mb-1">Frecuencia:</p>
          {daysOfWeek.map(day => (
            <label key={day} className="inline-flex items-center mr-2">
              <input
                type="checkbox"
                checked={newGoal.frequency.includes(day)}
                onChange={() => handleFrequencyChange(day)}
                className="form-checkbox"
              />
              <span className="ml-1">{day}</span>
            </label>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Agregar Meta
        </button>
      </form>

      <ul>
        {goals.map(goal => (
          <li key={goal.id} className="mb-2 p-2 border rounded">
            <h3 className="font-bold">{goal.title}</h3>
            <p>{goal.description}</p>
            <p>Frecuencia: {goal.frequency.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalTracker;