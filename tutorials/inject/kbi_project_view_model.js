// Generated by CoffeeScript 1.3.3
var ProjectViewModel;

ProjectViewModel = kb.ViewModel.extend({
  constructor: function(project, projects) {
    var start_attributes,
      _this = this;
    kb.ViewModel.prototype.constructor.call(this, project, {
      requires: ['id', 'name', 'site', 'description']
    });
    start_attributes = _.clone(project.attributes);
    this.model_changed = kb.triggeredObservable(project, 'change');
    this.isClean = ko.computed(function() {
      _this.model_changed();
      return _.isEqual(start_attributes, project.attributes);
    });
    this.onDelete = function() {
      if (!project.isNew()) {
        project.destroy();
      }
      loadUrl('');
      return false;
    };
    this.save = function() {
      if (project.isNew()) {
        projects.add(project);
      }
      project.save();
      loadUrl('');
      return false;
    };
    return this;
  }
});