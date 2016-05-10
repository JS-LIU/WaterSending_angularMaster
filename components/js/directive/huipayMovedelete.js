/**
 * Created by 殿麒 on 2016/5/10.
 */
(function(){
    angular.module('huipayUI')
        .directive('huipayMovedelete',function($swipe){
            var x,x1,x2;

            function deleteBox(scope,ele){
                scope.moveStyle = {
                    left:'0px'
                }
                $swipe.bind(ele, {
                    'start': function(coords,e) {
                        e = e || window.event;
                        x = 0;
                        scope.moveStyle = {
                            left:'0px',
                        }
                    },
                    'move': function(coords) {
                        x2 = x1 || x;
                        x1 = coords.x;
                        var dif = x1 - x2;
                        if(parseInt(scope.moveStyle.left) <= 0 && dif < 0){
                            var oldLeft = parseFloat(scope.moveStyle.left);
                            oldLeft += dif;
                            scope.$apply(function(){
                                scope.moveStyle = {
                                    left:oldLeft +'px'
                                }
                            });
                        }
                    },
                    'end': function() {
                        scope.$apply(function(){
                            var intleft = parseInt(scope.moveStyle.left);
                            if(intleft >　-50){
                                scope.moveStyle = {
                                    left:'0px'
                                }
                            }
                            if(intleft <　-55){
                                scope.moveStyle = {
                                    left:'-55px'
                                }
                            }

                        });
                    }
                });
            }

            return{
                restrict:'EA',
                template:'<li class="pr" ng-style="moveStyle" ng-transclude></li>',
                priority:1000,
                transclude:true,
                replace:true,
                link:deleteBox
            }
        });
}());