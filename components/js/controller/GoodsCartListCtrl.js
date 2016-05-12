/**
 * Created by 殿麒 on 2016/5/3.
 */
(function(){
    angular.module('myApp')
        .controller('GoodsCartListCtrl',GoodsCartListCtrl);
    function GoodsCartListCtrl($scope,
                               $cookieStore,
                               Login,
                               ShoppingCartService){
        var accessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
        accessInfo.phone_num = "";

        var postGoodsCart = {
            sign:"",
            accessInfo:accessInfo,
            requestPageInfo:{
                pageSize:1,
                pageNo: 10
            }
        }
        ShoppingCartService.showShoppingCartList(postGoodsCart)
            .then(function(data){
                //  array
                var goodsListObj = ShoppingCartService.fixedGoodsList(data.cartInfos);
                $scope.goodsListObj = goodsListObj;
            });

        $scope.goodsChecked = function(parentObj,selfObj){
            var parentObj = parentObj;
            var selfObj = selfObj;
            var childName = "itemList";
            selfObj = ShoppingCartService.checked.selfChecked(selfObj);
            ShoppingCartService.checked.childrenChecked(selfObj,childName);
            ShoppingCartService.checked.parentChecked(parentObj,childName);
            //  是否全选
            ShoppingCartService.checked.parentChecked($scope.goodsListObj,childName);

            //  计算钱
            ShoppingCartService.money.calc(parentObj,selfObj,childName,$scope.goodsListObj);
            //  总价
            ShoppingCartService.money.totleMoney($scope.goodsListObj,childName);
        }

        $scope.increaseNum = function(goodsInfo){
            ShoppingCartService.increaseNum(goodsInfo,'num');
        }
        $scope.decreaseNum = function(goodsInfo){
            ShoppingCartService.decreaseNum(goodsInfo,'num');
        }

        //  删除
        $scope.deleteGoods = function(shopInfo,goodsInfoSiblings,goodsInfo){
            ShoppingCartService.deleteGoods.topost({
                accessInfo:accessInfo,
                sign:'',
                deleteModels:[
                    {
                        shoppingCartId:shopInfo.shoppingCartId,
                        itemIds:[goodsInfo.itemId]
                    }
                ]
            });
            ShoppingCartService.deleteGoods.toshow(shopInfo,goodsInfoSiblings,goodsInfo);
        };



        //  底部样式
        $scope.shoppingCartfooter = {
            height:'49px',
            lineHeight:'49px',
            background:'#4a5156',
        }
    }
}());