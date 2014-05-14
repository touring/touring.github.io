(function($){
	$.fn.extend({
		anchor : function(options){
			var defaults = {
				elememt : '',
				classElements : '',
				currentClass : '',
				offsetY : '',
				duration : '',
				addCurrentCallback : null
			};
 
			var opts = $.extend(defaults, options || {});

			var scroller = $($.browser.webkit?'body':'html'),
				win = $(window);

			// 定义函数处理当前锚点
			function checkCurrentAnchor(opts, scrollTop){
				var currentIndex = 0,
					fixedOffset = null,
					elememtNode = opts.element,
					classElements = opts.classElements,
					currentClass = opts.currentClass;
					addCurrentCallback = opts.addCurrentCallback;

				// 循环处理每个锚点
				elememtNode.each(function(i){
					var targetNode = $(this.hash);
					if(targetNode.length){
						var maxValue = targetNode.offset().top + scrollTop;
							offset = Math.abs(scrollTop - maxValue);
						if(maxValue <= scrollTop){
							if(fixedOffset == null){
								fixedOffset = offset;
							} else if(offset < fixedOffset){
								offset = fixedOffset;
							}
							currentIndex = i;
						}
					}
				});

				// 给当前锚点添加样式
				classElements.removeClass(currentClass).eq(currentIndex).addClass(currentClass);

				// 添加回调函数
				if(typeof addCurrentCallback == 'function'){
					addCurrentCallback(classElements.eq(currentIndex));
				}

			}

			// 锚点绑定事件
			opts.offsetY = Number(opts.offsetY);
			opts.element = opts.element ? $(opts.element) : this;
			opts.classElements = opts.classElements ? $(opts.classElements) : this;

			if(this.data('_anchor_binded_') || this.length == 0){
				return this;
			}

			_this.data('_anchor_binded_', 'true');

			this.click(function(e){
				e.preventDefault();
				var target = $(this.hash);
				scroller.animate({
					scrollTop : target.offset().top + opts.offsetY
				}, opts.duration);
			});

			checkCurrentAnchor(opts, win.scrollTop);


			win.scroll(function(){
				for(var key in opts){
					checkCurrentAnchor(opts[key], win.scrollTop());
				}
			});
		}
	});
})(jQuery);

