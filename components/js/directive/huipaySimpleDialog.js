/**
 * Created by 殿麒 on 2016/6/2.
 */
(function(){
    angular.module('huipayUI')
        .directive('huipaySimpleDialog',function(){
            return{
                restrict:'EA',
                template:'<li class="pr" ng-style="moveStyle" ng-transclude></li>',
                priority:1000,
                replace:true
            }
        });
}());