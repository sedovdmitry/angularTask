//Define an angular module for our app
var app = angular.module('myApp', []);

app.controller('tasksController', function($scope, $http) {
  getTask(); // Load all available tasks 
  function getTask(){  
  $http.post("ajax/getTask.php").success(function(data){
        $scope.tasks = data;
       });
  };
  $scope.addTask = function (task) {
    $http.post("ajax/addTask.php?task="+task).success(function(data){
        getTask();
        $scope.taskInput = "";
      });
  };
  $scope.deleteTask = function (task) {
    if(confirm("Are you sure to delete this line?")){
    $http.post("ajax/deleteTask.php?taskID="+task).success(function(data){
        getTask();
      });
    }
  };

  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
      $http.post("ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data){
        getTask();
      });
  };



var date = new Date();

      $scope.today = date;

      $scope.doneAndFilter = function(phoneItem) {
        return tasks.task && phoneItem.priority > 1 && phoneItem.status === true;
      }

      $scope.sortField = undefined; // передаем значение неопределено, чтобы сбросить фильтр, не было сортировки
      $scope.reverse= false; // чтобы не было первоначально никакой сортировки

      // универсальная сортировка:
      $scope.sort = function(fieldName) {
        if ($scope.sortField === fieldName) {
          $scope.reverse = !$scope.reverse;
        } else {
          $scope.sortField = fieldName;
          $scope.reverse = false;
        }
      };
      $scope.isSortUp = function(fieldName) {
        return $scope.sortField === fieldName && !$scope.reverse;
      };
      $scope.isSortDown = function(fieldName) {
        return $scope.sortField === fieldName && $scope.reverse;
      }

});