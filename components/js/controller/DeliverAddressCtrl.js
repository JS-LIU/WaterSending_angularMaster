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
        $scope.fullAddress = deliverInfo.fullAddress||"";
        $scope.isDefault = deliverInfo.isDefault||0;
        $scope.addressName = deliverInfo.name||"";


        //  监听【被保存】地址变化
        $scope.saveAddress = function(){
            //  创建家庭地址
            var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
            accessInfo.phone_num = "";
            var addressItem = {
                addressId:deliverInfo.addressId||"10",
                phone_num:$scope.mobile,
                recieve_name: $scope.userName,
                position_x: $scope.position_x,
                position_y: $scope.position_y,
                provinceId: "1000",
                cityId: "1000",
                fullAddress: $scope.fullAddress,
                addressType: 0,
                isDefault: 0
            };
            var postNewAddressData = {
                sign:"",
                accessInfo:accessInfo,
                addressItem:addressItem
            }

            //  新增还是编辑
            if($scope.operateAddress.state == 0){
                DelieveryAddressService.newAddress(postNewAddressData)
                    .then(function(data){
                        //  dosth
                    });
            }else{
                DelieveryAddressService.editAddress(postNewAddressData)
                    .then(function(data){
                        //  dosth
                    });
            }

        }
    }
}());