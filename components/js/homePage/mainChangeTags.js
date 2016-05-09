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
            'delieveryAddress',
            'shoppingCartModule',
            'WaterTickets'
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
                controller:'AddressListCtrl'
            }).when('/my',{
                templateUrl:'06-04-my.html',
                controller:'MyCtrl'
            }).when('/editAddress',{
                templateUrl:'06-02-deliverAddress.html',
                controller:'DeliverAddressCtrl'
            }).when('/deliverMap',{
                templateUrl:'06-02-01-mapDeliverAddress.html',
                controller:'DeliverMapCtrl'
            }).when('/deliverAddressList',{
                templateUrl:'06-02-02-deliverAddressList.html',
                controller:'DeliverAddressListCtrl'
            }).when('/goodsList',{
                templateUrl:'06-05-goodsList.html',
                controller:'GoodsListCtrl'
            }).when('/shopList',{
                templateUrl:'06-06-shopList.html',
                controller:'ShopListCtrl'
            }).when('/goodsCartList',{
                templateUrl:'06-07-goodsCartList.html',
                controller:'GoodsCartListCtrl'
            }).when('/waterTickets',{
                templateUrl:'06-03-waterTickets.html',
                controller:'WaterTicketsCtrl'
            }).when('/waterTicketsDetails',{
                templateUrl:'06-03-01-waterTicketsDetails.html',
                controller:'WaterTicketsDetailsCtrl'
            }).when('/waterTicketsCombo',{
                templateUrl:'06-03-02-waterTicketsCombo.html',
                controller:'WaterTicketsDisCountWay'
            });
        }])
        .config(function(MapProvider){
            MapProvider.setMap(AutonaviMap);
        });
}());