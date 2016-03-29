/**
 * Created by 殿麒 on 2015/8/23.
 */


(function(){
    angular.module('myApp',
        [
            'ngRoute',
            'ngTouch',
            'ngCookies',
            'ngResource',
            'ngAnimate',
            'huipayUI',
            'huipayMap',
            'huipayLogIn'
        ])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/',{
                templateUrl:'06-01-map.html',
                controller:'PositionMyLocalCtrl',
            }).when('/inputLocation',{
                templateUrl:'06-02-location.html',
                controller:'SearchLocationCtrl'
            }).when('/addressList',{
                templateUrl:'06-03-addressList.html',
                controller:'AddressList'
            })
        }])
        .config(function(MapProvider){
            MapProvider.setMap(AutonaviMap);
        });
}());