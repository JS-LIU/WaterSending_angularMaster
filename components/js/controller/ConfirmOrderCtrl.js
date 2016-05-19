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
                              ConfirmService){

        var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
        var orderInfo =  ConfirmService.getOrderInfo();
        var lnglatXY = ConfirmService.getNearestShopPosition(orderInfo);

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
    };
}());