var app = getApp()
Page({
    data: {
            score: [{Subject:'高数',Fraction: '90',color:'fraction1'}, //#4496DC优秀fraction1
                    {Subject:'数据结构',Fraction: '80',color:'fraction2'},//#95BE81良好fraction2
                    {Subject:'大学英语',Fraction: '70',color:'fraction3'},//#D9E075中等fraction3
                    {Subject:'数字电路',Fraction: '60',color:'fraction4'},//#F8CC77及格fraction4
                    {Subject:'数据库',Fraction: '50',color:'fraction5'}],//#E81123不及格fraction5
            array: ['2016-2017-1', '2015-2016-2', '2015-2016-1', '2014-2015-2'],
            objectArray: [
              {id: 0,name: '2016-2017-1'},
              {id: 1,name: '2015-2016-2'},
              {id: 2,name: '2015-2016-1'},
              {id: 3,name: '2014-2015-2'}],
            index: 0
        },
    bindPickerChange: function(e) {
        console.log("66"+e.detail.value+"22");
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
        if (e.detail.value == 2) {
            var cData=this.data.score;
            cData=[];//先修改json值
            this.setData({
            score: cData
        })
        }/*else{
            var cData=this.data.score;
            cData = [{Subject:'高数',Fraction: '90',color:'fraction1'}, //#4496DC优秀fraction1
                    {Subject:'数据结构',Fraction: '80',color:'fraction2'},//#95BE81良好fraction2
                    {Subject:'大学英语',Fraction: '70',color:'fraction3'},//#D9E075中等fraction3
                    {Subject:'数字电路',Fraction: '60',color:'fraction4'},//#F8CC77及格fraction4
                    {Subject:'数据库',Fraction: '50',color:'fraction5'}];//先修改json值
            this.setData({
            score: cData
        })
        }*/
    }/*,
    toIndex : function(){
        wx.switchTab({
            url: '../index/index'
        })
    }*/

})


