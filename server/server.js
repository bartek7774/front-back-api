require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT;

const index = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', index);

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };