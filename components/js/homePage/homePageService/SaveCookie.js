/**
 * Created by 殿麒 on 2016/1/12.
 */
(function(){
    angular.module('myApp')
        .factory('WaterTicketes',function($cookieStore){

            var saveCookies = function(item){
                $cookieStore.put('ticketesInfo',item);
            }

            return {
                saveCookies: saveCookies
            }
        })
}())