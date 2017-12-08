$(document).ready(function () {

  updateList();

  $('#todoInput').on('keydown', function (event) {
    if (event.key === "Enter") {
      if ($(this).val().length > 2)
        createTodo();
    }
  });

  $('ul').on('click', 'li', function (event) {
    updateTodo($(this));
  });

  $('ul').on('click', 'span', function (event) {
    event.stopPropagation();
    removeTodo($(this).parent());
  })
});

function addTodos(todos) {
  let ul = $('ul.list');
  todos.forEach(todo => {
    addTodo(todo);
  });
}

function addTodo(todo) {
  let ul = $('ul.list');
  let li = $('<li></li>').text(todo.text).addClass('task');
  if (todo.completed) {
    li.addClass('done');
    $(li).prepend(`<span>x</span>`);
  }
  li.data('id', todo._id);
  li.data('completed', todo.completed);
  ul.append(li);
}

function updateList() {
  $.getJSON('/api/todos')
    .then(data => data.todos)
    .then(addTodos)
    .catch(error => console.log(error));
}

function createTodo() {
  let todoInput = $('#todoInput');
  $.post('/api/todos', { text: todoInput.val() }, function (data, status) {
    if (status === "success") {
      addTodo(data);
      todoInput.val('');
      todoInput.blur();
    }
  })
    .catch(error => console.log(error));
}

function removeTodo(liToRemove) {
  let id = liToRemove.data('id');
  $.ajax({ method: 'DELETE', url: `/api/todos/${id}` }).
    then(removed => {
      liToRemove.remove();
    })
    .catch(err => console.log(err));
}

function updateTodo(liToUpdate) {
  let id = liToUpdate.data('id');
  let isDone = liToUpdate.data('completed');
  let updateObj={completed:!isDone};

  $.ajax({
    method: 'PUT', 
    url: `/api/todos/${id}`, 
    contentType: 'application/json',
    data: JSON.stringify(updateObj)
  }).
    then(updated => {
      liToUpdate.toggleClass('done');
      liToUpdate.data('completed', updated.todo.completed);

      if(liToUpdate.hasClass('done')){
        liToUpdate.prepend(`<span>x</span>`);
      }
      else{
        liToUpdate.find('span').remove();
      }
     
    })
    .catch(err => console.log(err));
}
