$(function() {
	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	};
	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};
	App.Models.Task = Backbone.Model.extend({
		validate: function (attrs) {
			if ( ! $.trim(attrs.title) ) {
				return 'Имя задачи должно быть валидным!';
			}
		}
	});
	
	App.Views.Task = Backbone.View.extend({
		initialize: function() {
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
		},
		tagName: 'li',
		template: template('taskTemplate'),
		render: function(){
			var template = this.template(this.model.toJSON());
			this.$el.html(template) ;
			return this;
		},
		events: {
			'click .edit': 'editTasks',
			'click .delete': 'destroy'
		},
		destroy: function() {
			this.model.destroy();
		},
		remove: function() {
			this.$el.remove();
		},
		editTasks: function() {
			var newTask = prompt('Как переименуем задачу?', this.model.get('title'));
			this.model.set({'title': newTask},{validate: true});
		}
	});
	
	App.Collections.Task = Backbone.Collection.extend({
		model: App.Models.Task
	});
	App.Views.Tasks = Backbone.View.extend({
        tagName: 'ul',
		initialize: function() {
			this.collection.on('add', this.addOne, this)
		},
        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function(task) {
            // создавать новый дочерний вид
            var taskView = new App.Views.Task({ model: task });
            // добавлять его в корневой элемент
            this.$el.append(taskView.render().el);
        }
    });
	App.Views.AddTask = Backbone.View.extend({
		el: '#newTask',
		events: {
			'submit': 'submit'
		},
		submit: function(e){
			e.preventDefault();
			var newTaskTitle = $(e.currentTarget).find('input[type="text"]').val();
			var newTask = new App.Models.Task({'title': newTaskTitle});
			this.collection.add(newTask);
			$('#newTask').find('input[type="text"]').val('');
		}
	});
	window.tasksCollection = new App.Collections.Task([
		{
			title: 'сходить в магазин',
			priority: 3
		},
		{
			title: 'сходить в банк',
			priority: 1
		},
		{
			title: 'сверстать главную страницу',
			priority: 2
		}
	]);
	var tasksView = new App.Views.Tasks({ collection: tasksCollection});
	//tasksView.render();//initialize?
	$('.tasks').html(tasksView.render().el);
	var addTaskView = new App.Views.AddTask({ collection: tasksCollection});
});