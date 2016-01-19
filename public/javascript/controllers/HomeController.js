(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);
	function HomeController(HomeFactory) {
		var vm = this;
		vm.newToDo = {};

		HomeFactory.getTodos().then(function(data) {
			vm.todos = data;
		});

		vm.addToDo = function() {
			HomeFactory.createToDo(vm.newToDo).then(function(res) {
				vm.newToDo = res;
				vm.todos.push(vm.newToDo);
				vm.newToDo = {};
			});
		};

		vm.deleteTodo = function(todo) {
			HomeFactory.deleteToDo(todo.id).then(function() {
				vm.todos.splice(vm.todos.indexOf(todo),1);
			});
		};

		vm.completeToDo = function(todo) {
			HomeFactory.completeToDo(todo).then(function() {
				todo.deleted = new Date();
			});
		};

		vm.unCompleteToDo = function(todo) {
			HomeFactory.unCompleteToDo(todo).then(function() {
				todo.deleted = null;
			});
		};
	}
})();
