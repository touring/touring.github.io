// 构建学生对象模型
var student = Backbone.Model.extend({
	validate : function(attr){
		for(var i in attr){
			if(attr[i] == ''){
				return i + '不能为空！';
			}
			if(i == 'code' && isNaN(attr[i])){
				return '分数必须为数字！';
			}
		}
	}
});

// 构建基于学生的集合模型
var studentList = Backbone.Collection.extend({
	model : student
});

// 实例化一个结合对象
var studentRoom = new studentList();

// 构建用于模板的视图
var studentView = Backbone.View.extend({
	tagName : 'li',
	className : 'util-clearfix',
	template : _.template($('#tpl').html()),
	events : {
		'dblclick .editable' : 'editing',
		'blur input, select' : 'blur',
		'click .delete' : 'dele'
	},

	editing : function(e){
		var targetNode = $(e.currentTarget);
		targetNode.find('.disp').hide();
		targetNode.find('.edit').show().find('input,select').focus();
	},

	blur : function(e){
		var targetNode = $(e.currentTarget),
			objData = {};
		objData[targetNode.attr('name')] = targetNode.val();
		this.model.set(objData, {'validate' : true});
		targetNode.parents('.editable').find('.disp').show();
		targetNode.parents('.editable').find('.edit').hide();
	},

	dele : function(){
		this.model.destroy();
	},

	initialize : function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},

	render : function(){
		$(this.el).html(this.template(this.model.toJSON()));
		this.setValue();
		return this;
	},

	remove : function(){
		$(this.el).remove();
	},

	setValue : function(){
		var model = this.model;
		$(this.el).find('input, select').each(function(){
			var node = $(this);
			node.val(model.get(node.attr('name')));
		});
	}

});

// 构建主页视图
var stuView = Backbone.View.extend({
	el : $('#demo'),
	events : {
		'click button' : 'newStu'
	},

	// 绑定Collection的相关事件 
	initialize : function(){
		studentRoom.bind('add', this.addData, this);
		$('#addCode').val(studentRoom.length + 1);
	},

	newStu : function(){
		// 添加数据时实例化数据模型
		var stu = new student(),
			objData = {};
		$('#addName, #addSex, #addCity').each(function(){
			var self = $(this);
			objData[self.attr('name')] = self.val();
		});

		stu.on('invalid', function(model, error){
			$('.tips').show().html(error);
		});

		if(stu.set(objData, {'validate' : true})){
			studentRoom.add(stu);
			$('.tips').hide();
		}
	},

	// model模型数据的来源
	addData : function(data){
		data.set({
			'code' : data.get('code') || studentRoom.length
		});

		var stusView = new studentView({model : data});
		$('.list').append(stusView.render().el);

		$('#addName, #addCity').each(function(){
			$(this).val('');
		});

		$('#addCode').val(studentRoom.length + 1);
	}
});

// 实例化一个视图对象
var pageView = new stuView();