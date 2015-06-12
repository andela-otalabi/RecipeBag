app.controller('usersController', ['$scope', 'Users', '$location', '$cookies', function($scope, Users, $location, $cookies) {
  $scope.createUser = function() {
    var userdetails = {
      name: $scope.name,
      username: $scope.username,
      password: $scope.password
    };

    Users.createUser(userdetails).success(function(response) {
      var res = response.message;
      $scope.response = res;
      if (res === 'User created') {
        $location.path('/login');
      }

    }).error(function(error) {
      console.log(error);
    });
  };

  $scope.userLogin = function() {
    var loginDetails = {
      username: $scope.username,
      password: $scope.password
    };
    Users.userLogin(loginDetails).success(function(res) {
      console.log('res :', res);
      if (res.success === true) {

        $cookies.put('user', JSON.stringify(res));

        if (res.userdetails.username == "admin") {
          $location.path('/approveRecipes');
        } else
          $location.path('/createRecipe');
      } else {
        $scope.errorMessage = 'Incorrect username or password';
      }
    }).error(function(error) {
      console.log(err);
    });
  };

  $scope.doLogout = function() {
    Users.logout();
    $scope.user = {};
    $location.path('/');
  };
}]).controller('IndexCtrl', function($scope, $cookies, $location, $rootScope, Users, Recipes) {
  $scope.logout = function() {
    $cookies.remove('user');
    $rootScope.rootUser = $cookies.get('user');
    $location.path('/');
  };
  $scope.userRecipes = function(){
    
  }
});
