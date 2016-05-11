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
            deleteGoods:{
                topost:{},
                toshow:{}
            },
            fixedGoodsList:{},
            checked:{
                selfChecked:{},
                childrenChecked:{},
                parentChecked:{}
            },
            increaseNum:{},
            decreaseNum:{},
            calcMoney:{}
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

        shoppingCart.deleteGoods.topost = function(obj){
            return ShoppingCartResource.save(
                {operate:'delete'},
                obj
            ).$promise;
            shoppingCart.deleteGoods.toshow()
        }
        shoppingCart.deleteGoods.toshow = function(parent,selfSiblings,self){
            self.isDeleted = true;
            for(var i = 0,len =selfSiblings.length;i < len; i++){
                if(parent.itemList[i].isDeleted){
                    if(i == len - 1){
                        parent.isDeleted = true;
                    }
                }
            }
        }


        //  整理数组
        shoppingCart.fixedGoodsList = function(arr){
            var obj = {
                itemList:arr,
                isChecked:false
            }

            for(var i = 0,len = arr.length;i < len;i++){
                arr[i].isChecked = false;
                arr[i].isDeleted = false;
                arr[i].price = arr[i].price || 0;
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


        //  增加
        shoppingCart.increaseNum = function(obj,key){
            obj[key]++;
            return obj;
        }

        //  减少
        shoppingCart.decreaseNum = function(obj,key){
            if(obj[key] > 1){
                obj[key]--;
            }
            return obj;
        }
        //  计算
        shoppingCart.calcMoney.sub = function(a,b){
            return a - b;
        };
        shoppingCart.calcMoney.add = function(a,b){
            return a + b;
        };
        shoppingCart.calcMoney.totleMoney = function(obj,key){
            var totleMoney = 0;
            for(var i = 0,len = obj.itemList.length;i < len;i++){
                totleMoney += (obj.itemList[i][key]*obj.itemList[i].num||1);
            }
            return totleMoney;
        }
        shoppingCart.calcMoney = function(parentObj,selfObj){
            if(selfObj.isChecked){
                shoppingCart.calcMoney.add();
            }else{
                shoppingCart.calcMoney.sub();
            }
        }


        return shoppingCart;
    }
}());