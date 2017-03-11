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
            index: 0,
            alert: "该阶段没有成绩！请重新选择年份！"
        },
    onLoad: function  (options) {
        var that = this//接下来如果接着用this会有歧义，所以先转换成that
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
          //更新数据
          that.setData({
            userInfo:userInfo
          })
        })
        console.log('onLoad score...')
        wx.request({
          url: 'https://www.xiedashuaige.cn/weiccsu/GradeServlet.php',
          data: {index : that.data.index, score : that.data.score},
          method: 'GET',
          success: function(res){
            console.log(res.data.score.result)
            that.setData({
              //Industry:res.data.result
            })
          },
          fail: function() {
            var cData = that.data.alert
            cData = "连接服务器失败,请稍后再试!"
            that.setData({
                alert: cData
            })
          }
        })
    },
    bindPickerChange: function(e) {
        var that = this
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
        wx.request({
          url: 'https://www.xiedashuaige.cn/weiccsu/GradeServlet.php',
          data: {index : that.data.index, score : that.data.score},
          method: 'GET',
          success: function(res){
            console.log(res.data.score.result)
            that.setData({
              //Industry:res.data.result
            })
          },
          fail: function() {
            var cData = that.data.alert
            cData = "连接服务器失败,请稍后再试!"
            that.setData({
                alert: cData
            })
          }
        })
        //更改了picker的选择所以还要ajax一下
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


