app.controller('employeeController', function($scope, $http){
  
  // Fetched the list of all Employees
  $scope.empList = function(){
      url = 'employees'
      $http({
        method: "get",
        url: url,
        }).then(function (res) {
          $scope.employee = res.data;
          $scope.employee.selected = {}
          
        }).catch(function(res){

          swal({
                title: "Alert!",
                text: res.data.message,
                icon: "success"
              });
      });
  }
 
  // Gets the template to be shown
  $scope.getTemplate = function (item) {
      if (item._id === $scope.employee.selected._id)
        return 'edit';
      else
        return 'display';
  };

  // changes the data view for Edit
  $scope.editEmp = function (item) {
      $scope.employee.selected = angular.copy(item);
  };


  $scope.reset = function () {
      $scope.employee.selected = {};
  };

  // Saves the employee after edit
  $scope.saveEmp = function (id) {
    url = 'employees'
    $http({
      method: "patch",
      url: url,
      data:$scope.employee.selected,
      }).then(function (res) {
        $scope.employee[id] = angular.copy($scope.employee.selected);
        $scope.reset();
        
        
      }).catch(function(res){
        swal({
              title: "Alert!",
              text: res.data.message,
              icon: "success"
            });
    });
  };

 $scope.empList();

});