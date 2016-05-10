/**
 * Created by 殿麒 on 2016/5/9.
 */
(function(){
    angular.module('myApp')
        .controller('WaterTicketsDetailsCtrl',WaterTicketsDetailsCtrl);


    function WaterTicketsDetailsCtrl($scope,
                                     $cookieStore,
                                     Login,
                                     WaterTicketsService,
                                     ShoppingCartService){
        $scope.waterTicketDetail = WaterTicketsService.getWaterTicketInfo();
        //  得到选中的优惠策略
        $scope.whichDiscountWay =  WaterTicketsService.getSpeDiscontWay($scope.waterTicketDetail.preferentialStrategyModels);

        $scope.ischooseDiscountWay = true;
        if($scope.whichDiscountWay){
            $scope.ischooseDiscountWay = false;
        }


        //  点击加入购物车
        $scope.putInShoppingCart = function(waterTicketDetail,whichDiscountWay){

            if(!Login.isLogIn()){                               //  没有登录去登陆
                window.location.href = '#/my';
            }else if(!$scope.whichDiscountWay){                 //  没有选择购买种类选择购买种类
                window.location.href = '#/waterTicketsCombo';
            }else{                                              //  加入购物车
                ShoppingCartService.putInShoppingCart({
                    accessInfo:Login.getAccessInfo($cookieStore,true),
                    sign:"",
                    item:{
                        itemId:"",
                        productId:waterTicketDetail.id,
                        shopId:waterTicketDetail.shopId,
                        productName:waterTicketDetail.productName,
                        price:waterTicketDetail.price,
                        num:whichDiscountWay.requireCount,
                        productType: 11,
                        preferentialId:whichDiscountWay.id
                    }
                });
            }
        }
    };
}());