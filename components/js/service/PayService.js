/**
 * Created by 殿麒 on 2016/6/6.
 */
(function(){
    angular.module('PayModule',
        [
            'ngCookies',
            'ngResource',
            'ngStorage'
        ]).service('PayService',PayService);
    function PayService(){

    };
}());