import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!newTask) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTask }),
      });
      const data = await res.json();
      setTasks([...tasks, data]);
      setNewTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>TaskMaster</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ marginRight: "0.5rem", padding: "0.3rem" }}
        />
        <button onClick={addTask} style={{ padding: "0.3rem 0.6rem" }}>
          Add Task
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;