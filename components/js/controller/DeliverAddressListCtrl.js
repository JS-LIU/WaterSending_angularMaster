/**
 * Created by 殿麒 on 2016/4/19.
 */
(function(){
    angular.module('myApp')
        .controller('DeliverAddressListCtrl',DeliverAddressListCtrl);
    function DeliverAddressListCtrl($scope,
                                    $cookieStore,
                                    $localStorage,
                                    Login,
                                    DelieveryAddressService,
                                    OperateAddressService,
                                    ConfirmService){
        //  请求地址列表参数
        var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
        accessInfo.phone_num = "";
        $scope.backTocome = $cookieStore.get('lastPage');
        console.log($localStorage.addressInfo);

        var lnglatXY = $localStorage.addressInfo.lnglatXY;
        var isOrder = ($scope.backTocome == '#/confirmOrder');
        //  是否从订单进来
        if(isOrder){
            //  订单信息
            var orderInfo = ConfirmService.getOrderInfo();
            lnglatXY = ConfirmService.getFirstShopPosition(orderInfo);
        };

        var postAddressListData = {
            sign:"",
            accessInfo:accessInfo,
            positionInfo:{
                position_x:lnglatXY[0],
                position_y:lnglatXY[1],
                districtId:$localStorage.addressInfo.cityId,
                addressInfo:$localStorage.addressInfo.name,
                phoneCode:""
            }
        }

        //  【家庭地址/公司地址】名字
        DelieveryAddressService.getAddressList(postAddressListData)
            .then(function success(data){
                $scope.addressList = DelieveryAddressService.trimAddressList(data);

                console.log($scope.addressList);
                console.log($scope.backTocome);

                //  是否添加【不可配送】标签
                if(!isOrder){                               //  从【'#/my'】过来不添加
                    $scope.isOrder = false;
                }else{                                      //  添加【不可配送】标签
                    $scope.isOrder = true;
                    //  选中地址
                    $scope.chooseAddress = function(addressInfo){

                        //  是否可配送
                        if(addressInfo.canDeliever){
                            DelieveryAddressService.setAddressInfo(addressInfo);
                            window.location.href = '#/confirmOrder';
                        };
                    };
                };
            });

        //  【编辑/新增】按钮
        $scope.edit = function(addressInfo){
            if(addressInfo && addressInfo.addressId){       //  【编辑/新增】家庭地址/公司地址 编辑【普通地址】
                //  保存修改信息
                var title = OperateAddressService.operateAddress
                    .creatPage(addressInfo.addressType,addressInfo);
                OperateAddressService.setOperateAddress(title);
                window.location.href = "#/editAddress";
            }else{                                          //  【新增】普通地址
                //  保存修改信息
                var title = OperateAddressService.operateAddress
                    .creatPage(0);
                OperateAddressService.setOperateAddress(title);

                window.location.href = "#/editAddress";
            };
        };

        $scope.deleteAddress = function(addressInfo){
            var addressId = addressInfo.addressId;
            DelieveryAddressService.deleteAddress({
                addressId:addressId,
                sign:'',
                accessInfo:accessInfo
            }).then(function success(){
                addressInfo.isNotDeleted = false;
            });
        };
    };
}());