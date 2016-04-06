/**
 * Created by 殿麒 on 2016/3/29.
 */
(function(){
    angular.module('myApp')
        .controller('AddressList',AddressList);
    function AddressList($scope,ChangeLocation,AddressListener){
        $scope.addressList = ChangeLocation.getAllCities().cities;

        $scope.changeCity = function(address){
            var city = {
                city:address.label,
                cityId:address.id
            }
            AddressListener.updataLocation(city);
        }
    }
}());