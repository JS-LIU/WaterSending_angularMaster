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


        var deliverInfo = $scope.operateAddress.addressInfo;
        $scope.userName = deliverInfo.userName||"";
        $scope.mobile = deliverInfo.mobile||"";
        $scope.addressName = deliverInfo.name||"";
        $scope.fullAddress = deliverInfo.fullAddress||"";
        $scope.position_x = deliverInfo.position_x||"";
        $scope.position_y = deliverInfo.position_y||"";
        $scope.cityId = deliverInfo.cityId;
        $scope.isDefault = deliverInfo.isDefault||0;

        //  监听【被保存】地址变化
        $scope.saveAddress = function(){
            //  创建家庭地址
            var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
            accessInfo.phone_num = "";
            var addressItem = {
                addressId:"",
                phone_num:$scope.mobile,
                recieve_name: $scope.userName ,
                position_x: $scope.position_x,
                position_y: $scope.position_y,
                provinceId: $scope.cityId,
                cityId: $scope.cityId,
                fullAddress: $scope.fullAddress,
                addressType: 0,
                isDefault: 0
            };
            console.log(addressItem);
            var postNewAddressData = {
                sign:"",
                accessInfo:accessInfo,
                addressItem:addressItem
            }


            //  更新本地存储
        }


        //
        //var addressItem = {
        //    addressId:"",
        //    phone_num:"",
        //    recieve_name:" "
        //}


        //DelieveryAddressService.newAddress(postNewAddressData)
        //    .then(function(data){
        //
        //});
    }
}());