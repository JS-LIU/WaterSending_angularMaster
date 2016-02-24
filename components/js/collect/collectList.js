/**
 * Created by liu on 2015/11/13.
 */
var collect = angular.module('collect', ['ngRoute','ngCookies','huipayLogIn']);

collect.controller('collection',function($scope,$cookieStore,collectPost,Login,refreshData){
    function postShopList(){
        var lnglatXY = $cookieStore.get('lnglatXY');
        var requestPageInfo={
            pageNo:1,
            pageSize:50
        }
        var merchantData = {
            positionInfo:lnglatXY,
            accessInfo:Login.getAccessInfo($cookieStore,true),
            sign: 'sign',
            userId:0,
            xAxis:lnglatXY.position_x,
            yAxis:lnglatXY.position_y,
            requestPageInfo:requestPageInfo
        }
        function changePage(pageNo){
            merchantData.requestPageInfo.pageNo = pageNo;
            return merchantData;
        }
        console.log(merchantData);
        var path = "favourite/shop/list"
        collectPost.postData(merchantData,path).success(function(data){
            console.log(data);
            $scope.shopList = data.favourShops;
        });
        refreshData.getMoreData(changePage(2),path,function(getData,merchantData){
            console.log(getData);
            merchantData.requestPageInfo.pageNo++;
        });
    };
    postShopList();
    $scope.shop = true;$scope.goods = false;
    $scope.postShopList = function(){
        $scope.shop = true;
        $scope.goods = false;
        postShopList();
    }
    $scope.postShopList();
    $scope.postGoodsList = function(){
        $scope.goods = true;
        $scope.shop = false;
    }

});


collect.factory('collectPost',function($http){
    var host = window.location.host;
    var contextPath = document.location.pathname;
    var index = contextPath.substr(1).indexOf("/");
    contextPath = contextPath.substr(0, index + 1);

    var url = "http://" + host + contextPath + '/';
    var postData = function(data,path){
        return $http({
            method:'POST',
            url: url + path,
            data: data,
            headers:{'Content-Type':'application/json'},
        });
    }
    return {
        postData: function(data,path){
            return postData(data,path,'postData');
        }
    }
});
collect.service('refreshData',function(collectPost){
    var wH = document.documentElement.clientHeight;
    this.getMoreData = function(data,path,func){
        $(window).scroll(function(){
            var dH = document.body.scrollHeight;
            var overH = document.body.scrollTop;
            if(wH + overH == dH){
                collectPost.postData(data,path).success(function(getData){
                    func(getData,data);
                    dH = document.body.scrollHeight;
                });
            }
        })
    }
});