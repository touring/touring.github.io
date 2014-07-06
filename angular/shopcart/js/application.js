var cartController = function ($scope){
	$scope.cart = [
		{
			id: 10001,
			name : 'iPhone5s',
			quantity : 10,
			price : 4800
		},
		{
			id: 10002,
			name : 'iPhone5C',
			quantity : 5,
			price : 3200
		},
		{
			id: 10003,
			name : 'iPhone4s',
			quantity : 2,
			price : 3600
		},
		{
			id: 10004,
			name : 'iPad Air',
			quantity : 6,
			price : 3588
		},
		{
			id: 10005,
			name : 'iPad mini',
			quantity : 6,
			price : 2500
		}
	];

	// 计算购买总价
	$scope.totalPrice = function(){
		var totalPrice = 0;
		angular.forEach($scope.cart, function(item){
			totalPrice += item.quantity * item.price;
		});
		return totalPrice;
	}

	// 计算购买总数量
	$scope.totalQuantity = function(){
		var totalQuantity = 0;
		angular.forEach($scope.cart , function(item){
			totalQuantity += parseInt(item.quantity);
		});
		return totalQuantity;
	}

	// 删除数据
	$scope.remove = function(id){
		angular.forEach($scope.cart, function(item, k){
			if(item.id === id){
				$scope.cart.splice(k, 1);
			}
		});
	}

	//查找索引值
	var findIndex = function(id){
		var index = -1;
		angular.forEach($scope.cart, function(item, key){
			if(item.id === id){
				index = key;
				return;
			};
		});
		return index;
	} 

	// 增加购买数量
	$scope.add = function(id){
		var index = findIndex(id);
		++$scope.cart[index].quantity;
	}

	// 减少购买数量
	$scope.reduce = function(id){
		var index = findIndex(id);
		var item = $scope.cart[index];
		if(item.quantity > 1){
			--item.quantity;
		} else {
			var returnKey = confirm('确定删除此商品？');
			if(returnKey){
				$scope.remove(id);
			}
		}
	}

	// 监听文本框数字变化
	$scope.$watch('cart', function(newValue, oldValue){
		angular.forEach(newValue, function(item, key){
			if(item.quantity < 1){
				var returnKey = confirm('确定删除此商品？');
				if(returnKey){
					$scope.remove(item.id);
				} else {
					item.quantity = oldValue.quantity;
				}
			}
		})
	}, true);
}