app.factory('Recipes', function($http, $upload) {
  return {
    getAll: function() {
      return $http.get('/api');
    },
    getApprovedRecipes: function(sort) {
      if (!sort)
        return $http.get('/api/recipes');
      else
        return $http.get('/api/recipes?sort=true');
    },
    like: function(recipe) {
      console.log(recipe, 'from service');
      return $http.post('/api/recipes/' + recipe._id + '/like', recipe);
    },
    delete: function(recipe_id) {
      return $http.delete('/api/recipes/' + recipe_id);
    },
    approve: function(recipe_id) {
      return $http.put('/api/recipes/' + recipe_id + '/approve');
    },
    getUserRecipes: function(user_id) {
      return $http.get('/api/users/' + user_id + '/recipes');
    },
    getOneRecipe: function(recipe_id) {
      return $http.get('/api/recipes/' + recipe_id);
    }
  };
});
