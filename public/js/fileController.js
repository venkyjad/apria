app.controller('uploadController', function($scope, $http){

    $scope.upload = function(){
      var file = $scope.fileObj;
      var fd = new FormData();
       fd.append('file', file);
      url = 'employees'
      $http({
        method: "POST",
        url: url,
        data:fd,
        headers: { "Content-Type": undefined },
        encType:"multipart/form-data",
        }).then(function (res) {
          if (res.data.status == "success")

            swal({
                title: "Alert!",
                text: "File has been uploaded",
                icon: "success"
              });
          
      }).catch(function(res){
          swal({
                title: "Alert!",
                text: res.data.message,
                icon: "success"
              });
      });
    }
	
  
});
