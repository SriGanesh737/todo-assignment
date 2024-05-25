const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const app = express();

// Use CORS middleware
app.use(cors());
// Use body-parser middleware to parse JSON
app.use(bodyParser.json()); 


// setup redis client
const redis = require('ioredis');
const client = new redis({
  host: 'localhost',
  port: 6379
});


// routes for todo app

// get all tasks
app.get('/tasks', async (req, res) => {
  let tasks = await client.keys('*');
  if(tasks.length === 0){
    res.status(404).send('No tasks found');
    return;
  }
  tasks = await client.mget(tasks);
  // parse the tasks
  tasks = tasks.map(task => JSON.parse(task));
  // console.log(tasks)
  res.status(200).send(tasks);
})

// get task with specific id
app.get('/tasks/:id', async (req, res) => {
  let task = await client.get(req.params.id);
  if(!task){
    res.status(404).send('Task not found');
    return;
  }
  // parse the task
  task = JSON.parse(task);
  // console.log(task)
  res.status(200).send(task);
})

// add new task
app.post('/tasks', async (req, res) => {
  const {id, title, description, status, dueDate} = req.body;
  // console.log(req.body)
  if(!id || !title || !description || !status || !dueDate){
    res.status(400).send('All fields are required');
    return;
  }
  const task = {
    id,
    title,
    description,
    status,
    dueDate
  }
  await client.set(id, JSON.stringify(task));
  // console.log(task)
  res.status(201).send('Task added successfully');
})

// update an existing task through it's id
app.put('/tasks/:id', async (req, res) => {
  const {title, description, status, dueDate} = req.body;
  // console.log(req.body)
  if(!title || !description || !status || !dueDate){
    res.status(400).send('All fields are required');
    return;
  }
  const task = {
    id: parseInt(req.params.id),
    title,
    description,
    status,
    dueDate
  }
  await client.set(req.params.id, JSON.stringify(task));
  // console.log(task)
  res.status(200).send('Task updated successfully');
})

// delete a task using it's id
app.delete('/tasks/:id', async (req, res) => {
  const task = await client.del(req.params.id);
  if(!task){
    res.status(404).send('Task not found');
    return;
  }
  res.status(200).send('Task deleted successfully');
})


// Listen to port 8000
app.listen(8000,async ()=>{
  // remove all tasks from redis
  // await client.flushall();
  console.log('Server started running on port 8000')
})