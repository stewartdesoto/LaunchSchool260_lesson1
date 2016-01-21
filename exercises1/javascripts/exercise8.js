

var PostModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts",
  setUser: function() {
    console.log("updating post's user")
    var self = this;
    var user = new UserModel({id: self.get("userId") });

    user.fetch({
      success: function(model) {
        console.log(self.toJSON());
        self.set("user", model);
        console.log(self.toJSON());
      }
    })
  },
  initialize: function() {
    this.on("change:userId", this.setUser);
  }
});

var UserModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/users"
});

var post_1 = new PostModel({id: 1});
//console.log(post_1.toJSON());



post_1.fetch();

//This won't call setUser because this creates, and doesn't change the user attribute
var post_2 = new PostModel({
  id: 2,
  title: "My new post",
  body: "This is good stuff",
  userId: 2
});


