app.controller('recipesController', function($scope, $http, Recipes) {
    $scope.getRecipes = function() {
      Recipes.get()
        .success(function(data) {
          console.log('this is data from api', data);
          $scope.recipes = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
  })
  .controller('recipeController', function($scope, $http, $rootScope, $location, $cookies, Recipes) {
    var cookie = $cookies.get('user');
    if (!cookie) {
      $location.path('/login');
    } else {
      $rootScope.rootUser = JSON.parse(cookie);
    }

    $scope.createRecipe = function() {
      Recipes.create($scope.formData)
        .success(function(data) {
          $scope.recipe = data.data;
          console.log("dad", data);
          $scope.formData = {
            name: $scope.formData.name,
            prepTime: $scope.formData.prepTime,
            cookTime: $scope.formData.cookTime,
            ingredients: $scope.formData.ingredients,
            method: $scope.formData.method,
            imageLink: $scope.formData.imageLink
          };
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
  }).
controller('approveController', function($scope, $http, $rootScope, $location, $cookies, Recipes) {

  var cookie = $cookies.get('user');
  if (!cookie) {
    $location.path('/login');
  } else {
    $rootScope.rootUser = JSON.parse(cookie);
  }
  
  $scope.getRecipes = function() {
    Recipes.getAll()
      .success(function(data) {
        console.log('this is data from api', data);
        $scope.recipes = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.approve = function(recipeId, index) {
    Recipes.approve(recipeId)
      .success(function(res) {
        $scope.message = res.message;
      })
      .error(function(res) {
        console.log('error:', res);
      });
  }
});

