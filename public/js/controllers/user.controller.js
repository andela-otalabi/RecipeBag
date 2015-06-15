app.controller('usersController', ['$scope', 'Users', '$location', '$cookies', '$rootScope', function($scope, Users, $location, $cookies, $rootScope) {

  $scope.createUser = function() {
    var userdetails = {
      name: $scope.name,
      username: $scope.username,
      password: $scope.password
    };

    Users.createUser(userdetails).success(function(response) {
      var res = response.message;
      $scope.response = res;
      console.log('user created');
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
        console.log('successfully saved token in userStorage');
        if (res.userdetails.username == "admin") {
          $location.path('/approveRecipes');
        } else{
          $location.path('/userRecipes');
        }
      } else {
        $scope.errorMessage = 'Incorrect username or password';
      }
    }).error(function(error) {
      console.log(err);
    });
  };

  $scope.getUserRecipes = function(){

  };
}]).controller('IndexCtrl', function($scope, $cookies, $location, $rootScope) {
  $scope.logout = function() {
    $cookies.remove('user');
    $rootScope.rootUser = $cookies.get('user');
    $location.path('/');
  };
});
