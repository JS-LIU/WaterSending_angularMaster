/**
 * Created by 殿麒 on 2016/3/29.
 */
(function(){
    angular.module('myApp')
        .controller('AddressList',AddressList);
    function AddressList($scope,
                         $q,
                         ChangeLocation,
                         AddressListener,
                         Map){
        $scope.addressList = ChangeLocation.getAllCities().cities;

        //  点击城市
        $scope.changeCity = function(address){
            //  得到该城市的经纬度
            Map.getLocationLnglatXY($q,address).then(function(lnglatXY){
                var city = {
                    city:address.label,
                    cityId:address.id,
                    lnglatXY:lnglatXY,
                    name: address.label
                }
                AddressListener.updataLocation(city);
            });
        }
    }
}());