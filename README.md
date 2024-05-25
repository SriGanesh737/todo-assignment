# To-Do List Application

A simple React-based To-Do List application supporting full CRUD operations. Users can create, read, update, and delete tasks, each with a title, description, status (pending, in-progress, completed), and due date. Easily manage your tasks with a clean and intuitive interface.

## Features

- **Create Tasks**: Add new tasks with a title, description, status, and due date.
- **Read Tasks**: View a list of all tasks with their details.
- **Update Tasks**: Edit existing tasks to update their details.
- **Delete Tasks**: Remove tasks from the list.


## Getting Started

Follow these steps to set up and run the project locally.

### Installation

**Clone the repository:**

   ```sh
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-assignment
   ```

<!-- setup redis docker -->
#### Redis Database
**Start the Redis server using Docker:**

   ```sh
   docker run -d -p 6379:6379 redis
   ```

<!-- backend setup -->
#### Backend
**Navigate to the `backend` directory:**

   ```sh
   cd backend
   ```
**Install the dependencies:**

   ```sh
    npm install
  ```
**Start the server:**

   ```sh
    nodemon server.js
    or
    node server.js
  ```

<!-- setup frontend -->
#### Frontend
**Navigate to the `frontend` directory:**

   ```sh
   cd frontend
   ```
**Install the dependencies:**

   ```sh
    npm install
  ```
**Start the development server:**

   ```sh
    npm start
  ```
**Navigate to `http://localhost:3000/` to view the application.**


<!-- Screenshots -->
## Screenshots
![Task List Page](<Screenshot 2024-05-25 181832.png>) ![Task Edit Form](<Screenshot 2024-05-25 181902.png>) ![Add New Task](<Screenshot 2024-05-25 181915.png>)


