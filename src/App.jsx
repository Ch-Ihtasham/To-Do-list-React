import { useState, useEffect } from 'react'


function App() {
  const [tasks, setTasks] = useState(() => {
    const saveLocal = localStorage.getItem('task');
    return saveLocal ? JSON.parse(saveLocal) : []
  }); // Array to store tasks
  const [newTask, setNewTask] = useState(''); // Store new task input
  const [isEditing, setIsEditing] = useState(null)
  const [editedText, setEditedText] = useState('')
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
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
  function handleEdit(index) {
    setIsEditing(index)
    setEditedText(tasks[index].text)
  }
  function handelEditSave(index) {
    const updatedEditTask = tasks.map((task, i) =>
      i === index ? { ...task, text: editedText } : task

    )
    setTasks(updatedEditTask)
    setIsEditing(null);
  }
  function handelremove(index) {
    const filtertask = tasks.filter((v, i) => i !== index)
    setTasks(filtertask)
  }

  return (
    <div className='w-3/4 m-auto  bg-slate-400 py-5'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold py-6'>QuilCoders To-Do-List</h1>
        <input type="text" onChange={handleChange} value={newTask} className='border-2 border-yellow-600 pl-2 h-10 w-72 rounded-xl ' />
        <button onClick={handleAdd} className='bg-yellow-600 text-white px-6 py-2 rounded-xl ml-4' >Add</button>
      </div>
      <div>
        <h2 className='text-3xl font-bold  text-center'>Task To Do</h2>
        {tasks.map((task, index) => (
          <div key={index}>
            <div className='flex justify-center items-center gap-10 my-2'>
              <input type="checkbox"
                checked={task.isDone}
                onChange={() => handelDone(index)}

              />
              {isEditing === index ?
                (
                  <div>
                    <input type="text" onChange={(e) => setEditedText(e.target.value)} value={editedText} className='border-2 border-black' />
                  </div>
                ) :
                (<div className={ ` w-72 ${task.isDone ? 'line-through' : ''}`} >{task.text}</div>)}

              <div className='flex gap-4'>
                {isEditing === index ?
                  (
                    <button className='bg-yellow-600 text-white px-2 py-1 rounded-xl ml-4' onClick={() => handelEditSave(index)}> Done</button>
                  ) :
                  (
                    <button className='bg-yellow-600 text-white px-2 py-1 rounded-xl ml-4' onClick={() => handleEdit(index)}>Edit</button>
                  )
                }
                <button className='bg-yellow-600 text-white px-2 py-1 rounded-xl ml-4' onClick={() => handelremove(index)}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
