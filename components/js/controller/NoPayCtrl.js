/**
 * Created by liudq on 16/6/5.
 */
(function(){
    angular.module('myApp')
        .controller('NoPayCtrl',NoPayCtrl);

    function NoPayCtrl($scope,
                       $cookieStore,
                       Login,
                       OrderService){
        var accessInfo = Login.getAccessInfo($cookieStore,true);
        accessInfo.phone_num = '';
        OrderService.tradeList({
            sign:'',
            accessInfo:accessInfo,
            requestPageInfo:{
                pageSize:1,
                pageNo:50
            },
            clientOrderState:1
        }).then(function(data){
            console.log(data);
        });
    };
}());
