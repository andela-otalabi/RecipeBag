app.controller('recipesController', function($scope, $http, $location, $cookies, Recipes) {
    $scope.getRecipes = function() {
      Recipes.getApprovedRecipes()
        .success(function(data) {
          console.log('this is data from api', data);
          $scope.recipes = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.like = function(recipe) {
      Recipes.like(recipe._id)
        .success(function(response) {
          recipe.likes = response.data.likes;
        })
        .error(function(res) {
          console.log('error:', res);
        });
    };

    $scope.sort = function() {
      Recipes.getApprovedRecipes(true)
        .success(function(data) {
          console.log('this is data from api', data);
          $scope.recipes = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

  })
  .controller('fullRecipeController', function($scope, $http, $location, Recipes, $routeParams) {
    var recipeId = $routeParams.id;
    Recipes.getOneRecipe(recipeId)
      .success(function(res) {
        $scope.recipes = res;
        console.log(res.imageLink);
      })
      .error(function(res) {
        console.log('Error: ' + res);
      });
  })
  .controller('recipeController', function($scope, $http, $rootScope, $location, $cookies, $upload, Recipes) {
    var cookie = $cookies.get('user');
    if (!cookie) {
      $location.path('/login');
    } else {
      $rootScope.rootUser = JSON.parse(cookie);
    }
    console.log('i am abt to create a recipe', $rootScope.rootUser.userdetails.username);

    $scope.fileSelected = function(files) {
      if (files && files.length) {
        $scope.file = files[0];
      }
    };

    $scope.createRecipe = function() {
      $scope.formData = {
        name: $scope.formData.name,
        prepTime: $scope.formData.prepTime,
        cookTime: $scope.formData.cookTime,
        ingredients: $scope.formData.ingredients,
        method: ($scope.formData.method).split('.'),
        imageLink: $scope.formData.imageLink
      };
      console.log("seyi");
      $upload.upload({
        url: '/api/recipes',
        data: {
          data: $scope.formData,
          token: $rootScope.rootUser.tokengen
        },
        file: $scope.file
      }).progress(function(evt) {}).success(function(data) {
        $scope.message = data.message || data.error;
      });
    };
  })
  .controller('approveController', function($scope, $http, $rootScope, $location, $cookies, Recipes) {

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
          console.log('approve success');
          console.log('$scope.recipes[index].approved', $scope.recipes[index].approved);
          $scope.recipes[index].approved = true;
          $scope.message = res.message;
        })
        .error(function(res) {
          console.log('error:', res);
        });
    }
  })
  .controller('userRecipeCtrl', function($scope, $http, $rootScope, $location, $cookies, Recipes, ModalService, $upload) {
    var cookie = $cookies.get('user');
    if (!cookie) {
      $location.path('/login');
    } else {
      $rootScope.rootUser = JSON.parse(cookie);
    }

    Recipes.getUserRecipes($rootScope.rootUser.userdetails._id)
      .success(function(data) {
        console.log('this is data from api', data);
        $scope.recipes = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    $scope.deleteRecipe = function(recipeId, index) {
      Recipes.delete(recipeId)
        .success(function(res) {
          console.log(res.message);
          $scope.recipes.splice(index, 1);
        })
        .error(function(res) {
          console.log('error:', res);
        });
    };

    $scope.editRecipe = function(recipe, index) {
      console.log(recipe._id);

      Recipes.getOneRecipe(recipe._id).then(
        function(response) {
          console.log(response.data);

          var edittedRecipe = {
            name: response.data.name,
            prepTime: response.data.prepTime,
            cookTime: response.data.cookTime,
            ingredients: response.data.ingredients,
            method: response.data.method.join(),
            user: response.data.user
          }

          ModalService.showModal({
            templateUrl: "modal.html",
            controller: "edit",
            inputs: {
              'recipe': edittedRecipe
            }
          }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {
              console.log("this is result", result.file);
              console.log("this is result", result);
              console.log("recipe id", recipe._id);
              $scope.recipe = result['result'];
              $scope.newImage = result.file;
              $scope.recipe.method = result.result.method.split('.');
              console.log($scope.recipe.method);

              $upload.upload({
                url: '/api/recipes/' + recipe._id,
                data: {
                  data: $scope.recipe
                },
                file: $scope.newImage
              }).progress(function(evt) {}).success(function(data) {
                $scope.recipes[index] = data.data;
                $scope.message = data.message || data.error;
              });
            });
          });
        });
    };
  })
  .controller('edit', ['$scope', 'ModalService', 'recipe', 'Recipes', 'close', function($scope, ModalService, recipe, Recipes, close) {

    $scope.fileSelectedForEdit = function(files) {
      if (files && files.length) {
        $scope.file = files[0];
      }
    };

    $scope.newRecipe = angular.copy(recipe); // creates a copy of recipe and assign it to the editted recipe

    $scope.save = function() {
      close({
        result: $scope.newRecipe,
        file: $scope.file
      }, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.cancel = function() {
      close(recipe, 500); // ignore edit and return old recipe
    };
  }]);
