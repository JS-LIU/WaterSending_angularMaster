/**
 * Created by 殿麒 on 2016/4/23.
 */
(function(){
    angular.module('myApp')
        .controller('GoodsListCtrl',GoodsListCtrl);

    function GoodsListCtrl($scope,
                           $cookieStore,
                           $localStorage,
                           $location,
                           Login,
                           ShopInfoService,
                           VouchermarketingResource,
                           ShoppingCartService){
        $cookieStore.put('lastPage','#/goodsList');

        $scope.isShowSimpleDialog = false;
        var accessInfo = Login.getAccessInfo($cookieStore,false);
        var loginAccessInfo = Login.getAccessInfo($cookieStore,Login.isLogIn());
        accessInfo.phone_num = "";
        loginAccessInfo.phone_num = "";

        //  获取shopInfo;
        var shopInfo = ShopInfoService.getSpeShopInfo();
        var shopId = $location.search().shopId;
        //  是否重新选择过水站
        if(shopInfo.shopId){
            $scope.shopInfo = shopInfo;
        }else if(shopId){               //  是否从其他平台调过来的
            ShopInfoService.shopDetail({
                shopId: shopId,
                viewCount:0,
                sign:'',
                accessInfo:accessInfo
            }).then(function(data){
                ShopInfoService.setSpeShopInfo(data);
                $scope.shopInfo = data;
                $scope.shopInfo.shopId = shopId;
            });
        }else{                          //  自然进入
            var positionInfo = {
                districtId:$localStorage.addressInfo.cityId,
                position_x:$localStorage.addressInfo.lnglatXY[0],
                position_y:$localStorage.addressInfo.lnglatXY[1],
                addressInfo:$localStorage.addressInfo.name,
                phoneCode:'',
                addressType:""
            };
            //  最近的一家商店信息
            ShopInfoService.nearestShopInfo({
                sign:"",
                accessInfo:accessInfo,
                positionInfo:positionInfo,
                requestPageInfo:{
                    pageSize: 1,
                    pageNo: 1
                },
                keyWord:"",
                x_dpi:"",
                productId:""
            }).then(function(data){
                ShopInfoService.setSpeShopInfo(data);
                $scope.shopInfo = data;
            });
        }

        $scope.$watch('shopInfo',function(){
            if($scope.shopInfo) {
                console.log($scope.shopInfo);
                var shopId = $scope.shopInfo.shopId;
                VouchermarketingResource.getVoucherMarket(shopId)
                    .then(function (data) {
                        console.log(data);
                        $scope.voucherList = data.voucherMarketingInfoList;
                    });
                var postGoodsList = {
                    accessInfo: accessInfo,
                    requestPageInfo: {
                        pageSize: 10,
                        pageNo: 1
                    },
                    sign: "",
                    shopId: shopId
                };
                ShopInfoService.productList(postGoodsList)
                    .then(function (data) {
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
            }
        });

        $scope.getVoucher = function(voucher){
            VouchermarketingResource.getVoucher(voucher.activityId)
                .then(function success(){
                    $scope.isShowSimpleDialog = true;
                    $scope.alertText = '成功领取代金券';
                },function error(data){
                    if(data.data){
                        $scope.isShowSimpleDialog = true;
                        $scope.alertText = data.data.errorInfo;
                        console.log(data.data.errorInfo);
                    }else{
                        $cookieStore.put('lastPage','06-main.html#/goodsList');
                        window.location.href='07-log.html#/';
                    }
                });
        }


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
            }).then(function success(){
                $scope.isShowSimpleDialog = true;
                $scope.alertText = '成功加入购物车';
            },function error(data){
                if(!Login.isLogIn()){
                    $cookieStore.put('lastPage','06-main.html#/goodsList');
                    window.location.href='07-log.html#/';
                }else{
                    console.log(data.data.errorInfo);
                    $scope.isShowSimpleDialog = true;
                    $scope.alertText = data.data.errorInfo;
                }
            });
        };
    }
}());