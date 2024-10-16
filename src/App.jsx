import { useState } from 'react'


function App() {
  const [tasks, setTasks] = useState([]); // Array to store tasks
  const [newTask, setNewTask] = useState(''); // Store new task input
  const handleChange = (e) => {
    setNewTask(e.target.value)
  }
  const handleAdd = () => {
    setTasks([...tasks, { text: newTask, isDone: false }]);
    setNewTask('')
  }

  return (
    <div>
      <div>
        <input type="text" onChange={handleChange} value={newTask} />
        <button onClick={handleAdd} >Add</button>
      </div>
      <div>
        <h2>your task</h2>
        {tasks.map((v, i) => (
          <div key={i}>{v.text}</div>
        ))}
      </div>
    </div>
  )
}

export default App
