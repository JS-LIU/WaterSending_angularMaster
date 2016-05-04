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
                $scope.goodsList = data.cartInfos;
                console.log(data.cartInfos);

            })
    }
}());