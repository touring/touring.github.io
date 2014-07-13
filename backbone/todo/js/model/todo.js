var app = app || {};

// 创建数据模型
app.Todo = Backbone.Model.extend({
	defaults : {
		title : '',
		completed : false
	},

	// 切换模型数据
	toggle : function(){
		this.save({
			completed : ! this.get('completed')
		});
	}
});
