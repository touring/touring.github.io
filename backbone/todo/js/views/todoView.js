var app = app || {};

// 创建模型视图
app.TodoView = Backbone.View.extend({
	tagName : 'li',
	template : _.template($('#item-template').html()),

	events : {
		'click .toggle' : 'toggleCompleted'
	},

	initialize : function(){
		// 监听this.model的变化，实时更新视图
		this.listenTo(this.model, 'change', this.render);
	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));

		// 切换完成与未完成的样式
		this.$el.toggleClass('completed', this.model.get('completed'));
		return this;
	},

	// 标记单条项目完成
	toggleCompleted : function(){
		this.model.toggle();
	}

});