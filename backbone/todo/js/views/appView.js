var app = app || {};

// 创建主视图
app.AppView = Backbone.View.extend({
	el : '#todoapp',

	events : {
		'keypress #new-todo' : 'createOnEnter'
	},

	initialize : function(){
		// 监听集合，发生改变则触发add方法
		this.listenTo(app.todoList, 'add', this.addOne);

		// 初始化时重新从localStorage拉取数据
		app.todoList.fetch();
	},

	addOne : function(todo){
		// 传入参数为集合中新增的数据模型

		//实例化模型视图
		var todoView = new app.TodoView({model : todo});
		$('#todo-list').append(todoView.render().el);
	},	

	//回车创建新的项目
	createOnEnter : function(event){
		if(event.keyCode === 13 && this.$('#new-todo').val().trim()){
			// 将新创建对象添加到集合中
			app.todoList.create({
				'title' : this.$('#new-todo').val().trim(),
				'completed' : false
			});

			// 添加完成后清空input数据
			this.$('#new-todo').val('');
		}
	}


});