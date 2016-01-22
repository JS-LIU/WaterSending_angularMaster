/**
 * Created by 殿麒 on 2016/1/22.
 */

(function(){
    angular.module('huipay_timeSelect',['ngTouch'])
        .directive('timeSelect',timeSelect);
    function timeSelect(){
        return {
            restrict:'A',
            scope:true,
            link:function(scope){
                scope.hour = [],scope.sec = [];

                for(var i = 0; i < 24;i++){
                    scope.hour.push(i);
                }
                for(var i = 0; i < 60;i++){
                    scope.sec.push(i);
                }
                
            }
        }
    }
}());