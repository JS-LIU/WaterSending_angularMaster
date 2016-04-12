/**
 * Created by 殿麒 on 2016/4/5.
 */
(function(){
    angular.module('delieveryAddress',['ngResource'])
        .service('DelieveryAddressResource',DelieveryAddressResource)
        .service('DelieveryAddressService',DelieveryAddressService);

    function DelieveryAddressResource($resource){
        return $resource('delieveryAddress/:operate',
            {operate:'@operate'},
            {post:{method:'POST',isArray:true}});
    }

    function DelieveryAddressService(DelieveryAddressResource){

        //  【提前拟定】地址
        this.speAddressArr = [{name:'家庭地址',addressType:1},
            {name:'公司地址',addressType:2}];



        //  获取默认地址
        this.getDefnAddress = function(obj){
            return DelieveryAddressResource.save(
                {operate:'showDefaultAddress'},
                obj
            ).$promise;
        }

        //  获取收获地址列表
        this.getAddressList = function(obj){
            return DelieveryAddressResource.post(
                {operate:'show'},
                obj
            ).$promise;
        }

        //  得到【家庭地址/公司地址】
        this.getSpeAddress = function(arr,condition){
            var speAddress;
            for(var i = arr.length - 1 ; i >= 0 ;i--){
                if(arr[i].addressType == condition){
                    speAddress = arr[i];
                    return speAddress;
                }
            }
        }
    }
}());