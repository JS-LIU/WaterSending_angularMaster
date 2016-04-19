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
        $scope.backHistory = "javascript:void(0)";
        var deliverInfo = $scope.operateAddress.addressInfo;

        $scope.userName = deliverInfo.userName||"";
        $scope.mobile = deliverInfo.mobile||"";
        $scope.fullAddress = deliverInfo.fullAddress||"";
        $scope.isDefault = deliverInfo.isDefault||0;
        $scope.addressName = deliverInfo.name||deliverInfo.fullAddress||"";

        //  存储临时数据
        $scope.saveAddressInfo = function(){
            deliverInfo.userName = $scope.userName;
            deliverInfo.mobile = $scope.mobile;
            deliverInfo.fullAddress = $scope.fullAddress;
            deliverInfo.isDefault =  $scope.isDefault;
            var obj = {
                addressInfo:deliverInfo
            }
            OperateAddressService.setOperateAddress(obj);
        }

        //  监听【被保存】地址变化
        $scope.saveAddress = function(){

            var fullAddress = OperateAddressService
                .getFullAddress(deliverInfo.name,$scope.fullAddress);

            //  创建家庭地址
            var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
            accessInfo.phone_num = "";
            var addressItem = {
                addressId:deliverInfo.addressId||"10",
                phone_num:$scope.mobile,
                recieve_name: $scope.userName,
                position_x: deliverInfo.position_x,
                position_y: deliverInfo.position_y,
                provinceId: "1000",
                cityId: "1000",
                fullAddress:fullAddress,
                addressType: $scope.operateAddress.addressType.addressType,
                isDefault: deliverInfo.isDefault
            };
            var postNewAddressData = {
                sign:"",
                accessInfo:accessInfo,
                addressItem:addressItem
            }
            //  新增还是编辑
            if($scope.operateAddress.operate.state == 0){
                DelieveryAddressService.newAddress(postNewAddressData)
                    .then(function(){
                        $scope.backHistory = "javascript:history.back(-1)";
                });
            }else{
                DelieveryAddressService.editAddress(postNewAddressData)
                    .then(function(){
                        $scope.backHistory = "javascript:history.back(-1)";
                });
            }
        }
    }
}());