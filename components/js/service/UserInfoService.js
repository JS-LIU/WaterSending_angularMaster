/**
 * Created by LDQ on 2016/8/16.
 */
(function(){
    angular.module('myApp')
        .service('UserInfoResource',UserInfoResource)
        .factory('UserInfoService',UserInfoService);

    function UserInfoResource($resource){
        return $resource('userInfo/:operate',
            {operate:'@operate'});
    };

    function UserInfoService($cookieStore,UserInfoResource,Login){
        var user = {
            getInfo:{}
        };
        var accessInfo = Login.getAccessInfo($cookieStore,true);
        accessInfo.phone_num = "";
        user.getInfo = function(){
            return UserInfoResource.save(
                {operate:'info'},
                {
                    sign: "",
                    accessInfo: accessInfo

                }
            ).$promise;
        };


        return user;
    };
}());