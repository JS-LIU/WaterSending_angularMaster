/**
 * Created by 殿麒 on 2016/3/28.
 */
(function(){
    angular.module('myApp')
        .factory('ChangeLocation',function($resource,$q,$cookieStore,Login){
            var ChangeLocation = {
                setAllCities:{},                //  从服务器 获取城市列表
                getAllCities:{},                //  从本地 获取城市列表
                getProvinces:{},                //  从服务器获取【省份】列表
                getThisCity:{},                 //  从本地获取当前地址
                getArea:{}                      //  获取地区

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
            };
            ChangeLocation.getProvinces = function(obj){
                var defer = $q.defer(),
                    provinces = $resource('provinces',{});
                provinces.save({},obj,function(data){
                    defer.resolve(data);
                });
                return defer.promise;
            };

            ChangeLocation.getArea = function(obj){
                var defer = $q.defer(),
                    areas = $resource('getByParent ',{});
                areas.save({},obj,function(data){
                    defer.resolve(data);
                });
                return defer.promise;
            };


            ChangeLocation.getAllCities = function(){
                return huipayLocationArr;
            };
            return ChangeLocation;
        });
}());