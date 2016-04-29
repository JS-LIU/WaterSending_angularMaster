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
            showShoppingCartList:{}

        }
        shoppingCart.showShoppingCartList = function(obj){
            return ShoppingCartResource.save(
                {operate:'list'},
                obj
            );
        }
        shoppingCart.putInShoppingCart = function(obj){
            return ShoppingCartResource.save(
                {operate:'new'},
                obj
            );
        }

        return shoppingCart;
    }
}());