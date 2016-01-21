// general application code, not specific to collection or model
// include View things here too, until we know backbone views

var App = {
  $body: $("tbody"),
  template: Handlebars.compile($("#items").html()),
  render: function() {
    this.$body.html(this.template({
      items: this.Items.models
    }));
  },
  removeItem: function(e) {
    e.preventDefault();
    var model = this.Items.get(+$(e.target).attr("data-id"));
    this.Items.remove(model);
  },
  bind: function() {
    this.$body.on("click", "a", this.removeItem.bind(this));
  },
  init: function() {
    this.Items = new ItemsCollection(items_json);
    this.Items.sortByName();
    this.render();
    this.bind();
  }

};


var ItemModel = Backbone.Model.extend({
  // idAttribute: "id",
  initialize: function() {
    this.collection.incrementId();
    this.set("id", this.collection.last_id);
  }
});

var ItemsCollection = Backbone.Collection.extend({
  last_id: 0,
  incrementId: function() {
    this.last_id++
  },
  model: ItemModel,
  sortBy: function(prop) {
    this.models = _(this.models).sortBy(function(m) {
      return m.attributes[prop];
    });
    App.render();
  },
  sortByName: function() {
    this.sortBy("name");
  },
  initialize: function () {
    this.on("remove reset", App.render.bind(App));
    this.on("add", this.sortByName);
  }
});




Handlebars.registerPartial("item", $("#item").html());

$("form").on("submit", function(e) {
  e.preventDefault();
  var inputs = $(this).serializeArray(),
      attrs= {},
      item;
  inputs.forEach( function(input) {
    console.log(input.name)
    console.log(input.value)
    attrs[input.name] = input.value;
  });

  item = App.Items.add(attrs);
  this.reset();
});

$("th").on("click", function() {
  var prop = $(this).attr("data-prop");
  App.Items.sortBy(prop);
});

$("p a").on("click", function(e) {
  e.preventDefault();
  App.Items.reset();
})

App.init();
