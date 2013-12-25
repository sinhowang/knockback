// Generated by CoffeeScript 1.6.3
(function() {
  var CategoryVm, MainClass, MainClassVm, SubcategoryVm, error, model, model_vm,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MainClass = Backbone.RelationalModel.extend({
    defaults: {
      number1: 1
    },
    relations: [
      {
        type: Backbone.HasMany,
        key: 'categories',
        relatedModel: 'Category',
        collectionType: 'Categories',
        reverseRelation: {
          key: 'main',
          includeInJSON: false
        }
      }
    ]
  });

  window.Category = Backbone.RelationalModel.extend({
    relations: [
      {
        type: Backbone.HasMany,
        key: 'subcategories',
        relatedModel: 'Subcategory',
        collectionType: 'Subcategories',
        reverseRelation: {
          key: 'category',
          includeInJSON: false
        }
      }
    ]
  });

  window.Subcategory = Backbone.RelationalModel.extend({
    defaults: {
      number1: 1,
      number2: 1
    }
  });

  window.Categories = Backbone.Collection.extend({
    model: Category
  });

  window.Subcategories = Backbone.Collection.extend({
    model: Subcategory
  });

  SubcategoryVm = null;

  CategoryVm = null;

  MainClassVm = null;

  SubcategoryVm = (function(_super) {
    __extends(SubcategoryVm, _super);

    function SubcategoryVm(model, options) {
      var _this = this;
      SubcategoryVm.__super__.constructor.call(this, model, {
        factories: {
          'category': CategoryVm
        },
        options: options
      });
      this.computed = ko.computed(function() {
        return _this.category().main().number1() + _this.number1() + _this.number2();
      });
    }

    return SubcategoryVm;

  })(kb.ViewModel);

  CategoryVm = (function(_super) {
    __extends(CategoryVm, _super);

    function CategoryVm(model, options) {
      CategoryVm.__super__.constructor.call(this, model, {
        requires: ['main'],
        factories: {
          'subcategories.models': SubcategoryVm,
          'main': MainClassVm
        },
        options: options
      });
    }

    return CategoryVm;

  })(kb.ViewModel);

  MainClassVm = (function(_super) {
    __extends(MainClassVm, _super);

    function MainClassVm(model, options) {
      MainClassVm.__super__.constructor.call(this, model, {
        factories: {
          'categories.models': CategoryVm
        },
        options: options
      });
    }

    return MainClassVm;

  })(kb.ViewModel);

  model = new MainClass({
    categories: [
      {
        subcategories: [{}]
      }
    ]
  });

  try {
    model_vm = new MainClassVm(model);
  } catch (_error) {
    error = _error;
    jQuery('#errorPanel').html(error);
  }

}).call(this);
