require('./config/config');

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

const index = require('./routes/index');
const todos = require('./routes/todos');

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/todos', todos);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };