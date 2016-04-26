/**
 * Created by 殿麒 on 2016/4/23.
 */
(function(){
    angular.module('myApp')
        .controller('GoodsListCtrl',GoodsListCtrl);

    function GoodsListCtrl($scope,
                           $cookieStore,
                           $localStorage,
                           Login,
                           ShopInfoService,
                           VouchermarketingResource){

        var addressInfo = $localStorage.addressInfo;

        var ShopInfo = ShopInfoService.getSpeShopInfo();

        if(ShopInfo.shopId){
            $scope.shopInfo = ShopInfo;
            var shopId = ShopInfo.shopId;
            VouchermarketingResource.getVoucherMarket(shopId)
                .then(function(data){
                    $scope.hasVoucher = !!data;
                });

        }else{
            var accessInfo = Login.getAccessInfo($cookieStore,false);
            accessInfo.phone_num = "";
            var positionInfo = {
                districtId:addressInfo.cityId,
                position_x:addressInfo.lnglatXY[0],
                position_y:addressInfo.lnglatXY[1],
                addressInfo:addressInfo.name,
                phoneCode:'010',
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
                $scope.shopInfo = data;
                var shopId = $scope.shopInfo.shopId;

                //  代金券
                return VouchermarketingResource.getVoucherMarket(shopId);
            }).then(function(data){
                console.log(data);
                $scope.hasVoucher = !!data;
            });
        }

    }
}());