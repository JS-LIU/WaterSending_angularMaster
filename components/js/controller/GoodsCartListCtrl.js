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
                console.log(goodsListObj);
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
        }

        $scope.changeNum = function(goodsInfo){

        }

        //  底部样式
        $scope.shoppingCartfooter = {
            height:'49px',
            background:'#4a5156',
        }
    }
}());