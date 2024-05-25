import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import dayjs from 'dayjs';


const backendUrl = 'http://localhost:8000';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${backendUrl}/tasks`);
        let tasks = response.data;
        tasks.map(task =>{task.dueDate = dayjs(task.dueDate); return task;})
        setTasks(response.data);
        console.log('Tasks fetched:', response.data)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const saveTask = async (task) => {
    try {
      if (task.id) {
        await axios.put(`${backendUrl}/tasks/${task.id}`, task);
        setTasks(tasks.map(t => (t.id === task.id ? task : t)));
      } else {
        console.log(tasks.length)
        task.id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
        await axios.post(`${backendUrl}/tasks`, task);
        setTasks([...tasks, task]);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${backendUrl}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList tasks={tasks} deleteTask={deleteTask} />} />
        <Route path='/new-task' element={<TaskForm tasks={tasks} saveTask={saveTask} />} />
        <Route path='/edit-task/:taskId' element={<TaskForm tasks={tasks} saveTask={saveTask} />} />
      </Routes>
    </Router>
  );
};

export default App;
