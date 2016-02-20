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
            isCod:$scope.initPayWay.id,
            homeTime:$scope.initH.opt+':'+$scope.initM.opt+'~'+$scope.endH.opt+':'+$scope.endM.opt,
            orderType:'7',
            orderItems:orderItems,
        }
        console.log(data);
        if($scope.initPayWay.id == 0){

            Order.createOrder(data,'order').then(function(data){
                Order.saveCookies(data);
                window.location.href = "09-payPage.html";
            })
        }else{
            Order.createOrder(data,'order').then(function(data){
                Order.saveCookies(data);
                window.location.href = "10-cashOnDelivery.html";
            })
        }
    }

    var shopInfo = $cookieStore.get('shopInfo');

    //  购买列表
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
    $scope.initHours = TimePayWay.option(initHoursArr,[]);
    $scope.initMins = TimePayWay.option(initMinsArr,[]);
    $scope.endHours = TimePayWay.option(endHoursArr,[]);
    $scope.endMins = TimePayWay.option(endMinsArr,[]);

    //  时间选择初始值
    $scope.initH = $scope.initHours[0];
    $scope.initM = $scope.initMins[0];
    $scope.endH = $scope.endHours[0];
    $scope.endM = $scope.endMins[0];

    var paywayArr = ['在线付款','货到付款'];
    $scope.payWays = TimePayWay.option(paywayArr,[0,1]);
    $scope.initPayWay = $scope.payWays[0];
});
