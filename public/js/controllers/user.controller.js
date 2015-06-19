app.controller('usersController', ['$scope', 'Users', '$location', '$cookies', '$rootScope', 'toastr', function($scope, Users, $location, $cookies, $rootScope, toastr) {

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
        toastr.success('Signup successful');
        $location.path('/login');
      }

    }).error(function(error) {});
  };

  $scope.userLogin = function() {
    var loginDetails = {
      username: $scope.username,
      password: $scope.password
    };
    Users.userLogin(loginDetails).success(function(res) {

      if (res.success === true) {
        $cookies.put('user', JSON.stringify(res));
        if (res.userdetails.username == "admin") {
          $location.path('/approveRecipes');
        } else {
          $location.path('/userRecipes');
        }
      } else {
        $scope.errorMessage = 'Incorrect username or password';
      }
    }).error(function(error) {});
  };

  $scope.getUserRecipes = function() {

  };
}]).controller('IndexCtrl', function($scope, $cookies, $location, $rootScope) {

  if ($cookies.get('user')) {
    $rootScope.rootUser = true;
  }

  $scope.logout = function() {
    $cookies.remove('user');
    $rootScope.rootUser = $cookies.get('user');
    $location.path('/');
  };
});
