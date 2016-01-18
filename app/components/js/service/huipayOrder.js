/**
 * Created by 殿麒 on 2016/1/13.
 */
(function(){
    angular.module('huipayOrder',['ngResource','ngCookies','huipayLogIn'])
        .factory('Order',Order)

    function Order($resource,$q,$cookieStore){
        var createOrder = function(obj){
            var defer = $q.defer();
            var waterTicketesOrder = $resource('http://114.251.53.22/huipaywater/ticketorder/new',{});
            waterTicketesOrder.save({},obj,function(data){
                defer.resolve(data);
            });
            return defer.promise;
        }
        var saveCookies = function(data){
            $cookieStore.put('orderId',data)
        }

        return {
            createOrder: createOrder,
            saveCookies: saveCookies
        }
    }
}())