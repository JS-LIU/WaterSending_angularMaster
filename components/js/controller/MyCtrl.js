/**
 * Created by 殿麒 on 2016/4/5.
 */
(function(){
    angular.module('myApp')
        .controller('MyCtrl',MyCtrl);
    function MyCtrl($scope,Login){
        $scope.isLog = Login.isLogIn();
        //  判断是否登录
        if($scope.isLog){    //  登录
            //  编辑头像
            $scope.nextPage = "";
            $scope.myHeader = "";
        }else{                  //  未登录
            //  登录页
            $scope.nextPage = "07-log.html";
            $scope.myHeader = "components/images/tempHeader.png";
        }
    }
}());