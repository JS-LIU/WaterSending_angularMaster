/**
 * Created by 殿麒 on 2016/4/25.
 */
(function(){
    angular.module('myApp')
        .controller('ShopListCtrl',ShopListCtrl);
    function ShopListCtrl($scope,
                          $cookieStore,
                          $localStorage,
                          Login,
                          GetNearShopService,
                          ShopInfoService,
                          LoadMoreService){
        $scope.isSearch = true;
        $scope.rightText = "搜索店铺";

        $scope.searchNearShopBtn = function(){
            $scope.isSearch = !$scope.isSearch;
            if($scope.isSearch){
                $scope.rightText = "搜索店铺";
            }else{
                $scope.rightText = "取消";
            }
        }
        var addressInfo = $localStorage.addressInfo;
        var accessInfo = Login.getAccessInfo($cookieStore,false);
        accessInfo.phone_num = "";
        var positionInfo = {
            position_x:addressInfo.lnglatXY[0],
            position_y:addressInfo.lnglatXY[1],
            districtId:addressInfo.cityId,
            addressInfo:addressInfo.name
        }
        var postshopList = {
            accessInfo:accessInfo,
            requestPageInfo: {
                pageSize:10,
                pageNo:1
            },
            sign:'',
            x_dpi:'640',
            positionInfo:positionInfo
        }
        //  获取附近店铺位置
        GetNearShopService.getShopList(postshopList)
            .then(function(data){
                console.log(data);
                $scope.shopList = data.shopList;

                $scope.changeSpeShop = function(shopListItem){
                    ShopInfoService.setSpeShopInfo(shopListItem);
                }
                $scope.totalCount = data.responsePageInfo.totalCount;
                $scope.pageSize = data.responsePageInfo.pageSize;
                $scope.currentPage = data.responsePageInfo.pageNo;

                $scope.loadMore = function(){
                    var currentSize = $scope.pageSize * $scope.currentPage;
                    var nextPage = ++$scope.currentPage;
                    if( currentSize < $scope.totalCount){
                        postshopList.requestPageInfo = {
                            pageSize:10,
                            pageNo:nextPage
                        }
                        GetNearShopService.getShopList(postshopList)
                            .then(function(data){
                                $scope.shopList = $scope.shopList.concat(data.shopList);
                            });
                    }

                }
        });




    }
}());