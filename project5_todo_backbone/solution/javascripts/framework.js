function ModelConstructor(opts) {
  var id_count = 0;
  opts = opts || {};

  function Model(attrs) {
    id_count++;

    this.attributes = attrs || {};
    this.attributes.id = id_count;
    this.id = id_count;
    this.__events = [];

    if (opts.change && _.isFunction(opts.change)) {
      this.addCallback(opts.change);
    }
  }

  Model.prototype = {
    set: function(key, val) {
      this.attributes[key] = val;
      this.triggerChange();
    },
    get: function(key) {
      return this.attributes[key];
    },
    triggerChange: function() {
      var self = this;

      self.__events.forEach(function(cb) {
        cb.call(self);
      });
    },
    addCallback: function(cb) {
      this.__events.push(cb);
    }
  };

  _.extend(Model.prototype, opts);

  return Model;
}

function CollectionConstructor(opts) {
  function Collection(model_constructor) {
    this.models = [];
    this.model = model_constructor;
  }

  _.extend(Collection.prototype, opts);

  Collection.prototype = {
    add: function(model) {
      var old_m  = _(this.models).findWhere({ id: model.id }),
          new_m;

      if (old_m) { return old_m; }

      new_m = new this.model(model);
      this.models.push(new_m);

      return new_m;
    },
    get: function(idx) {
      return _(this.models).findWhere({ id: idx });
    },
    remove: function(idx) {
      idx = _.isObject(idx) ? idx.id : idx;

      var m = this.get(idx);

      if (!m) { return; }

      this.models = this.models.filter(function(model) {
        return model.attributes.id !== m.id;
      });
      m.__remove();
    },
    set: function(models) {
      var self = this;

      self.reset();
      models.forEach(function(model) {
        self.add(model);
      });
    },
    reset: function() {
      this.models = [];
    }
  };

  return Collection;
}

function ViewConstructor(opts) {
  function View(model) {
    this.model = model;
    this.model.view = this;
    this.model.addCallback(this.render.bind(this));
    this.model.__remove = this.remove.bind(this);
    this.attributes["data-id"] = this.model.id;
    this.$el = $("<" + this.tag_name + " />", this.attributes);
    this.render();
  }

  View.prototype = {
    tag_name: "div",
    attributes: {},
    template: function() { },
    render: function() {
      this.unbindEvents();
      this.$el.html(this.template(this.model.attributes));
      this.bindEvents();
    },
    bindEvents: function() {
      var $el = this.$el,
          event, selector, parts;

      for (var prop in this.events) {
        parts = prop.split(" ");
        selector = parts.length > 1 ? parts[1] : undefined;
        event = parts[0];

        if (selector) {
          $el.on(event + ".view", selector, this.events[prop]);
        }
        else {
          $el.on(event + ".view", this.events[prop]);
        }
      }
    },
    unbindEvents: function() {
      this.$el.off(".view");
    },
    remove: function() {
      this.unbindEvents();
      this.$el.remove();
    }
  };

  _.extend(View.prototype, opts);

  return View;
}
