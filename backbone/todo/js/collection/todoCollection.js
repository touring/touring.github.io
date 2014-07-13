var app = app || {};

// 创建数据结合
app.TodoCollection = Backbone.Collection.extend({
	model : app.Todo,

	localStorage : new Backbone.LocalStorage('todo')

});

// 实例化集合对象
app.todoList = new app.TodoCollection();