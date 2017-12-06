require('./config/config');

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

const index = require('./routes/index');
const todos = require('./routes/todos');

app.use('/', index);
app.use('/api/todos', todos);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };