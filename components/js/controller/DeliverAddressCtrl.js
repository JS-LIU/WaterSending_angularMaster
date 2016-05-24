/**
 * Created by 殿麒 on 2016/4/12.
 */
(function(){
    angular.module('myApp')
        .controller('DeliverAddressCtrl',DeliverAddressCtrl);

    function DeliverAddressCtrl($scope,
                                $cookieStore,
                                $q,
                                Login,
                                Map,
                                OperateAddressService,
                                DelieveryAddressService,
                                ChangeLocation){

        //  本页数据
        var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
        accessInfo.phone_num = "";
        $scope.operateAddress = OperateAddressService.getOperateAddress();
        var deliverInfo = $scope.operateAddress.addressInfo;
        $scope.recieve_name = deliverInfo.recieve_name||"";
        $scope.phone_num = deliverInfo.phone_num||"";
        $scope.address = deliverInfo.address||"";
        $scope.isDefault = deliverInfo.isDefault||0;
        $scope.districtAddress = deliverInfo.districtAddress;

        $scope.hasCity = false;
        $scope.hasArea = false;

        $scope.getbigLocation = function(){
            //  省份
            ChangeLocation.getProvinces({
                accessInfo:Login.getAccessInfo($cookieStore,false),
                sign:''
            }).then(function(data){
                $scope.isprovinces = true;
                $scope.allProvinces = data;
            });
        };
        //  点击具体省份
        $scope.getNowProvince = function(province){
            $scope.nowProvince = province;
            $scope.isprovinces = false;
            $scope.hasCity = true;
            //  城市
            ChangeLocation.getArea({
                accessInfo:Login.getAccessInfo($cookieStore,false),
                sign:'',
                parentAreaId:province.id
            }).then(function(data){
                $scope.cities = data;
                $scope.iscity = true;
            });
        };
        //  点击具体城市
        $scope.getNowCity = function(city){
            $scope.nowCity = city;
            $scope.iscity = false;
            $scope.hasArea = true;

            //  地区
            ChangeLocation.getArea({
                accessInfo:Login.getAccessInfo($cookieStore,false),
                sign:'',
                parentAreaId:city.id
            }).then(function(data){
                $scope.areas = data;
                $scope.isarea = true;
            });
        };

        $scope.getNowArea = function(area){
            $scope.isprovinces = false;
            $scope.iscity = false;
            $scope.isarea = false;
            $scope.nowAreas = area;
            $scope.districtAddress = $scope.nowProvince + $scope.nowCity + $scope.nowAreas;
        }
        $scope.getsmallLocation = function(){
            $scope.keywords = deliverInfo.address||"";
            $scope.$watch("keywords",function(){
                Map.searchAfterEnterPrompt($q,"",$scope.keywords)
                    .then(function(locationInfoArr){
                        console.log(locationInfoArr);
                    });
            });

            var position_x,position_y;
            //  列表中 选择新的地址
            $scope.setNewLnglat = function(location){
                position_x = location.location.lng;
                position_y = location.location.lat;
            }
        }



        //  监听【被保存】地址变化
        $scope.saveAddress = function(){
            var addressItem = {
                addressId:deliverInfo.addressId||"10",
                phone_num:$scope.phone_num,
                recieve_name: $scope.recieve_name,
                position_x: position_x||deliverInfo.position_x,
                position_y: position_y.position_y,
                provinceId: $scope.nowProvince.id || deliverInfo.provinceId,
                cityId: $scope.nowCity.id || deliverInfo.cityId,
                districtAddress:$scope.districtAddress || deliverInfo.districtAddress,
                address:$scope.address || deliverInfo.address,
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