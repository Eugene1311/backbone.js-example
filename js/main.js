(function(){
	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	};
	//хэлпер шаблона
	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};
	App.Models.Person = Backbone.Model.extend({
		defaults: {
			name: 'Eugene',
			age: 36,
			job: 'undefined'
		},
		validate: function(attrs) {
			if( attrs.age <= 0){
				return 'Возраст должен быть положительным!' ;
			}
		}
	});
	App.Collections.People = Backbone.Collection.extend({
		model: App.Models.Person
	});
	App.Views.People = Backbone.View.extend({
		tagName: 'ul',
		initialize: function() {
		},
		render: function() {
			this.collection.each(function(person) {
				personView = new App.Views.Person({model: person});
				this.$el.append(personView.render().el);
			}, this);
			return this;
		}
	});
	App.Views.Person = Backbone.View.extend({ 
		tagName: 'li',
		template: template('person-id'),
		initialize: function() {
			this.render();
		},
		render: function() {
			//замечательный шаблон
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}
	});

	App.Models.person = new App.Models.Person({'name': 'Евгений'});
	App.Views.person = new App.Views.Person({model: App.Models.person});
	App.Models.person.set({age:-5},{validate:true});
	//person.save({age:-5},{validate:true});
	App.Models.person.on("invalid", function(model, error) {
	  alert(person.get("age") + " " + error);
	});

	App.Collections.people = new App.Collections.People([
		{
			name: 'Петр',
			age: 20,
			job: 'Таксист'
		},
		{
			name: 'Олег',
			age: 24,
			job: 'Менеджер'
		},
		{
			name: 'Анна',
			age: 18,
			job: 'Студентка'
		}
	]);
	App.Collections.people.add(App.Models.person);
	App.Views.people = new App.Views.People({collection: App.Collections.people});

	$('body').append(App.Views.people.render().$el);
	
	var vent = _.extend({}, Backbone.Events);
	console.log(vent);
	
	App.Router = Backbone.Router.extend({
		routes: {
			'' : 'index',
			'page/:id' : 'page'
		},
		index: function() {
			console.log('index');
		},
		page: function(id) {
			console.log(id);
		}
	});
	new App.Router();
	Backbone.history.start();
})();
