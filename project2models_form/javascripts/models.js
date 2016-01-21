var ItemModel = Backbone.Model.extend({
  idAttribute: "id"
});

var Items = {
  $body: $("tbody"),
  collection: [],
  create: function(item_data) {
    item_data.id = this.collection.length + 1;
    var item = new ItemModel(item_data);
    this.collection.push(item);
    return item;
  },
  seedCollection: function() {
    var self = this;
     // items_json.forEach(this.create.bind(this));
     items_json.forEach( function(item) {
      Items.create(item);
      console.log(item);
    });
  },
  sortBy: function(prop) {
    this.collection = _(this.collection).sortBy(function(m) {
      return m.attributes[prop];
    });
    this.render();
  },
  render: function() {
    Items.$body.html(template({
      items: this.collection
    }))
  },
  remove: function(e) {
    e.preventDefault();
    var $e = $(e.currentTarget),
    model = _(this.collection).findWhere({id: +$e.attr("data-id") });

    this.collection = _(this.collection).without(model);
    this.render();
  },
  bind: function() {
    this.$body.on("click", "a", this.remove.bind(this));
  },
  empty: function() {
    this.collection = [];
    this.render();
  },
  init: function() {
    this.seedCollection();
    this.render();
    this.bind();
  }
};

var template = Handlebars.compile($("#items").html());

Handlebars.registerPartial("item", $("#item").html());

Items.init();

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

  item = Items.create(attrs);
  Items.$body.append(Handlebars.partials.item(item.toJSON()));
  this.reset();
});

$("th").on("click", function() {
  var prop = $(this).attr("data-prop");
  Items.sortBy(prop);
});

$("p a").on("click", function(e) {
  e.preventDefault();
  Items.empty();
})
