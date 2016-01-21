//1
var PostModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts",
});

//2
var post_1 = new PostModel({id: 1});
//console.log(post_1.toJSON());



//3
post_1.fetch({
  success: postReceived
});

function postReceived() {
  user = new UserModel({id: post_1.get("userId") });
  //console.log(post_1.toJSON());
  //console.log(user.toJSON());
  user.fetch({
    success: function(model) {
      console.log(post_1.toJSON());
      setUserToPost;
      console.log(post_1.toJSON());
    }
  });
}

//5
function setUserToPost () {
  post_1.set("user", user);
  //console.log(post_1.toJSON());
}

//4
var UserModel = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/users"
});
var user;
