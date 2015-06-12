app.factory('Recipes', function($http) {
  return {
    getAll: function(){
      return $http.get('/api');
    },
    get: function() {
      return $http.get('/api/recipes');
    },
    edit: function(recipe_id){
      return $http.put('/api/recipes/' + recipe_id );
    },
    create: function(recipeData){
      return $http.post('/api/recipes', recipeData);
    },
    approve: function(recipe_id){
      return $http.put('/api/recipes/' + recipe_id + '/approve');
    }
  };
});
