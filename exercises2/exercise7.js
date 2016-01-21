var template1 = Handlebars.compile($("#users").html());

var User = Backbone.Model.extend({
  url: "http://jsonplaceholder.typicode.com/users"
})

//1
var Users = Backbone.Collection.extend({
  model: User,
  url: "http://jsonplaceholder.typicode.com/users",
  initialize: function() {
    this.on("sync sort", renderCollection)
  }
})

function renderCollection() {
  document.body.innerHTML = template1({users: blog_writers.toJSON() });
}

var blog_writers = new Users();

function outblog() {
  console.log(blog_writers.toJSON());

}

// using create
blog_writers.fetch({
  success: function() {
   outblog();
  }
});

// 9
console.log(blog_writers.pluck("name"))