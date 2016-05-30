/**
 * Created by 殿麒 on 2016/5/30.
 */
(function(){
    angular.module('myApp')
        .service('SaveUrlService',SaveUrlService);

    function SaveUrlService(){
        var url;

        this.setUrl = function(str){
            url = str;
        };
        this.getUrl = function(){
            return url;
        };

    }
}());
