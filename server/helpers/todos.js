const { ObjectID } = require('mongodb');
const { mongoose } = require('../db/mongoose');
const { Todo } = require('../models/todo');
const _ = require('../utils/common');

exports.getTodos = (req, res) => {
  Todo.find().then((todos) => {
    if (!todos) {
      return res.status(404).send();
    }
    res.send({ todos });
  }).catch(e => res.status(400).send());
}

exports.createTodo = (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((todo) => {
    res.status(201).send(todo);
  }, (e) => {
    let { errors: { text: { message: name } } } = e;
    res.status(400).send(e);
  });
}

exports.getTodo = (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) return res.status(404).send();

  Todo.findOne({
    _id: id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch(e => res.status(400).send());
}

exports.deleteTodo = async (req, res) => {
  try {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) throw new Error(404);
    let todo = await Todo.findOneAndRemove({ _id: id });
    if (!todo) {
      throw new Error(404);
    }
    res.send({ todo });
  } catch (e) {
    res.status(e.message).send();
  }
}

exports.updateTodo = (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) return res.status(404).send();
  if ((typeof (body.completed) === 'boolean') && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({ _id: id }, { $set: body }, { new: true })
    .then((todo) => {
      if (!todo) return res.status(404).send();
      res.send({ todo });
    }).catch((e) => res.status(404).send());

}

module.exports = exports;