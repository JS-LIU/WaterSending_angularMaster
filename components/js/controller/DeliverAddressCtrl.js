/**
 * Created by 殿麒 on 2016/4/12.
 */
(function(){
    angular.module('myApp')
        .controller('DeliverAddressCtrl',DeliverAddressCtrl);

    function DeliverAddressCtrl($scope,
                                $cookieStore,
                                Login,
                                OperateAddressService,
                                DelieveryAddressService){

        //  本页数据
        $scope.operateAddress = OperateAddressService.getOperateAddress();

        //  监听【被保存】地址变化


        //  保存数据新建的地址
        var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
        accessInfo.phone_num = "";
        var addressItem = {
            addressId:"",
            phone_num:"",
            recieve_name:" "
        }
        var postNewAddressData = {
            sign:"",
            accessInfo:accessInfo,
            addressItem:addressItem
        }

        DelieveryAddressService.newAddress(postNewAddressData)
            .then(function(data){

        });
    }
}());