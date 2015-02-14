var Person = Backbone.Model.extend({
	defaults: {
		name: 'Eugene',
		age: 36,
		job: 'undefined'
	},
	validate: function(attrs) {
		if( attrs.age <= 0){
			return 'Возраст должен быть положительным!';
		}
	}
});
var PersonView = Backbone.View.extend({ 
	
});
var personView = new PersonView;
var person = new Person({'name': 'Евгений'});
//person.save({age:-5},{validate:true});
//person.on("invalid", function(model, error) {
//  console.log(model.get("age") + " " + error);
//});