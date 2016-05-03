/**
 * Created by 殿麒 on 2016/4/23.
 */
(function(){
    angular.module('myApp')
        .controller('GoodsListCtrl',GoodsListCtrl);

    function GoodsListCtrl($scope,
                           $cookieStore,
                           Login,
                           ShopInfoService,
                           VouchermarketingResource,
                           ShoppingCartService){

        var accessInfo = Login.getAccessInfo($cookieStore,false);
        var loginAccessInfo = Login.getAccessInfo($cookieStore,true);
        accessInfo.phone_num = "";
        loginAccessInfo.phone_num = "";

        //  获取shopInfo;
        $scope.shopInfo = ShopInfoService.getSpeShopInfo();

        //  获取代金券代金券
        VouchermarketingResource.getVoucherMarket($scope.shopInfo.shopId)
            .then(function(data){
                console.log(data);
                $scope.voucherList = data.voucherMarketingInfoList;
            });

        var postGoodsList = {
            accessInfo:accessInfo,
            requestPageInfo:{
                pageSize: 10,
                pageNo: 1
            },
            sign:"",
            shopId:$scope.shopInfo.shopId
        }

        //  获取商品列表
        ShopInfoService.productList(postGoodsList).then(function(data){
            $scope.goodsInfo = data;
            $scope.totalCount = data.responsePageInfo.totalCount;
            $scope.pageSize = data.responsePageInfo.pageSize;
            $scope.currentPage = data.responsePageInfo.pageNo;
        });
        //  下拉加载
        $scope.loadMore = function(){
            var currentSize = $scope.pageSize * $scope.currentPage;
            var nextPage = ++$scope.currentPage;
            if( currentSize < $scope.totalCount){
                postGoodsList.requestPageInfo = {
                    pageSize:10,
                    pageNo:nextPage
                }
                ShopInfoService.productList(postGoodsList)
                    .then(function(data){
                        console.log(data);
                        $scope.goodsInfo.productList = $scope.goodsInfo.productList.concat(data.productList);
                    });
            }
        };
        //  加入购物车
        $scope.putInShoppingCart = function(goodsItem){
            ShoppingCartService.putInShoppingCart({
                accessInfo:loginAccessInfo,
                sign:"",
                item: {
                    itemId: "",
                    productId: goodsItem.productId,
                    shopId: $scope.shopInfo.shopId,
                    productName: goodsItem.title,
                    price: goodsItem.price,
                    num: 1,
                    productType: 7,
                    preferentialId: ""
                }

            });

        }

    }
}());