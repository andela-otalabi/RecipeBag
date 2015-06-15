app.factory('Users', ['$http', function($http) {
    return {
      createUser: function(userdetails) {
        return $http.post('/api/users', userdetails);
      },

      userLogin: function(loginDetails) {
        return $http.post('/api/users/login', loginDetails);
      },

      userDetails: function(userId) {
        return $http.get('/api/users/'+ userId );
      },


    }
  }]);
