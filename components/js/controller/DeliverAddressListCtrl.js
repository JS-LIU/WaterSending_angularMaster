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
                                    OperateAddressService){
        //  请求地址列表参数
        var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
        accessInfo.phone_num = "";
        var postAddressListData = {
            sign:"",
            accessInfo:accessInfo,
            positionInfo:{
                position_x:$localStorage.addressInfo.lnglatXY[0],
                position_y:$localStorage.addressInfo.lnglatXY[1],
                districtId:$localStorage.addressInfo.cityId,
                addressInfo:$localStorage.addressInfo.name,
                phoneCode:""
            }
        }

        //  【家庭地址/公司地址】名字
        DelieveryAddressService.getAddressList(postAddressListData)
            .then(function success(data){
                console.log(data);
                $scope.addressList = DelieveryAddressService.trimAddressList(data);
                console.log($scope.addressList);
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
            }
        }
    }
}());