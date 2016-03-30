/**
 * Created by 殿麒 on 2016/3/28.
 */
(function(){
    angular.module('myApp')
        .factory('ChangeLocation',function($resource,$q,$cookieStore,Login){
            var ChangeLocation = {
                setAllCities:{},                //  从服务器 获取城市列表
                getAllCities:{},                //  从本地 获取城市列表

                getThisCity:{},                 //  从本地获取当前地址

            }
            var huipayLocationArr = {};

            ChangeLocation.setAllCities = function(){
                var defer = $q.defer(),
                    cities = $resource('cities',{}),
                    data = {
                        sign:"sign",
                        accessInfo:Login.getAccessInfo($cookieStore,false)
                    }
                cities.save({},data,function(data){
                    huipayLocationArr = data;
                    defer.resolve(data);
                });
                return defer.promise;
            }
            ChangeLocation.getThisCity = function(data,value){
                for(var i = 0; i < data.length;i++ ){
                    if(data[i]['label'].slice(0,2) == value.slice(0,2)){
                        return data[i];
                    }
                }
            }

            ChangeLocation.getAllCities = function(){
                return huipayLocationArr;
            }
            return ChangeLocation;
        });
}());