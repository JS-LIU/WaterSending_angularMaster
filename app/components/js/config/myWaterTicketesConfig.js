/**
 * Created by 殿麒 on 2016/1/13.
 */

angular.module('myWaterTicketes',['ngRoute','ngResource','ngCookies','huipayLogIn'])
    .config(routeConfig);

function routeConfig($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'myWaterTicketes.html',
        controller:'WaterTicketesInfoCtrl'
    })
}