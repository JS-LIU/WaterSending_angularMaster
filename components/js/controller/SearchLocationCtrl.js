/**
 * Created by 殿麒 on 2016/3/15.
 */
(function(){
    //  首页【定位】
    angular.module('myApp')
        .controller('SearchLocationCtrl',SearchLocationCtrl);

    function SearchLocationCtrl($scope,
                                $q,
                                $localStorage,
                                $cookieStore,
                                Map,
                                Login,
                                DelieveryAddressService,
                                AddressListener,
                                OperateAddressService){
        $scope.keywords = "";
        var city = $localStorage.addressInfo.city;
        $scope.$watch("keywords",function(){
            Map.searchAfterEnterPrompt($q,city,$scope.keywords)
                .then(function(locationInfoArr){
                    $scope.locationInfoArr = locationInfoArr;
                });
        });


        $scope.setNewLnglat = function(location){

            var nowLocation = {
                lnglatXY:[location.location.lng,location.location.lat],
                name:location.name
            }
            AddressListener.updataLocation(nowLocation);
        }

        //  拟定的地址
        $scope.speAddressArr = DelieveryAddressService.speAddressArr;


        //  为选择【家庭地址/公司地址】绑定方法

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

        //  请求地址列表
        DelieveryAddressService.getAddressList(postAddressListData)
            .then(function success(data){
                var homeAddress = DelieveryAddressService
                    .getSpeAddress(data,1);
                var companyAddress = DelieveryAddressService
                    .getSpeAddress(data,2);

                $scope.selectAddress = function(addressType){
                    if(addressType == 1 && homeAddress){
                        var nowLocation = {
                            lnglatXY:[homeAddress.position_x,
                                homeAddress.position_y],
                            name:homeAddress.name
                        }
                        AddressListener.updataLocation(nowLocation);
                    }else if(addressType == 2 && companyAddress){
                        var nowLocation = {
                            lnglatXY:[companyAddress.position_x,
                                companyAddress.position_y],
                            name:companyAddress.name
                        }
                        AddressListener.updataLocation(nowLocation);
                    }else{
                        OperateAddressService.creatPage(addressType);
                        window.location.href = "/editAddress";
                    }
                }
            },function error(error){
                console.error(error);
                //  未登录
                $scope.addedAddress = "07-log.html";
            });
    }
}());