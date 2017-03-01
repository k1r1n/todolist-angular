var app = angular.module('todolist',[])
app.controller('todo',todoCtrl)
  function todoCtrl(){
    var vm = this
    vm.hello = "eiei"

    function submit(data){
      console.log(data)
    }
    return vm
  }
