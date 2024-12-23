const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());  // Middleware to parse JSON request bodies

let tasks = [];  // Array to store tasks in-memory

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
        id: tasks.length + 1,  // Auto-generate ID for the new task
        title,  // Task title from the request body
        completed: false  // Task is not completed by default
    };

    tasks.push(newTask);  // Add the task to the tasks array
    res.status(201).json(newTask);  // Send back the newly created task
});

// DELETE /tasks/:id - Remove a task by its ID
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;  // Get task ID from the URL parameter
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);  // Remove the task from the tasks array
    res.status(204).send();  // No content response after deletion
});

// Start the server and listen on port 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

