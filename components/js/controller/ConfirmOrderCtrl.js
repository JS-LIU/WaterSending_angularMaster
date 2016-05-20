/**
 * Created by 殿麒 on 2016/5/18.
 */
(function(){
    angular.module('myApp')
        .controller('ConfirmOrderCtrl',ConfirmOrderCtrl);

    function ConfirmOrderCtrl($scope,
                              $cookieStore,
                              Login,
                              DelieveryAddressService,
                              ConfirmService,
                              SendTimeService){
        //  订单信息
        $scope.orderInfo =  ConfirmService.getOrderInfo();


        var lnglatXY = ConfirmService.getFirstShopPosition($scope.orderInfo);
        var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());

        DelieveryAddressService.getAddressList({
            sign:"",
            accessInfo:accessInfo,
            positionInfo:{
                districtId:'',
                position_x:lnglatXY[0],
                position_y:lnglatXY[1],
                addressInfo:'',
                phoneCode:''
            }
        }).then(function(data){
            var canDeliverAddress = DelieveryAddressService.canDeliverList(data);
            $scope.canDeliverAddress = canDeliverAddress[0];
        });

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

        $scope.createOrder = function(confimOrderInfos){

        }



    };
}());