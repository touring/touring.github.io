'use strict';
// 创建模板视图 
var stuView = Backbone.View.extend({
	tagName : 'li',
	className : 'util-clearfix',
	template : _.template($('#tpl').html()),
	events : {
		'.editable dblclick' : 'editing',
		'.delete click' : 'dele',
		'input blur' : 'blur'
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

	setValue : function(){
		var model = this.model;
		$(this.el).find('input, select').each(function(){
			var _this = $(this);
			_this.val(this.model.get(_this.attr('name')));
		});
	},

	remove : function(){
		$(this.el).remove();
	},

	editing : function(e){
		var target = $(e.target);
		target.find('.disp').hide();
		target.find('.edit').show().find('input, select').focus();
	},

	dele : function(){
		this.model.destroy();
	},

	blur : function(e){
		var target = $(e.target),
			obj = {};
		obj[target.attr('name')] = target.val();
		this.model.set(obj, {validate : true});
		target.parents('.editable').find('.disp').show();
		target.parents('.editable').find('.edit').hide();
	}

});