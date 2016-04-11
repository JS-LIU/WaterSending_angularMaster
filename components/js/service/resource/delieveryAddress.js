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
        this.getDefnAddress = function(obj){
            return DelieveryAddressResource.save(
                {operate:'showDefaultAddress'},
                obj
            ).$promise;
        }

        this.getAddressList = function(obj){
            return DelieveryAddressResource.post(
                {operate:'show'},
                obj
            ).$promise;
        }

        this.getSpeAddress = function(arr,condition){
            var speAddress;
            for(var i = arr.length - 1 ; i >= 0 ;i--){
                if(arr[i].addressType == condition){
                    speAddress = arr[i];
                }else if(arr[i].addressType == condition && arr[i].isDefault == 1){
                    speAddress = arr[i];
                    return speAddress;
                }
            }
        }
    }
}());