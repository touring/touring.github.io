'use strict';
// 创建主视图
var appView = Backbone.View.extend({
	elem : '#demo',
	events : {
		'button click' : 'addStu'	
	},

	initialize : function(){
		this.listenTo(stuList, 'add', this.addData);
	},

	addStu : function(){
		console.log(111);
		// 实例化数据模型
		var newStu = new stu(),
			newObj = {};
		$('#addCode, #addName, #addSex, #addCity').each(function(){
			var _this = this;
			newObj[_this.attr('name')] = _this.val();
		});

		newStu.on('invaid', function(model, error){
			$('.tips').html(error).show();
		});

		var isValidate = newStu.set(newObj, {validate : true});
		if(isValidate){
			stuList.add(newStu);
			$('.tips').hide();
		}
	},

	addData : function(data){
		var stusView = new stuView({model : data});
		$('.list').append(stusView.render().el);

		$('#addCode, #addName, #addCity').each(function(){
			$(this).val('');
		});
	}
});