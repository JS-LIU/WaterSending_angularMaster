/**
 * Created by 殿麒 on 2016/1/27.
 */

purchase.service('TimePayWay',TimePayWay);
function TimePayWay(){

}
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
