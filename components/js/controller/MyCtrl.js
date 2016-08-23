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
        OrderService,
        UserInfoService){

        $scope.isLog = Login.isLogIn();
        //  判断是否登录
        if($scope.isLog){    //  登录
            //  编辑头像
            $scope.nextPage = "#/myDetails";
            $scope.myHeader = "components/images/head.png";
            var userInfo = UserInfoService.getInfo().then(function(data){
                console.log('userInfo---',data);
                $scope.myName = data.userInfo.name;
                $scope.myCode = data.userInfo.userId;
            });


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