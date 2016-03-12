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
            'huipayLogIn',
            'huipayUI',
            'huipayMap'
        ])
        .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/',{
            templateUrl:'06-01-map.html',
            controller:'PositionMyLocalCtrl',
        })
    }]);
}());