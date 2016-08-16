/**
 * Created by 殿麒 on 2016/5/18.
 */
(function(){
    angular.module('myApp')
        .controller('ConfirmOrderCtrl',ConfirmOrderCtrl);

    function ConfirmOrderCtrl($scope,
                              $cookieStore,
                              $localStorage,
                              Login,
                              DelieveryAddressService,
                              ConfirmService,
                              SendTimeService,
                              OrderService,
                              ShoppingCartService){
        //  订单信息
        $scope.orderInfo = ConfirmService.getOrderInfo();
        $cookieStore.put('lastPage','#/confirmOrder');
        console.log($cookieStore.get('lastPage'));
        var shoppingcartDeleteList = ShoppingCartService.getDeleteList();


        var lnglatXY = ConfirmService.getFirstShopPosition($scope.orderInfo);
        var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
        accessInfo.phone_num = '';
        var canDeliverAddress = DelieveryAddressService.getAddressInfo();
        if(canDeliverAddress.addressId){
            $scope.canDeliverAddress = canDeliverAddress;
        }else{
            //  送货地址
            DelieveryAddressService.getAddressList({
                sign:"",
                accessInfo:accessInfo,
                positionInfo:{
                    districtId:'1',
                    position_x:lnglatXY[0],
                    position_y:lnglatXY[1],
                    addressInfo:'1',
                    phoneCode:'1'
                }
            }).then(function(data){
                var canDeliverAddress = DelieveryAddressService.getDefnCanDeliver(data,$localStorage.addressInfo.addressId);
                console.log(canDeliverAddress);
                $scope.canDeliverAddress = canDeliverAddress;
            });
        }


        //  选择配送时间
        $scope.initHours = SendTimeService.getInitHoursArr();
        $scope.initMins = SendTimeService.getMinArr();
        $scope.initH = $scope.initHours[0];

        $scope.$watch('initH',function(){
            $scope.endH = SendTimeService.getEndHours($scope.initH.opt);
        },true);
        $scope.$watch('initMins',function(){
            $scope.initM = $scope.initMins[0];
        },true);

        $scope.createOrder = function(){
            var orderItems = ConfirmService.fixedOrderInfo();
            var deleteModels = ShoppingCartService.deleteGoods.trimArr(shoppingcartDeleteList);
            var postOrderData = {
                accessInfo:accessInfo,
                orderItems:orderItems,
                total_fee:$scope.orderInfo.totalFee,
                comment:$scope.initH.opt+':'+$scope.initM.opt +'~'+$scope.endH+':'+$scope.initM.opt,
                isCod:'0',
                addressId:$scope.canDeliverAddress.addressId,
                sign:'',
                description:'',
                homeTime:'',
                shopId:'420'
            }
            ShoppingCartService.deleteGoods.topost({
                accessInfo:accessInfo,
                sign:'',
                deleteModels:deleteModels
            }).then(function success(){
                OrderService.new(postOrderData).then(function(data){
                    console.log(data);
                    $cookieStore.put('orderId',data);
                    window.location.href = '09-payPage.html';
                });
            },function error(){
                OrderService.new(postOrderData).then(function(data){
                    console.log(data);
                    $cookieStore.put('orderId',data);
                    window.location.href = '09-payPage.html';
                });
            });
        };
    };
}());