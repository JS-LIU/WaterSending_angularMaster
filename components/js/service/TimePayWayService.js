/**
 * Created by 殿麒 on 2016/1/27.
 */

(function(){
    angular.module('myApp')
        .service('SendTime',SendTime);
    function SendTime(){
        this.data = new Date();

    };

    SendTime.prototype.getTimeArr = function(){
        var initH = this.data.getHours();
        var endH = 24;
        var initM = this.data.getMinutes();
        var endM = 60;
        var timeObj = {
            honrArr:[],
            minArr:[]
        };
        for(var prop in timeObj){

        }
        for(var i = initH;i < endH;i++){
            timeArr.push(i);
        }
        return timeArr;
    };


}());
purchase.service('TimePayWay',TimePayWay);
function TimePayWay(){};
TimePayWay.prototype.option = function(arr,id){
    var optionArr = [];

    for(var i = 0;i < arr.length;i++){
        var obj = {
            opt: arr[i],
            id: id[i]
        }

        optionArr.push(obj);
    }
    return optionArr;
}
TimePayWay.prototype.setTimeArr = function(init,end){
    var timeArr = [];
    for(var i = init;i <= end;i++){
        timeArr.push(i);
    }
    return timeArr;
}
