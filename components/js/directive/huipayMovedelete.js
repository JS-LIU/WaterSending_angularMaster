/**
 * Created by 殿麒 on 2016/5/10.
 */
(function(){
    angular.module('huipayUI')
        .directive('huipayMovedelete',function($swipe,ShoppingCartService){
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

                scope.goodsChecked = function(parentObj,selfObj){
                    var parentObj = parentObj;
                    var selfObj = selfObj;
                    var childName = "itemList";
                    selfObj = ShoppingCartService.checked.selfChecked(selfObj);
                    ShoppingCartService.checked.childrenChecked(selfObj,childName);
                    ShoppingCartService.checked.parentChecked(parentObj,childName);

                    //  是否全选
                    ShoppingCartService.checked.parentChecked(scope.goodsListObj,childName);
                }

                scope.increaseNum = function(goodsInfo){
                    ShoppingCartService.increaseNum(goodsInfo,'num');
                }
                scope.decreaseNum = function(goodsInfo){
                    ShoppingCartService.decreaseNum(goodsInfo,'num');
                }
            }

            return{
                restrict:'EA',
                templateUrl:'appTemplate/movedelete.html',
                priority:1000,
                replace:true,
                link:deleteBox
            }
        });
}());