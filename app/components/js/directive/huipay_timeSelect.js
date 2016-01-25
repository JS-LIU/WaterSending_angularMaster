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
                scope.hour = [],scope.sec = [],scope.lean = calcSkew(60,20);

                for(var i = 0; i < 24;i++){
                    scope.hour.push(i);
                }
                for(var i = 0; i < 60;i++){
                    scope.sec.push(i);
                }

                /*
                 * 计算颜色渐变
                 * 参数:1.起始的颜色数组['#xxx','#xxx']
                 *     2.结束的颜色数组['#xxx','#xxx']
                 */
                var totleNum = 7;
                function calcSkew(initDeg,rate){
                    var skewArr = [];
                    for(var i = 0; i < totleNum; i++){
                        skewArr.push(initDeg);
                        initDeg -= rate;
                        if(initDeg < 0){
                            initDeg +=360;
                        }
                    }
                    return skewArr;
                }
            }
        }
    }
}());