import React, { useState } from 'react';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() === '') {
      alert('Please enter some task to add');
      return;
    }

    setTasks([...tasks, taskInput]);
    setTaskInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };
  
  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTasks[index].startsWith('✓') ? updatedTasks[index].slice(2) : `✓ ${updatedTasks[index]}`;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <main>
        <div className="header">
          <h3>TO-DO List</h3>
        </div>
        <hr />
        <div className="list">
          <ul>
            {tasks.map((task, index) => (
              <li key={index} onClick={() => toggleTaskCompletion(index)} className={task.startsWith('✓') ? 'cmpltd' : ''}>
                {task}
                <span onClick={(e) => { e.stopPropagation(); deleteTask(index); }}>×</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="add">
          <input 
            type="text" 
            value={taskInput} 
            onChange={(e) => setTaskInput(e.target.value)} 
            onKeyPress={handleKeyPress}
            placeholder="task"
          />
          <button onClick={addTask}>add task</button>
        </div>
      </main>
      {tasks.length > 0 && (
        <div className="allClearBtn">
          <button onClick={clearAllTasks}>clear ALL</button>
        </div>
      )}
    </div>
  );
}

export default App;
