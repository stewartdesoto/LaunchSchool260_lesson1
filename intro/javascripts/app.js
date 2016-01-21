var Post = Backbone.Model.extend({
  urlRoot: "http://jsonplaceholder.typicode.com/posts"
}); // Post constructor

var post= new Post({title: "hush money", body: "body of trending post"})

post.on("sync", function() {
  console.log(post.toJSON());
})

post.on("change:body", function(model) {
  console.log('changed');
})

post.save();

// post.set("title", "it's a coverup!");
post.set("body", "it's sexy!");

var post2 = new Post({id: 1});
post2.fetch();

post2.listenTo(post, "change:title", function() {
  console.log("listenTo fired!");
})