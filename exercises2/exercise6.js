var User = Backbone.Model.extend({
  url: "http://jsonplaceholder.typicode.com/users"
})

//1
var Users = Backbone.Collection.extend({
  model: User,
  url: "http://jsonplaceholder.typicode.com/users"
})

//2
var blog_writers = new Users();

function outblog() {
  console.log(blog_writers.toJSON());

}

// using create
blog_writers.fetch({
  success: function() {
   blog_writers.set({
    id: 1,
    name: "stewart"
   });
   outblog();
  }
});
