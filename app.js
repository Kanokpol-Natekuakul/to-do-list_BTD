const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 301;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

let todos = [
  { id: 1, task: 'Buy groceries', status: 'Not Started' },
  { id: 2, task: 'Finish homework', status: 'In Progress' }
];

// Render the to-do list
app.get('/', (req, res) => {
  res.render('index', { todos: todos });
});

// Add a new to-do
app.post('/', (req, res) => {
  const todo = req.body.newTodo;
  const newTodo = { id: todos.length + 1, task: todo, status: 'Not Started' };
  todos.push(newTodo);
  res.redirect('/');
});

// Delete a to-do
app.post('/delete', (req, res) => {
  const todoId = parseInt(req.body.todoId);
  todos = todos.filter(todo => todo.id !== todoId);
  res.redirect('/');
});

// Edit a to-do
app.post('/edit', (req, res) => {
  const todoId = parseInt(req.body.todoId);
  const newTask = req.body.newTask;
  todos = todos.map(todo => 
    todo.id === todoId ? { ...todo, task: newTask } : todo
  );
  res.redirect('/');
});

// Update the status of a to-do
app.post('/update-status', (req, res) => {
  const todoId = parseInt(req.body.todoId);
  const newStatus = req.body.status;
  todos = todos.map(todo => 
    todo.id === todoId ? { ...todo, status: newStatus } : todo
  );
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
