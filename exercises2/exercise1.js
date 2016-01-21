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

// using add, save
blog_writers.fetch({
  success: function(model) {
    outblog();
    var me = new User({
      name: "Stewart",
      email: "stewartdesoto@yahoo.com"
    });
    blog_writers.add(me);
    me.save(null, {
      success: outblog
    });
  }
});

// using create
blog_writers.fetch({
  success: function() {
    outblog();
    blog_writers.create({name: "Laura", email: "password"}, {
      success: outblog
    });
  }
});
