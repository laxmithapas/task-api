
# To-Do List API with Node.js and Express

This is a simple To-Do List API built with **Node.js** and **Express**. It allows users to:
- Create tasks
- Retrieve all tasks
- Delete tasks

## Prerequisites

Before you start, you need to have the following installed on your computer:
- **Node.js** and **npm** (Node Package Manager). You can download and install them from [Node.js website](https://nodejs.org/en/).

## Installation

1. Clone or download this repository to your local machine.

2. Navigate to your project folder using Command Prompt or PowerShell:
   ```bash
   cd path/to/your/todo-app
   ```

3. Install the required dependencies by running:
   ```bash
   npm install express
   ```

## Usage

1. Create a `server.js` file in your project folder and add the following code:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// DELETE /tasks/:id - Remove a task by ID
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
```

2. Run the server with the following command:
   ```bash
   node server.js
   ```

3. You should see the following message in the terminal:
   ```
   Server is running on http://localhost:3000
   ```

## API Endpoints

### 1. `GET /tasks`
   - **Description**: Retrieve all tasks.
   - **Response**:
     ```json
     []
     ```

### 2. `POST /tasks`
   - **Description**: Add a new task.
   - **Request Body**:
     ```json
     {
       "title": "Task Title"
     }
     ```
   - **Response**:
     ```json
     {
       "id": 1,
       "title": "Task Title",
       "completed": false
     }
     ```

### 3. `DELETE /tasks/:id`
   - **Description**: Delete a task by its ID.
   - **URL Parameters**:
     - `id`: The ID of the task to delete.
   - **Response**:
     - `204 No Content` if the task is successfully deleted.

## Testing the API

You can use **Postman** or **cURL** to test the API. Here’s how to test each endpoint:

### 1. `GET /tasks`
   - Open **Postman** and send a **GET** request to `http://localhost:3000/tasks`.

### 2. `POST /tasks`
   - Open **Postman** and send a **POST** request to `http://localhost:3000/tasks` with the request body:
     ```json
     {
       "title": "New Task"
     }
     ```

### 3. `DELETE /tasks/:id`
   - Open **Postman** and send a **DELETE** request to `http://localhost:3000/tasks/1` (replace `1` with the task ID you want to delete).

## Contributing

Feel free to fork this repository, create an issue, or submit a pull request if you'd like to contribute!

## License

This project is licensed under the MIT License.
