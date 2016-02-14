/**
 * Created by 殿麒 on 2015/11/7.
 */
purchase.controller('confirmOrder',function($rootScope,$scope,$cookieStore,$resource,$q,Login,Order,TimePayWay){

    //  生成订单
    $scope.confirmOrder = function(){
        var shopId = $cookieStore.get('shopInfo').shopId;

        var orderItems = $scope.order_goodslist;
        var data = {
            accessInfo:Login.getAccessInfo($cookieStore,true),
            shopId:shopId,
            addressId:$rootScope.DEFAULTADDRESS.addressId,
            total_fee:$scope.orderTotleMoney,
            sign:'sign',
            description:'',
            comment:'',
            isCod:'',
            homeTime:$scope.initH.opt+':'+$scope.initM.opt+'~'+$scope.endH.opt+':'+$scope.endM.opt,
            orderType:'7',
            orderItems:orderItems,
        }
        console.log(data);


        //Order.createOrder(data,'order').then(function(data){
        //    console.log(data);
        //    Order.saveCookies('orderId',data);
        //    window.location.href = "09-payPage.html";
        //})
    }

    var shopInfo = $cookieStore.get('shopInfo');

    //  购买列表
    Order.showOrderGoodsList($resource,$q,$cookieStore,Login).then(function(data){
        console.log(data);
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
    $scope.initH = $scope.initHours[0];
    $scope.initMins = TimePayWay.option(initMinsArr);
    $scope.initM = $scope.initMins[0];
    $scope.endHours = TimePayWay.option(endHoursArr);
    $scope.endH = $scope.endHours[0];
    $scope.endMins = TimePayWay.option(endMinsArr);
    $scope.endM = $scope.endMins[0];

    var paywayArr = ['在线付款','货到付款'];
    $scope.payWays = TimePayWay.option(paywayArr);
});
