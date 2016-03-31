/**
 * Created by 殿麒 on 2016/3/29.
 */
(function(){
    angular.module('myApp')
        .factory('AddressListener',function($localStorage){
            var locationListener = {
                updataLocation:{}
            }

            locationListener.updataLocation = function(data){
                $localStorage.addressInfo = data;
            }
            return locationListener;
        });
}());