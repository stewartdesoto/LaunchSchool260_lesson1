

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
  }
});

var UserModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/users"
});

var post_1 = new PostModel({id: 1});
//console.log(post_1.toJSON());

post_1.on("change:userId", post_1.setUser);

post_1.fetch();




