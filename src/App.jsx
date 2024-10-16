import { useState } from 'react'


function App() {
  const [tasks, setTasks] = useState([]); // Array to store tasks
  const [newTask, setNewTask] = useState(''); // Store new task input
  const handleChange = (e) => {
    setNewTask(e.target.value)
  }
  const handleAdd = () => {
    if (newTask.trim() != '') {
      setTasks([...tasks, { text: newTask, isDone: false }]);
      setNewTask('')
    }
  }
  function handelDone(index) {
    const updateTasks = tasks.map((v, i) =>
      i === index ? { ...v, isDone: !v.isDone } : v
    )
    setTasks(updateTasks)

  }

  return (
    <div>
      <div>
        <input type="text" onChange={handleChange} value={newTask} className='border-2 border-black' />
        <button onClick={handleAdd} className='' >Add</button>
      </div>
      <div>
        <h2 className=''>your task</h2>
        {tasks.map((task, index) => (
          <div key={index}>
            <div className='flex justify-evenly w-80'>
              <input type="checkbox"
                checked={task.isDone}
                onChange={() => handelDone(index)}

              />
              <div className={task.isDone ? 'line-through' : ''} >{task.text}</div>
              <div className='flex gap-4'>
                <button>edit</button>
                <button>remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
