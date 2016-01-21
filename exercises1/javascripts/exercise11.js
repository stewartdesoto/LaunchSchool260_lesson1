

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
    if (this.has("userId")) { this.setUser() };
    this.on("change:userId", this.setUser);
    this.on("change", renderPost);
  }
});

var UserModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/users"
});

var post_1 = new PostModel({id: 1});
//console.log(post_1.toJSON());



post_1.fetch();

//This will now call setUser because initialize method fixed
var post_2 = new PostModel({
  id: 2,
  title: "My new post",
  body: "This is good stuff",
  userId: 2
});

var post_html = $("#post").html();

console.log(post_html);

function renderPost(model) {
  var $post = $(post_html);
  console.log($post.html());

  $post.find("h1").text(model.get("title"));
  $post.find("header p").text("By " + model.get("user").get("name"));
  $post.find("header + p").text(model.get("body"));
  console.log($post.html());
  $(document.body).html($post);
}

// have to run this at console, because post_1 data hasn't come back from the server
// by the time the execution of the page reaches here

 // renderPost(post_2);  
