import React from 'react';
import { Link } from 'react-router-dom';
import './TaskList.css';
import { Button } from 'antd';

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <div className="task-list">
      <h1>Task List</h1>
      <Link to="/new-task">
        <Button className='new-task-button' type="primary">
          New Task
        </Button>
      </Link>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div className='task-item-left'>
              <strong>Title: {task.title}</strong>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <p>Due: {`${task.dueDate.$D}/${task.dueDate.$M + 1}/${task.dueDate.$y}`}</p>
            </div>
            <div>
              <Link to={`/edit-task/${task.id}`}>
                <Button type="primary">
                  Edit
                </Button>
              </Link>

              <Button type="primary" danger onClick={() => deleteTask(task.id)}>
                Delete
              </Button>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
