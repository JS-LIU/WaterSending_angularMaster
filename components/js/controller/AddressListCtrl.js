/**
 * Created by 殿麒 on 2016/3/29.
 */
(function(){
    angular.module('myApp')
        .controller('AddressList',AddressList);
    function AddressList($scope,ChangeLocation){
        $scope.addressList = ChangeLocation.getAllCities().cities;
    }
}());