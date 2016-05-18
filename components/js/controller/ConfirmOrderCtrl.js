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
        var positionInfo = ConfirmService.getNearestShopPosition(orderInfo);
        console.log(positionInfo);

        DelieveryAddressService.getAddressList({
            sign:"",
            accessInfo:accessInfo,
            positionInfo:{
                positionInfo:'',
                position_x:positionInfo[0],
                position_x:positionInfo[1],
                addressInfo:'',
                phoneCode:''
            }
        }).then(function(data){

        });
    };
}());