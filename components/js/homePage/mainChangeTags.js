/**
 * Created by 殿麒 on 2015/8/23.
 */


(function(){
    angular.module('myApp',
        [
            'ngRoute',
            'ngStorage',
            'ngTouch',
            'ngCookies',
            'ngResource',
            'ngAnimate',
            'huipayUI',
            'huipayMap',
            'huipayLogIn',
            'delieveryAddress'
        ])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/',{
                templateUrl:'06-01-map.html',
                controller:'PositionMyLocalCtrl',
            }).when('/inputLocation',{
                templateUrl:'06-01-01-location.html',
                controller:'SearchLocationCtrl'
            }).when('/addressList',{
                templateUrl:'06-01-02-addressList.html',
                controller:'AddressList'
            }).when('/my',{
                templateUrl:'06-04-my.html',
                controller:'MyCtrl'
            })
        }])
        .config(function(MapProvider){
            MapProvider.setMap(AutonaviMap);
        });
}());