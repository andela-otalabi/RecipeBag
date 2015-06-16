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
    edit: function(recipe_id, editDetails) {
      return $http.put('/api/recipes/' + recipe_id, editDetails);
    },
    create: function(recipeData) {
      return $http.post('/api/recipes', recipeData);
    },
    like: function(recipe_id){
      return $http.put('/api/recipes/' + recipe_id + '/like');
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
    // },
    // uploadImage: function(formData, token, file) {
    //   $upload.upload({
    //     url: '/api/recipes',
    //     data: {
    //       data: formData,
    //       token: token
    //     },
    //     file: file
    //   });
    }
  };
});
