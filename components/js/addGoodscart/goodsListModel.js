/**
 * Created by LIU on 15/9/27.
 */
purchase.controller('goodsListModel',goodsListModel);
function goodsListModel($rootScope,$scope,$cookieStore,goodsCartcookie,purchasePost,postclassify,toPay,refreshData,getSelfUrl,ramdomStart,Login,Order){

    //  获取当前URL
    var myUrl = getSelfUrl.myUrl;
    $cookieStore.put('myUrl',myUrl);

    $scope.cutclassify = false;
    $scope.classifyClick = [{name:'商品分类',id:1},{name:'综合排序',id:2}];
    var data = postclassify.data(1);
    var classifymodle = [{name:'商品分类'},{name:'桶装水',sortWay:{categoryId:0}},{name:'瓶装水',sortWay:{categoryId:1}}];
    var incomeClassify = [{name:'综合排序'},{name:'价格排序',sortWay:{sortType:1}},{name:'销量排序',sortWay:{sortType:2}}];
    //  请求商品列表
    var path = "shop/productList";
    purchasePost.postData(data,path).success(function(data){
        $scope.goodsList = data['productList'];
    });
    refreshData.getMoreData(postclassify.data(2),path,function(getData,data){
        $scope.goodsList = $scope.goodsList.concat(getData['productList']);
        data.requestPageInfo.pageNo++;
    });

    $scope.showWay1 = true;
    $scope.showWay2 = false;
    $scope.cutShowway = function(){
        $scope.showWay1 = $scope.showWay2;
        $scope.showWay2 = !$scope.showWay2;
    }
    //  底部购物车商品数量价格
    var goodscart_list = $cookieStore.get('goodscart_list');
    $scope.goodscart_money = 0;
    $scope.goodscart_num = 0;
    if(goodscart_list != undefined){
        for(var i = 0; i < goodscart_list.length;i++){
            $scope.goodscart_num += goodscart_list[i].num;
            var goodscart_money = goodscart_list[i].price * goodscart_list[i].num;
            $scope.goodscart_money += goodscart_money;
        }
    }

    var isLogin = Login.isLogIn();

    //  添加购物车
    $scope.addGoodscart = function(item){
        if(isLogin){
            var goodscart_list = $cookieStore.get('goodscart_list');
            $scope.goodscart_num += 1;
            $scope.goodscart_money += item.price;
            //  添加cookie
            goodsCartcookie.add_goodsCart_cookie(goodscart_list,item);
        }else{
            window.location.href = "07-log.html";
        }
    }
    //  查看购物车
    $scope.toGoodsCart = function(){
        if(isLogin){
            window.location.href = "#/goodsCart"
        }else{
            window.location.href = "07-log.html";
        }
    }

    $scope.showClassify = function(item){
        $scope.cutclassify = !$scope.cutclassify;
        if(item.id == 1){
            $scope.classifyList = classifymodle;
        }
        if(item.id == 2){
            $scope.classifyList = incomeClassify;
        }
    }

    //  选则排序方式
    $scope.select = function(item){
        var obj = item.sortWay;
        var data = postclassify.data(obj);
        purchasePost.postData(data,path).success(function(data){
            $scope.goodsList = data["productList"];
        });
        $scope.cutclassify = !$scope.cutclassify;
    }

    //  商品详情
    $scope.getGoodsInfo = function(item){
        $rootScope.GOODSINFO = item;
        window.location.href = '#/goodsDetails';
    }
    $scope.toPay = function(){
        var goodsCart_list = $cookieStore.get('goodscart_list') || [];
        toPay.pay(goodsCart_list);
    }
    //  商店信息
    var self_url = GetQueryString("shopId");
    if(self_url != undefined){
        var shopId = self_url;
        var data = {
            accessInfo:Login.getAccessInfo($cookieStore,false),
            shopId:shopId,
            x_dpi:640
        }
        var path = 'shop/getshopById';
        purchasePost.postData(data,path).success(function(shopInfo){
            var shopInfo = $cookieStore.put('shopInfo',shopInfo);
            shopInfo.score = ramdomStart.getStar(shopInfo.score);
            $scope.shopInfo = shopInfo;
        });
    }else{
        var shopInfo = $cookieStore.get('shopInfo');
        console.log(shopInfo);
        shopInfo.score = ramdomStart.getStar(shopInfo.score);
        $scope.shopInfo = shopInfo;
    }

    //  对话框
    $scope.dialogShow = false;
    //  点击【快捷支付按钮】
    $scope.showDialog = function(){
        $scope.dialogShow = true;
    }
    //  点击对话框【取消】按钮
    $scope.notPay = function(){
        $scope.dialogShow = false;
    }
    //  点击对话框【好】按钮
    $scope.quickPay = function(){

        var total_fee = document.getElementById('J_payMoney').value * 100;
        if(isLogin){
            var data = {
                shopId:shopInfo.shopId,
                total_fee:total_fee,
                description:'',
                comment:'',
                addressId:'',
                orderType:'6',
                isCod:'0',
                homeTime:'0:00~0:00',
                accessInfo:Login.getAccessInfo($cookieStore,true),
                sign:'sign'
            }
        }else{
            window.location.href = "07-log.html";
        }

        Order.createOrder(data,'order').then(function(data){
            Order.saveCookies(data);
            window.location.href = "09-payPage.html";
        })
    }
};
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//  请求（筛选）【商品】post的数据
purchase.service('postclassify',function($cookieStore,purchasePost,Login){
    this.data = function(pageNo,obj){
        //  请求商品信息数据
        var self_url = GetQueryString("shopId");
        var shopId;
        if(self_url != undefined){
            shopId = self_url;
        }else{
            shopId = $cookieStore.get('shopInfo')["shopId"];
        }
        var requestPageInfo = {
            pageSize: 6,
            pageNo: pageNo
        }
        var accessInfo = Login.getAccessInfo($cookieStore,false);
        var postData = {
            requestPageInfo:requestPageInfo,
            accessInfo:accessInfo,
            sign:'sign',
            shopId:shopId
        }
        for(var prop in obj){
            postData[prop]= obj[prop];
        }
        return postData;
    }
});

purchase.factory('ramdomStart',function(){
    function calcStar(){
        var num = parseInt(Math.random()*5) + 1;
        return num;
    }
    function paintStar(score){
        console.log(score);
        if(score == 0){
            var newscore = calcStar();
        }else{
            var newscore = parseInt(score / 2);
        }
        var startArr = [];
        for(var i = 0,len = newscore;i < len;i++){
            var obj = {
                src:"components/images/star5.png"
            }
            startArr.push(obj);
        }
        for(var j = 5; j > newscore; j--){
            var obj = {
                src:"components/images/star6.png"
            }
            startArr.push(obj);
        }
        return startArr;
    }

    return {
        getStar:paintStar
    }
});



