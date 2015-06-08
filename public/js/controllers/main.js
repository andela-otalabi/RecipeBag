angular.module('recipeController', [])
  .controller('recipesController', function($scope, $http) {
    $scope.formData = {};
    $http.get('/api/recipes')
      .success(function(data) {
        console.log(data);
        $scope.recipes = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    $scope.createTodo = function() {
      $http.post('/api/recipes', $scope.formData)
        .success(function(data) {
          $scope.formData = {};
          $scope.recipes = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
  });
