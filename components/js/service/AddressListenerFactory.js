/**
 * Created by 殿麒 on 2016/3/29.
 */
(function(){
    angular.module('myApp')
        .factory('AddressListener',function($localStorage){
            var locationListener = {
                updataLocation:{}
            }

            $localStorage.addressInfo = {};
            locationListener.updataLocation = function(data){
                for(var prop in data){
                    $localStorage.addressInfo[prop] = data[prop];
                }
            }
            return locationListener;
        });
}());