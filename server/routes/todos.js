const router = require('express').Router();
const helpers=require('../helpers/todos');

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}))

router.route('/')
  .get(helpers.getTodos)
  .post(helpers.createTodo);

router.route('/:id')
  .get(helpers.getTodo)
  .post(helpers.createTodo)
  .delete(helpers.deleteTodo)
  .put(helpers.updateTodo);  

module.exports = router;