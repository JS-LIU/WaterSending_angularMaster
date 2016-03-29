/**
 * Created by 殿麒 on 2016/3/29.
 */
(function(){
    angular.module('myApp')
        .factory('AddressListener',function($rootScope){
            var addressListener = {
                updataAddress:{},
                nowAddress:""
            };

            addressListener.updataAddress = function(value){
                addressListener.nowAddress = value;
                $rootScope.$broadcast("AddressUpdated");
            }
            return addressListener;
        });
}());