app.factory('Recipes', function($http) {
  return {
    getAll: function(){
      return $http.get('/api');
    },
    getApprovedRecipes: function() {
      return $http.get('/api/recipes');
    },
    edit: function(recipe_id, editDetails){
      return $http.put('/api/recipes/' + recipe_id , editDetails);
    },
    create: function(recipeData){
      return $http.post('/api/recipes', recipeData);
    },
    delete: function(recipe_id){
      return $http.delete('/api/recipes/' + recipe_id );
    },
    approve: function(recipe_id){
      return $http.put('/api/recipes/' + recipe_id + '/approve');
    },
    getUserRecipes: function(user_id){
      return $http.get('/api/users/' + user_id + '/recipes');
    },
    getOneRecipe: function(recipe_id){
      return $http.get('/api/recipes/' + recipe_id);
    }
  };
});
