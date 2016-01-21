var Post = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts"
}); // Post constructor

var Posts = Backbone.Collection.extend({
  url: "http://jsonplaceholder.typicode.com/posts",
  comparator: "title",
  model: Post
})

var blog_posts = new Posts();

blog_posts.on("sync", function() {
  console.log(blog_posts.toJSON());
});

blog_posts.fetch();

blog_posts.add({title: "an additional post", body: "awesome body"});

blog_posts.create();

console.log(blog_posts.length);

// listen to entire list, and individual model pointed out
blog_posts.on("change:title", function(model) {
  console.log(model.get("id") + ' changed');
});

// only works at console, perhaps delay needed
//var post_30 = blog_posts.get(30);
//post_30.set("title", "snowman");

console.log(blog_posts.first().get("userId"));
blog_posts.comparator="userId";
blog_posts.sort();
console.log(blog_posts.first().get("userId"));

// returns an array of backbone objects
blog_posts.where({userId: 1});

// returns an array of vanilla javascript objects
blog_posts.toJSON.call(blog_posts.where({userId: 1}))[0];

// return all titles only
blog_posts.pluck("title");