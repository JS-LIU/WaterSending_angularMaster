/**
 * Created by 殿麒 on 2016/4/5.
 */
(function(){
    angular.module('delieveryAddress',['ngResource'])
        .service('DelieveryAddressResource',DelieveryAddressResource)
        .service('DelieveryAddressService',DelieveryAddressService);

    function DelieveryAddressResource($resource){
        return $resource('delieveryAddress/:operate',{operate:'@operate'});
    }

    function DelieveryAddressService(DelieveryAddressResource){
        this.getDefnAddress = function(obj){
            return DelieveryAddressResource.save(
                {operate:'showDefaultAddress'},
                obj
            ).$promise;
        }
    }
}());