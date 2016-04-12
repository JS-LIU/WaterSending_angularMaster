/**
 * Created by 殿麒 on 2016/4/12.
 */
(function(){
    angular.module('myApp')
        .factory('OperateAddressService',OperateAddressService);

    function OperateAddressService(){
        var operateAddress = {
            creatPage:{}
        }
        var addressTypeArr = [{name:'普通地址',addressType:0},
            {name:'家庭地址',addressType:1},
            {name:'公司地址',addressType:2}];

        operateAddress.creatPage = function(addressType,addressInfo){
            var titleMsg = {
                operate:"",
                addressType:"",
                addressInfo:{}
            };
            for(var i = 0; i < addressTypeArr.length;i++){
                if(addressTypeArr[i].addressType == addressType){
                    titleMsg.addressType = addressTypeArr[i].name;
                }
            }
            if(arguments[1] == undefined){
                titleMsg.operate = "新建";
            }else{
                titleMsg.operate = "编辑";
                //  存储编辑地址信息
                titleMsg.addressInfo = addressInfo;
            }
            return titleMsg;
        }
        return operateAddress;
    }
}());