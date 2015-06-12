


   $scope.formData = {};
    $http.get('/api/recipes')
      .success(function(data) {
        console.log(data);
        $scope.recipes = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
