angular.module('todoApp', [])
2.  .controller('TodoListController', function() {
3.    var todoList = this;
4.    todoList.todos = [
5.      {text:'learn angular', done:true},
6.      {text:'build an angular app', done:false}];
7.
8.    todoList.addTodo = function() {
9.      todoList.todos.push({text:todoList.todoText, done:false});
10.      todoList.todoText = '';
11.    };
12.
13.    todoList.remaining = function() {
14.      var count = 0;
15.      angular.forEach(todoList.todos, function(todo) {
16.        count += todo.done ? 0 : 1;
17.      });
18.      return count;
19.    };
20.
21.    todoList.archive = function() {
22.      var oldTodos = todoList.todos;
23.      todoList.todos = [];
24.      angular.forEach(oldTodos, function(todo) {
25.        if (!todo.done) todoList.todos.push(todo);
26.      });
27.    };
28.  });
