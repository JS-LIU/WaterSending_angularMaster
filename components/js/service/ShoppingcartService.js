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


    function ShoppingCartService(ShoppingCartResource,WaterTicketsService){
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
            setWaterTicket:{},
            getWaterTicket:{},
            increaseNum:{},
            decreaseNum:{},
            money:{},
            item:{},
            save:{},
            getShoppingCart:{},
            setShoppingCart:{}
        };

        shoppingCart.showShoppingCartList = function(obj){
            return ShoppingCartResource.save(
                {operate:'list'},
                obj
            ).$promise;
        };
        shoppingCart.putInShoppingCart = function(obj){
            return ShoppingCartResource.save(
                {operate:'new'},
                obj
            ).$promise;
        };

        shoppingCart.deleteGoods.topost = function(obj){
            return ShoppingCartResource.save(
                {operate:'delete'},
                obj
            ).$promise;
        };

        //  整理数组
        shoppingCart.fixedGoodsList = function(arr){
            var obj = {
                itemList:arr,
                isChecked:false,
                price:0
            };

            for(var i = 0,len = arr.length;i < len;i++){
                arr[i].isChecked = false;
                arr[i].isDeleted = false;
                arr[i].price = arr[i].price || 0;
                if(arr[i].itemList){
                    arguments.callee(arr[i].itemList);
                }
            }
            return obj;
        };
        //  自己选择状态
        shoppingCart.checked.selfChecked = function(obj){
            obj.isChecked = !obj.isChecked;
            return obj;
        };

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
        };
        //  父选择状态
        shoppingCart.checked.parentChecked = function(parentObj,childName){

            var arr = parentObj[childName];

            if(arr){
                var newArr = getNoDeletedArr(arr);
                for(var j = 0,nlen = newArr.length;j < nlen;j++){
                    if(newArr[j].isChecked){
                        if(j == (nlen - 1)){
                            parentObj.isChecked = true;
                        }
                    }else{
                        parentObj.isChecked = false;
                        return false;
                    }
                }
            }
        };
        function getNoDeletedArr(arr){
            var newArr = [];
            for(var i = 0,len = arr.length;i < len;i++){
                if(!arr[i].isDeleted){
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        }
        //  增加
        shoppingCart.increaseNum = function(parentsObj,parentObj,selfObj,key){
            selfObj[key]++;

            if(selfObj.isChecked){
                parentObj.price += selfObj.price;
                parentsObj.price += selfObj.price;
            }
            return selfObj;
        };

        //  减少
        shoppingCart.decreaseNum = function(parentsObj,parentObj,selfObj,key){
            if(selfObj[key] > 1){
                selfObj[key]--;
                if(selfObj.isChecked){
                    parentObj.price -= selfObj.price;
                    parentsObj.price -= selfObj.price;
                }
            }
            return selfObj;
        };

        //  计算
        shoppingCart.money.calc = function(parentObj,selfObj,childName){
            var ctrl = 1;
            if(!selfObj.isChecked){
                ctrl = -1;
            }
            if(selfObj[childName]){
                var child = selfObj[childName];
                if(!selfObj.isChecked || selfObj.isDeleted){
                    ctrl = 0;
                }
                //  价格
                selfObj.price = 0;
                for(var i = 0,len = child.length;i < len;i++){

                    if(child[i][childName]){
                        arguments.callee(selfObj,child[i],childName);
                    }
                    if(!child[i].isDeleted){
                        var childM = child[i].price * child[i].num||1;
                        selfObj.price += (ctrl * childM);
                    }
                }
            }else{
                var childM = selfObj.price * selfObj.num||1;
                parentObj.price += (ctrl * childM);
            };
        };

        shoppingCart.money.totleMoney = function(obj,childName){
            var totleMoney = 0;
            for(var i = 0,len = obj[childName].length;i < len;i++){
                if(!obj[childName][i].isDeleted){
                    totleMoney += (obj[childName][i].price);
                }
            }
            obj.price = totleMoney;
        };

        //  删除
        shoppingCart.deleteGoods.toshow = function(parent,selfSiblings,self,parents){
            self.isDeleted = true;
            if(self.isChecked){
                parent.price -= (self.price * self.num);
                parents.price -= (self.price * self.num);
            }
            for(var i = 0,len = selfSiblings.length;i < len; i++){

                if(selfSiblings[i].isDeleted){
                    if(i == len - 1){
                        parent.isDeleted = true;
                    }
                }else{
                    return false;
                }
            }
        };


        shoppingCart.getShopItem = function(shopCartList){
            var newlist = [];
            for(var i = 0,len = shopCartList.length;i < len;i++){
                if(!shopCartList[i].isDeleted){
                    var productItem = shopCartList[i].itemList;
                    var productList = [];
                    for(var j = 0,plen = productItem.length;j < plen;j++){
                        if(!productItem[j].isDeleted &&productItem[j].isChecked){
                            delete productItem[j].isChecked;
                            delete productItem[j].isDeleted;
                            productItem[j].num += (productItem[j].giveCount||0);
                            productList.push(productItem[j]);
                        }
                        if(j == plen - 1 && productList.length > 0){
                            shopCartList[i].itemList = productList;
                            delete shopCartList[i].isChecked;
                            delete shopCartList[i].isDeleted;
                            shopCartList[i].smallMoney = shopCartList[i].price;
                            delete shopCartList[i].price;
                            newlist.push(shopCartList[i]);
                        }
                    }
                }
            }
            console.log(newlist);
            return newlist;
        };

        var waterTicketInfo = {};
        shoppingCart.setWaterTicket = function(data){
            data.isChange = true;
            waterTicketInfo = data;
            return waterTicketInfo;
        };
        shoppingCart.getWaterTicket = function(shopCartList,waterTicketInfo){
            var waterTicketInfo = waterTicketInfo;
            var waterTicketInfoPreferential = WaterTicketsService.getSpeDiscontWay(waterTicketInfo.preferentialStrategyModels);
            if(waterTicketInfoPreferential){
                for(var i = 0;i < shopCartList.itemList.length;i++){
                    for(var j = 0;j < shopCartList.itemList[i].itemList.length;j++){
                        if(shopCartList.itemList[i].itemList[j].isChange){
                            delete shopCartList.itemList[i].itemList[j].isChange;
                            var dif = waterTicketInfoPreferential.requireCount - shopCartList.itemList[i].itemList[j].num;
                            shopCartList.itemList[i].itemList[j].num = waterTicketInfoPreferential.requireCount;
                            shopCartList.itemList[i].itemList[j].giveCount = waterTicketInfoPreferential.giveCount;
                            shopCartList.itemList[i].itemList[j].preferentialId = waterTicketInfoPreferential.id;
                            if(shopCartList.itemList[i].itemList[j].isChecked){
                                shopCartList.itemList[i].price += (dif*shopCartList.itemList[i].itemList[j].price);
                                shopCartList.price += (dif*shopCartList.itemList[i].itemList[j].price);
                            }
                        }
                    }
                }
            }
        };
        var shoppingCartObj = {};
        shoppingCart.getShoppingCart = function(){
            return shoppingCartObj;
        };

        shoppingCart.setShoppingCart = function(data){
            shoppingCartObj = data;
        };

        return shoppingCart;
    }
}());