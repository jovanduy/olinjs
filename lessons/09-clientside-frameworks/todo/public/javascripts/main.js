var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){

  $routeProvider

	.when("/",
	{
		templateUrl : '../views/home.html',
    	controller: "todoController"
    })
    
    $locationProvider.html5Mode(true);
});

app.controller('todoController', function ($scope, $http, $location) {
    $scope.todos = [];
    
    $scope.getTotalTodos = function () {
        // return $scope.todos.length;
        var activeTodos = $scope.todos.filter(function (todo) {
            return !todo.done;
        });
        return activeTodos.length;
    }
    
    $scope.clearCompleted = function () {
        $scope.todos = $scope.todos.filter(function (todo) {
            return !todo.done;
        });
        return $scope.todos;
    }
    
    $scope.addTodo = function () {
        $scope.todos.push({text:$scope.formTodoText, done:false});
        $scope.formTodoText = '';
    }
    
    $scope.editTodo = function (todo) {
        todo.editing=true;
    }
    
    $scope.doneEditing = function (todo) {
        todo.editing=false;
    }
    
    $scope.filterByCompleted = function (todo) {
        if ($scope.show === '' || $scope.show === undefined) {
            return true;
        } else if (todo.done && $scope.show === 'Completed') {
            return true;
        } else if (!todo.done && $scope.show === 'Active') {
            return true;
        } else {
            return false;
        }
    }
});