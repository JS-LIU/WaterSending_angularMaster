/**
 * Created by 殿麒 on 2015/11/7.
 */
purchase.controller('confirmOrder',function($rootScope,$scope,$cookieStore,$resource,$q,purchasePost,Login,Order,TimePayWay){

    //  生成订单
    $scope.confirmOrder = function(){
        var shopId = $cookieStore.get('shopInfo').shopId;
        var order_list = $cookieStore.get('order_goodslist');
        var orderItem = [];

        for(var i = 0,len  = order_list.length; i < len;i++){
            var item = {
                productId:order_list[i].productId,
                productType:1,
                itemNum:order_list[i].num,
                itemPrice:order_list[i].price,
                itemInfo:''
            };
            orderItem.push(item);
        }
        var data = {
            accessInfo:Login.getAccessInfo($cookieStore,true),
            shopId:shopId,
            addressId:$rootScope.DEFAULTADDRESS.addressId,
            total_fee:$scope.orderTotleMoney,
            orderItems:orderItem,
            sign:'sign',
            description:'',
            comment:''
        }

        var path = 'order/new';
        purchasePost.postData(data,path).success(function(data){
            $cookieStore.put('orderId',data);
            window.location.href = "09-payPage.html";
        });
    }
    var shopInfo = $cookieStore.get('shopInfo');

    //  水票列表
    Order.showOrderGoodsList($resource,$q,$cookieStore,Login).then(function(data){
        $scope.order_goodslist = data;
        //  总价
        $scope.orderTotleMoney = Order.orderTotle(data).getPracticalMoney;
        // 总数
        $scope.orderTotleNum = Order.orderTotle(data).getNum;

    });
    //  商店名字
    $scope.shopName = $cookieStore.get('shopInfo').merchantName;

    var date = new Date();
    var initHoursArr = TimePayWay.setTimeArr(date.getHours(),23),
        initMinsArr = TimePayWay.setTimeArr(date.getMinutes(),59),
        endHoursArr = TimePayWay.setTimeArr(0,23),
        endMinsArr = TimePayWay.setTimeArr(0,59);




    //  选择配送时间
    $scope.initHours = TimePayWay.option(initHoursArr);
    //  选择配送分
    $scope.initMins = TimePayWay.option(initMinsArr);
    $scope.endHours = TimePayWay.option(endHoursArr);
    $scope.endMins = TimePayWay.option(endHoursArr);
    $scope.endMins = TimePayWay.option(endMinsArr);

    var paywayArr = ['在线付款','货到付款'];
    $scope.payWays = TimePayWay.option(paywayArr);
});
