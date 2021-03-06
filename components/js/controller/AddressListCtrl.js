/**
 * Created by 殿麒 on 2016/3/29.
 */
(function(){
    angular.module('myApp')
        .controller('AddressListCtrl',AddressList);
    function AddressList($scope,
                         $q,
                         ChangeLocation,
                         AddressListener,
                         Map){
        $scope.addressList = ChangeLocation.getAllCities().cities;

        //  点击城市
        $scope.changeCity = function(address){
            //  得到该城市的经纬度
            Map.getLocationLnglatXY($q,address.label).then(function(lnglatXY){
                var city = {
                    city:address.label,
                    cityId:address.id,
                    lnglatXY:lnglatXY,
                    name: address.label,
                    addressId:address.addressId
                }
                AddressListener.updataLocation(city);
                window.location.href = "javascript:history.go(-1);";
            });
        }
    }
}());