/**
 * Created by ���� on 2015/11/12.
 */
main.controller('myCtrl',function($scope,$cookieStore,Login,getSelfUrl){
    var myUrl = getSelfUrl.myUrl;
    $cookieStore.put('myUrl',myUrl);
    if(Login.isLogIn()){
        $scope.isLog = false;
    }else{
        $scope.isLog = true;
    }
    $scope.logout = function(){
        $cookieStore.remove("access_token");
        window.location.reload();
    }
});