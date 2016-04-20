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
        }

        //  获取收获地址列表
        this.getAddressList = function(obj){
            return DelieveryAddressResource.post(
                {operate:'show'},
                obj
            ).$promise;
        }
        //  整理收货地址列表为可用数据
        this.trimAddressList = function(data){
            for(var i = 0,len = data.length;i < len; i++){

                var speAddress = [
                    {
                        addressId:"",
                        phone_num:"",
                        recieve_name:"",
                        position_x:"",
                        position_y:"",
                        provinceId:"",
                        cityId:"",
                        fullAddress:"",
                        canDeliever:"",
                        addressType:"1",
                        isDefault:0,
                        isHome:true,
                        title:"家庭地址"
                    },{
                        addressId:"",
                        phone_num:"",
                        recieve_name:"",
                        position_x:"",
                        position_y:"",
                        provinceId:"",
                        cityId:"",
                        fullAddress:"",
                        canDeliever:"",
                        addressType:"2",
                        isDefault:0,
                        isCompany:true,
                        title:"公司地址"
                    }];
                var commonAddress = [];
                //  家庭地址使用家庭地址图标 并显示家庭地址文字
                if(data[i].addressType == 1){
                    data[i].isHome = true;
                    speAddress[0] = data[i];
                }else if(data[i].addressType == 2){
                    data[i].isCompany = true;
                    speAddress[1] = data[i];
                }else{
                    data[i].isCommon = true;
                    commonAddress.push(data[i]);
                }
            }
            var newdata = speAddress.concat(commonAddress);
            return newdata;
        }
        //  新增收货地址
        this.newAddress = function(obj){
            return DelieveryAddressResource.post(
                {operate:'new'},
                obj
            ).$promise;
        }

        //  编辑收货地址
        this.editAddress = function(obj){
            return DelieveryAddressResource.post(
                {operate:'edit'},
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