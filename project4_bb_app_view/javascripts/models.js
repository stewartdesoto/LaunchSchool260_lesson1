var App = {
  init: function() {
    this.Items = new ItemsCollection(items_json);
    this.View = new ItemsView({ collection: this.Items });
    this.Items.sortByName();
  }
};

var ItemModel = Backbone.Model.extend({
  // idAttribute: "id", // is default anyway
  initialize: function() {
    this.collection.incrementID();
    this.set("id", this.collection.last_id);
  }
});

var ItemsView = Backbone.View.extend({
  events: {
    "click a": "removeItem"
  },
  template: Handlebars.compile($("#items").html()),
  render: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON()
    }));
  },
  removeItem: function(e) {
    e.preventDefault();
    var model = this.collection.get(+$(e.target).attr("data-id"));
    this.collection.remove(model);
  },
  initialize: function() {
    this.$el = $("tbody");
    this.render();
    this.listenTo(this.collection, "remove reset rerender", this.render);
  }
});

var ItemsCollection = Backbone.Collection.extend({
  last_id: 0,
  model: ItemModel,
  incrementID: function() {
    this.last_id++;
  },
  sortBy: function(prop) {
    this.models = _(this.models).sortBy(function(m) {
      return m.attributes[prop];
    });
    this.trigger("rerender");
  },
  sortByName: function() { this.sortBy("name"); },
  initialize: function() {
    this.on("add", this.sortByName);
  }
});


Handlebars.registerPartial("item", $("#item").html());


$("form").on("submit", function(e) {
  e.preventDefault();
  var inputs = $(this).serializeArray(),
      attrs = {},
      item;

  inputs.forEach(function(input) {
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
});

App.init();
