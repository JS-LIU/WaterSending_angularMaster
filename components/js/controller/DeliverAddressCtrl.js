/**
 * Created by 殿麒 on 2016/4/12.
 */
(function(){
    angular.module('myApp')
        .controller('DeliverAddressCtrl',DeliverAddressCtrl);

    function DeliverAddressCtrl($scope,
                                $cookieStore,
                                $localStorage,
                                Login,
                                OperateAddressService,
                                DelieveryAddressService){

        //  本页数据
        var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
        accessInfo.phone_num = "";
        $scope.operateAddress = OperateAddressService.getOperateAddress();
        $scope.operateAddress.addressInfo.isDefault = Boolean($scope.operateAddress.addressInfo.isDefault);

        //  是否设为默认
        $scope.setDefn = function(){
            $scope.operateAddress.addressInfo.isDefault = !$scope.operateAddress.addressInfo.isDefault;
        };

        $scope.saveAddressInfo = function(){
            OperateAddressService.setOperateAddress($scope.operateAddress);
        };

        console.log($localStorage.addressInfo);
        console.log($scope.operateAddress);

        //  监听【被保存】地址变化
        $scope.saveAddress = function(){
            var addressInfo = $scope.operateAddress.addressInfo;
            var addressItem = {
                addressId:addressInfo.addressId||"10",
                phone_num:addressInfo.phone_num,
                recieve_name: addressInfo.recieve_name,
                position_x: addressInfo.position_x,
                position_y: addressInfo.position_y,
                provinceId: addressInfo.provinceId||"010",
                cityId: addressInfo.cityId||"010",
                districtAddress:addressInfo.districtAddress,
                address:addressInfo.address,
                addressType: $scope.operateAddress.addressType.addressType,
                isDefault: Number(addressInfo.isDefault),
                houseNumber:''
            };
            var postNewAddressData = {
                sign:"",
                accessInfo:accessInfo,
                addressItem:addressItem
            };
            //  新增还是编辑
            if($scope.operateAddress.operate.state == 0){
                DelieveryAddressService.newAddress(postNewAddressData)
                    .then(function(data){
                        if(backPage == '#/inputLocation'){
                            window.location.href = backPage;
                        }else{
                            window.location.href = '#/deliverAddressList';
                        }
                });
            }else{
                DelieveryAddressService.editAddress(postNewAddressData)
                    .then(function(){
                        if(backPage == '#/inputLocation'){
                            window.location.href = backPage;
                        }else{
                            window.location.href = '#/deliverAddressList';
                        }
                });
            }
        };
        var backPage = $cookieStore.get('lastPage');

        if(backPage == '#/inputLocation'){
            $scope.backPage = backPage;
        }else{
            $scope.backPage = '#/deliverAddressList';
        }

    }
}());