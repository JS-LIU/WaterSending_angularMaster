/**
 * Created by 殿麒 on 2016/4/5.
 */
(function(){
    angular.module('myApp')
        .controller('MyCtrl',MyCtrl);
    function MyCtrl(
        $scope,
        $cookieStore,
        Login,
        OrderService){

        $scope.isLog = Login.isLogIn();
        //  判断是否登录
        if($scope.isLog){    //  登录
            //  编辑头像
            $scope.nextPage = "#/myDetails";
            $scope.myHeader = "";
            $scope.myName = "您好尊敬的海豹用户";
            $scope.myCode = "001";
            $scope.nextPage = 'javascript:void(0)';
        }else{                  //  未登录
            //  登录页
            $scope.nextPage = "07-log.html";
            $scope.myHeader = "components/images/tempHeader.png";
        }

        $scope.orderStates = OrderService.getOrderState();

        $scope.getCurrentState = function(state){
            OrderService.setCurrentState(state);
        };

        $cookieStore.put('lastPage','#/my');
    }
}());