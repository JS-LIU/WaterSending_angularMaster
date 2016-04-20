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
                                    DelieveryAddressService){
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
                $scope.addressList = DelieveryAddressService.trimAddressList(data);
            });

    }
}());