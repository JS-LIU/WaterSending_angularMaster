/**
 * Created by 殿麒 on 2016/4/29.
 */
(function(){
    angular.module('shoppingCartModule',['ngResource'])
        .service('ShoppingCartResource',ShoppingCartResource)
        .factory('ShoppingCartService',ShoppingCartService);

    function ShoppingCartResource($resource){
        return $resource('shoppingcart/:operate',
            {operate:'@operate'});
    }


    function ShoppingCartService(ShoppingCartResource){
        var shoppingCart = {
            putInShoppingCart:{},
            showShoppingCartList:{},
            fixedGoodsList:{},
            checked:{
                selfChecked:{},
                childrenChecked:{},
                parentChecked:{}
            }
        }

        shoppingCart.showShoppingCartList = function(obj){
            return ShoppingCartResource.save(
                {operate:'list'},
                obj
            ).$promise;
        }
        shoppingCart.putInShoppingCart = function(obj){
            return ShoppingCartResource.save(
                {operate:'new'},
                obj
            ).$promise;
        }

        //  整理数组
        shoppingCart.fixedGoodsList = function(arr){
            var obj = {
                itemList:arr,
                isChecked:false
            }

            for(var i = 0,len = arr.length;i < len;i++){
                arr[i].isChecked = false;
                if(arr[i].itemList){
                    arguments.callee(arr[i].itemList);
                }
            }
            return obj;
        }
        //  自己选择状态
        shoppingCart.checked.selfChecked = function(obj){
            obj.isChecked = !obj.isChecked;
            return obj;
        }

        //  子孙状态(随父状态)
        shoppingCart.checked.childrenChecked = function(obj,childName){
            if(obj[childName]){
                for(var i = 0,len = obj[childName].length;i < len;i++){
                    obj[childName][i].isChecked = obj.isChecked;
                    if(obj[childName][i][childName]){
                        console.log(obj[childName][i][childName]);
                        arguments.callee(obj[childName][i],childName);
                    }
                }
            }
            return obj;
        }
        //  父选择状态
        shoppingCart.checked.parentChecked = function(parentObj,childName){

            var arr = parentObj[childName];
            if(arr){
                for(var i = 0,len = arr.length;i < len;i++){
                    if(arr[i].isChecked){
                        if(i == len - 1){
                            parentObj.isChecked = true;
                        }
                    }else{
                        parentObj.isChecked = false;
                        return false;
                    }
                }
            }
        }

        return shoppingCart;
    }
}());