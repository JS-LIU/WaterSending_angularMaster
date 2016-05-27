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
        var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
        accessInfo.phone_num = "";
        $scope.operateAddress = OperateAddressService.getOperateAddress();
        var deliverInfo = $scope.operateAddress.addressInfo;


        $scope.recieve_name = deliverInfo.recieve_name||"";
        $scope.phone_num = deliverInfo.phone_num||"";
        $scope.keywords = deliverInfo.address||"";
        $scope.isDefault = Boolean(deliverInfo.isDefault);
        $scope.districtAddress = deliverInfo.districtAddress;
        $scope.position_x =  deliverInfo.position_x;
        $scope.position_y =  deliverInfo.position_y;
        $scope.provinceId = deliverInfo.provinceId;
        $scope.cityId = deliverInfo.cityId;
        //  是否设为默认
        $scope.cutSelect = function(){
            $scope.isDefault = !$scope.isDefault;
        };

        $scope.saveAddressInfo = function(){
            deliverInfo = {
                phone_num:$scope.phone_num,
                recieve_name:$scope.recieve_name,
                isDefault:$scope.isDefault,
                position_x:$scope.position_x,
                position_y:$scope.position_y,
                provinceId:$scope.provinceId,
                cityId:$scope.cityId,
                districtAddress:$scope.districtAddress,
                address:$scope.keywords
            }
            OperateAddressService.setOperateAddress();
        };


        //  监听【被保存】地址变化
        $scope.saveAddress = function(){
            var addressItem = {
                addressId:deliverInfo.addressId||"10",
                phone_num:$scope.phone_num,
                recieve_name: $scope.recieve_name,
                position_x: $scope.position_x,
                position_y: $scope.position_y,
                provinceId: $scope.provinceId,
                cityId: $scope.cityId,
                districtAddress:$scope.districtAddress,
                address:$scope.keywords,
                houseNumber:"",
                addressType: $scope.operateAddress.addressType.addressType,
                isDefault: Number($scope.isDefault)
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
                        console.log(data);
                        console.log('newsuccess');
                });
            }else{
                DelieveryAddressService.editAddress(postNewAddressData)
                    .then(function(){
                        console.log('editsuccess');
                });
            };
        }
    }
}());