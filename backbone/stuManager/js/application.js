// 构建学生对象模型
var stu = Backbone.Model.extend({
	defaults : {
		name : 'Asher',
		sex : 'male',
		city : 'hangzhou'
	}
});

// 构建基于学生的集合模型
var stus = Backbone.Collection.extend({
	model : stu
});

// 实例化一个结合对象
var stusList = new stus();

// 构建用于模板的视图
var studentView = Backbone.View.extend({
	tagName : 'li',
	className : 'util-clearfix',
	template : _.template($('#tpl').html()),
	
	initialize : function(){
		this.listenTo(this.model, 'change', this.render);

	},

	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}

});

// 构建主页视图
var stuView = Backbone.View.extend({
	el : '#demo',
	events : {
		'click button' : 'newStu'
	},

	// 绑定Collection的相关事件 
	initialize : function(){
		this.listenTo(stusList, 'add', this.render);
	},

	newStu : function(){
		// 添加数据时实例化数据模型
		var addStu = new stu(),
			objData = {};
		objData['Name'] = $('#addName').val();
		objData['Sex'] = $('#addSex').val();
		objData['City'] = $('#addCity').val();
		

		$('#addName, #addCity').each(function(){
			$(this).val('');
		});

		addStu.set(objData);
		stusList.add(addStu);
	},

	// model模型数据的来源
	render : function(data){

		var stusView = new studentView({model : data});
		$('.list').append(stusView.render().el);
	}
});

// 实例化一个视图对象
var pageView = new stuView();