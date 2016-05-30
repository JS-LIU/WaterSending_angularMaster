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

        //  06-01-01需要的数据
        this.speAddressArr = [{name:'家庭地址',addressType:1},
            {name:'公司地址',addressType:2}];



        //  获取默认地址
        this.getDefnAddress = function(obj){
            return DelieveryAddressResource.save(
                {operate:'showDefaultAddress'},
                obj
            ).$promise;
        };

        //  获取收获地址列表
        this.getAddressList = function(obj){
            return DelieveryAddressResource.post(
                {operate:'show'},
                obj
            ).$promise;
        }
        //  整理收货地址列表为可用数据
        this.trimAddressList = function(data){
            var speAddress = [
                {
                    addressType:1,
                    isHome:true,
                    title:"家庭地址"
                },{
                    addressType:2,
                    isCompany:true,
                    title:"公司地址"
                }];
            var commonAddress = [];
            for(var i = 0,len = data.length;i < len; i++){
                //  家庭地址使用家庭地址图标 并显示家庭地址文字
                if(data[i].addressType == 1){
                    data[i].isHome = true;
                    data[i].title = "家庭地址";
                    speAddress[0] = data[i];
                }else if(data[i].addressType == 2){
                    data[i].isCompany = true;
                    data[i].title = "公司地址";
                    speAddress[1] = data[i];
                }else{
                    data[i].isCommon = true;
                    commonAddress.push(data[i]);
                }
            }
            return speAddress.concat(commonAddress);
        }
        //  新增收货地址
        this.newAddress = function(obj){
            return DelieveryAddressResource.save(
                {operate:'new'},
                obj
            ).$promise;
        };

        //  编辑收货地址
        this.editAddress = function(obj){
            return DelieveryAddressResource.post(
                {operate:'edit'},
                obj
            ).$promise;
        };

        //  得到【家庭地址/公司地址】
        this.getSpeAddress = function(arr,condition){
            var speAddress;
            for(var i = arr.length - 1 ; i >= 0 ;i--){
                if(arr[i].addressType == condition){
                    speAddress = arr[i];
                    return speAddress;
                }
            }
        };

        //  得到可以配送的地址
        this.canDeliverList = function(arr){
            var newArr = [];
            for(var i = 0,len = arr.length;i < len;i++){
                if(arr[i].canDeliever){
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        }

        //  选定地址
        var myAddress = {};
        this.getAddressInfo = function(){
            return myAddress;
        };
        this.setAddressInfo = function(data){
            myAddress = data;
        };
    }
}());