var Post = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts",
  setUser: function() {
    var self = this,
        user = new User({id: self.get("userId")});

    user.fetch({
      success: function(model) {
        self.set("user", model);
        console.log(self.toJSON());
      }
    });
  },
  
  initialize: function() {
    this.has("userId") && this.setUser();
    this.on( "change:userId": this.setUser);
  }

});

var post = new Post({id: 1});
console.log(post.toJSON());


post.fetch({
  success: function(model) {
    model.setUser();
    console.log(model.toJSON());
  }
});

var post2 = new Post({
  id: 3,
  title: "physics",
  body: "is good stuff",
  userId: 2
});

var post_html = $("#post").html();

function renderPost(model) {
  var $post = $(post_html);
  $post.find("header p").text(model.get("title"));
  $post.find("h1").text(model.get("title"));
}

var User = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts"
});

var user = new User({id: post.get("userId")}); 

user.fetch({
  success: function(model) {
    console.log(model.toJSON());
  }
})

post.set("user", user);
console.log(post.toJSON());