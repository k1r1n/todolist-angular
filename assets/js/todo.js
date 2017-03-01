var app = angular.module('todolist',[])
app.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    })
  }
})
app.controller('todo',todoCtrl)
  function todoCtrl($scope,$timeout){
    var vm = this
    vm.init = function(){
      $scope.e = []
      vm.sorts = ''
      vm.todo = JSON.parse(localStorage.getItem('data')) || []
      console.log(vm.todo)
    }
    vm.add = function(data){
      if(data){
        vm.todo.push({"id": Date.now(),"list":data.list,"description":data.description,"status":false})
        localStorage.setItem('data', JSON.stringify(vm.todo));
        $scope.data.list = ''
        $scope.data.description = ''
      }
    }
    vm.remove = function(id){
      angular.forEach(vm.todo, function(value, key) {
        if(value.id === id){
          vm.todo.splice(key, 1)
          localStorage.setItem('data', JSON.stringify(vm.todo))
        }
      })
    }
    vm.editBtn = function(id){
      $('.ui.modal').modal('show')
      angular.forEach(vm.todo, function(value, key) {
        if(value.id === id){
          $scope.e.id = vm.todo[key].id
          $scope.e.list = vm.todo[key].list
          $scope.e.description = vm.todo[key].description
          localStorage.setItem('data', JSON.stringify(vm.todo))
        }
      })
    }
    vm.update = function(data){
      angular.forEach(vm.todo, function(value, key) {
        if(value.id === data.id){
          vm.todo[key].list = data.list
          vm.todo[key].description = data.description
          localStorage.setItem('data', JSON.stringify(vm.todo))
          vm.success = true
          $timeout(function(){
            vm.success = false
          },3000)
        }
      })
    }
    vm.check = function(index,variable = false){
      vm.todo[index].status = variable
      localStorage.setItem('data', JSON.stringify(vm.todo))
    }
    return vm
  }
