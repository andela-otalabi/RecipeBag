var app = angular.module('recipeApp', ['ngRoute', 'ngCookies', 'angularFileUpload', 'angularModalService', 'toastr', 'angularUtils.directives.dirPagination'])
  .config(function( $routeProvider) {

    $routeProvider.when('/', {
      templateUrl: 'partials/home.html',
      controller: 'recipesController'
    }).
    when('/recipes', {
      templateUrl: 'partials/recipes.html',
      controller: 'recipesController'
    }).
    when('/showRecipeDesc/:id', {
      templateUrl: 'partials/fullRecipeDescription.html',
      controller: 'fullRecipeController'
    }).
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'usersController'
    }).
    when('/approveRecipes', {
      templateUrl: 'partials/allrecipes.html',
      controller: 'approveController'
    }).
    when('/createRecipe', {
      templateUrl: 'partials/createRecipe.html',
      controller: 'recipeController'
    }).
    when('/logout', {
      templateUrl: 'partials/logout.html',
      controller: 'usersController'
    }).
    when('/signUp', {
      templateUrl: 'partials/signUp.html',
      controller: 'usersController'
    }).
    when('/userRecipes', {
      templateUrl: 'partials/userRecipes.html',
      controller: 'userRecipeCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });
  });
