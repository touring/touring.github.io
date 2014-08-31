'use strict';
// 构建学生对象模型
var stu = Backbone.Model.extend({
	defaults : {
		code : '10001',
		name : 'Asher',
		sex : 'male',
		city : 'hangzhou'
	},

	validate : function(attr){
		for(var i in attr){
			if(attr[i] === ''){
				return i + '不能为空！';
			}
			if(i === 'code' && isNaN(parseInt(attr[i]))){
				return '编号必须是数字';
			}
		}
	}
});