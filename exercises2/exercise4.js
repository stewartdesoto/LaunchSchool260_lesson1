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


// using create, reset
blog_writers.fetch({
  success: function() {
    outblog();
    blog_writers.create({name: "Laura", email: "password"}, {
      success: function() {
        blog_writers.fetch({
          reset: true,
          success: outblog
        });
      }
    });
  }
});
