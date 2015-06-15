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
    //console.log('i am abt to create a recipe', $rootScope.rootUser.tokengen);

    $scope.createRecipe = function() {
      $scope.formData = {
        name: $scope.formData.name,
        prepTime: $scope.formData.prepTime,
        cookTime: $scope.formData.cookTime,
        ingredients: $scope.formData.ingredients,
        method: ($scope.formData.method).split(','),
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
      }).progress(function(evt) {
      }).success(function(data) {
        console.log(data.error);
        $scope.message = data.message || data.error;
        // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
      });

      // Recipes.create({
      //     data: $scope.formData,
      //     token: $rootScope.rootUser.tokengen
      //   })
      //   .success(function(data) {
      //     $scope.message = data.message;
      //     $scope.recipe = {
      //       Name: data.data.name,
      //       "Preparation Time": data.data.prepTime,
      //       "Cook Time": data.data.cookTime,
      //       Ingredients: data.data.ingredients,
      //       Method: data.data.method,
      //     };
      //     console.log("newly created recipe", data);
      //     $scope.formData = {
      //       name: $scope.formData.name,
      //       prepTime: $scope.formData.prepTime,
      //       cookTime: $scope.formData.cookTime,
      //       ingredients: $scope.formData.ingredients,
      //       method: $scope.formData.method,
      //       imageLink: $scope.formData.imageLink
      //     };
      //   })
      //   .error(function(data) {
      //     console.log('Error: ' + data);
      //   });
    };


    $scope.fileSelected = function(files) {
      if (files && files.length) {
        $scope.file = files[0];
      }
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
  .controller('userRecipeCtrl', function($scope, $http, $rootScope, $location, $cookies, Recipes, ModalService) {
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

    $scope.editRecipe = function(recipe) {
      console.log(recipe._id);
    
      Recipes.getOneRecipe(recipe._id).then(
        function(response) {
          console.log(response.data);
          
          edittedRecipe = {
            name: response.data.name,
            prepTime: response.data.prepTime,
            cookTime: response.data.cookTime,
            ingredients: response.data.ingredients,
            method: response.data.method.join(),
            imageLink: response.data.imageLink,
            user: response.data.user
          }

          ModalService.showModal({
            templateUrl: "modal.html",
            controller: "edit",
            inputs: {
              'recipe': edittedRecipe
            }
          }).then(function(modal) {

            //it's a bootstrap element, use 'modal' to show it
            modal.element.modal();
            modal.close.then(function(result) {
              console.log(result);
              $scope.recipe = result;

              Recipes.edit(recipe._id, result).then(function(response) {
                console.log(response.data);
              });
            });
          });
        });

    };
  })
  .controller('edit', ['$scope', 'ModalService', 'recipe', 'close', function($scope, ModalService, recipe, close) {
    $scope.newRecipe = angular.copy(recipe); // creates a copy of quote and assign it to the editted quote

    $scope.save = function() {
      close($scope.newRecipe, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.cancel = function() {
      close(recipe, 500); // ignore edit and return old quote
    };
  }]);
