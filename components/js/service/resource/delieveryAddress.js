/**
 * Created by 殿麒 on 2016/4/5.
 */
(function(){
    angular.module('delieveryAddress',['ngResource'])
        .factory('DelieveryAddress',DelieveryAddress);
    function DelieveryAddress($resource){
        return $resource('delieveryAddress/:operate',{operate:'@operate'});
    }
}());