var app = getApp()

Page({
  data: {
    day_data:[
      {subjectName:"",location:"",teacher:""},
      {subjectName:"",location:"",teacher:""},
      {subjectName:"",location:"",teacher:""},
      {subjectName:"",location:"",teacher:""},
      {subjectName:"",location:"",teacher:""}
    ],
    data_arr:[
      {week1:"",week2:"",week3:"",week4:"",week5:"",week6:"",week7:""},
      {week1:"",week2:"",week3:"",week4:"",week5:"",week6:"",week7:""},
      {week1:"",week2:"",week3:"",week4:"",week5:"",week6:"",week7:""},
      {week1:"",week2:"",week3:"",week4:"",week5:"",week6:"",week7:""},
      {week1:"",week2:"",week3:"",week4:"",week5:"",week6:"",week7:""}
    ],
    scrollLeft : 0,
    scroll : [{txt:"1",background:"#60BCE5"},
          {txt:"2",background:"#60BCE5"},
          {txt:"3",background:"#60BCE5"},
          {txt:"4",background:"#60BCE5"},
          {txt:"5",background:"#60BCE5"},
          {txt:"6",background:"#60BCE5"},
          {txt:"7",background:"#60BCE5"},
          {txt:"8",background:"#60BCE5"},
          {txt:"9",background:"#60BCE5"},
          {txt:"10",background:"#60BCE5"}],
    choice : "全部课表",
    week : {"0":"星期一","1":"星期二","2":"星期三","3":"星期四","4":"星期五","5":"星期六","6":"星期日"},
    day : [{k1:"01",k2:"02"},
          {k1:"03",k2:"04"},
          {k1:"05",k2:"06"},
          {k1:"07",k2:"08"},
          {k1:"09",k2:"10"}],
    schedule : [
      {location:"涵虚楼C3603",section:"0102",subjectName:"离散数学",teacher:"朱永娇",weekStr:"1-12",weekday:"1"},
      //{location:"永康体育馆排球房",section:"0304",subjectName:"体育(4)[排球班]",teacher:"刘飞宁",weekStr:"1-17",weekday:"1"},
      {location:"永康体育馆排球房",section:"0102",subjectName:"体育(4)[排球班]",teacher:"刘飞宁",weekStr:"1-17",weekday:"1"},
      {location:"永康体育馆排球房",section:"0910",subjectName:"体育(4)[排球班]",teacher:"刘飞宁",weekStr:"1-17",weekday:"2"},
      //{location:"涵虚楼A1202",section:"0304",subjectName:"大学英语（4）[数计B3班]",teacher:"田踴",weekStr:"4,6,8,10,12,14",weekday:"2"}
    ],
    loadingHidden: true,//提示加载
    hiddenToast: true,//提示成功
    actionSheetHidden: true,//是否被隐藏
    actionSheetItems: [{bindtap:"Menu1",txt:'全部课表'},
                      {bindtap:"Menu2",txt:'今日课表'},
                      {bindtap:"Menu3",txt:'明日课表'},
                      {bindtap:"Menu4",txt:'本周课表'},
                      {bindtap:"Menu5",txt:'下周课表'},
                      {bindtap:"Menu6",txt:'更新课表'}]
  },
  //六个菜单的触发的函数
  listenerMenu1: function () {
      console.log("触发了！！");
      this.setData({
          actionSheetHidden: "ture"
      })
      this.setData({
         choice : "全部课表"
      })
  },
  listenerMenu2: function () {
      this.setData({
          actionSheetHidden: "ture"
      })
      this.setData({
         choice : "今日课表"
      })
  },
  listenerMenu3: function () {
      console.log("触发了！!");
      this.setData({
          actionSheetHidden: "ture"
      })
      this.setData({
         choice : "明日课表"
      })
  },
  listenerMenu4: function () {
      console.log("触发了！!");
      this.setData({
          actionSheetHidden: "ture"
      })
      this.setData({
         choice : "本周课表"
      })
      this.setData({
         'scroll[3].background' : '#1685a9'
      })
      this.setData({
         'scrollLeft':(4-3)*55
      })
  },
  listenerMenu5: function () {
      console.log("触发了！!");
      this.setData({
          actionSheetHidden: "ture"
      })
      this.setData({
         choice : "下周课表"
      })
  },
  listenerMenu6: function () {
      console.log("触发了！!");
      this.setData({
          actionSheetHidden: "ture"
      })
      //更新课表加载
      this.setData({
        loadingHidden: false
      });
      var that = this;
      setTimeout(function(){
        //加载图标
        that.setData({
            loadingHidden: true
        })
        //更新成功图标
        that.setData({
            hiddenToast: !that.data.hiddenToast
        })
        that.update();
      }, 1500);

      this.setData({
         choice : "全部课表"
      })
  },
  //课表更新成功后继续影藏
  toastHidden:function(){
      this.setData({
          hiddenToast: true
      })
  },
  //点击打开选择栏
  listenerButton: function() {
      this.setData({
        //取反
          actionSheetHidden: !this.data.actionSheetHidden
      });
  },
//点击取消触发事件，不返回值
  listenerActionSheet:function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  onLoad :function() {
    console.log("onload timetable...");
    var that = this//接下来如果接着用this会有歧义，所以先转换成that
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo){
          //更新数据
          that.setData({
            userInfo:userInfo
          })
        })
        //页面加载，这里直接向服务器发送一个请求，获得全部课表的数据
        /*
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
        })*/
        //对每周的数据的处理先写在这里
        var data = new Array();  //先声明一维
        for(var k=0;k<5;k++){    //一维长度为i,i为变量，可以根据实际情况改变
        data[k]=new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；
        for(var j=0;j<7;j++){   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
        data[k][j]="";    //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
         }
        }
        for(var i=0;i<5;i++){//遍历day
          for(var j=0;j<7;j++){//遍历week
            for(var k=0;k<3;k++){//遍历schedule
              if(that.data.schedule[k].section==(that.data.day[i].k1+that.data.day[i].k2)&&that.data.schedule[k].weekday==j+1){
                //console.log(that.data.schedule[k].section+"+++"+that.data.schedule[k].weekday);
                data[i][j] = that.data.schedule[k].subjectName+" "+that.data.schedule[k].teacher+" "+that.data.schedule[k].weekStr+"周"+" "+that.data.schedule[k].location
                //这里赋值的时候不能有ij不知道怎么搞
                var param = {};
                var string = "data_arr["+i+"]["+j+"]";
                param[string] = data[i][j];
                that.setData(param);
                }
                //console.log("66"+that.data.data_arr[0][0]+"66");
              }
            }
          }
        //对每日的数据处理就先这在这里
        for(var i=0;i<3;i++){//遍历schedule
          if(that.data.schedule[i].section=="0102"){
            that.setData({
              "day_data[0].subjectName":that.data.schedule[i].subjectName
            })
            that.setData({
              "day_data[0].teacher":that.data.schedule[i].teacher
            })
            that.setData({
              "day_data[0].location":that.data.schedule[i].location
            })
          }else if(that.data.schedule[i].section=="0304"){
            that.setData({
              "day_data[1].subjectName":that.data.schedule[i].subjectName
            })
            that.setData({
              "day_data[1].teacher":that.data.schedule[i].teacher
            })
            that.setData({
              "day_data[1].location":that.data.schedule[i].location
            })
          }if(that.data.schedule[i].section=="0506"){
            that.setData({
              "day_data[2].subjectName":that.data.schedule[i].subjectName
            })
            that.setData({
              "day_data[2].teacher":that.data.schedule[i].teacher
            })
            that.setData({
              "day_data[2].location":that.data.schedule[i].location
            })
          }else if(that.data.schedule[i].section=="0708"){
            that.setData({
              "day_data[3].subjectName":that.data.schedule[i].subjectName
            })
            that.setData({
              "day_data[3].teacher":that.data.schedule[i].teacher
            })
            that.setData({
              "day_data[3].location":that.data.schedule[i].location
            })
          }else{
            that.setData({
              "day_data[4].subjectName":that.data.schedule[i].subjectName
            })
            that.setData({
              "day_data[4].teacher":that.data.schedule[i].teacher
            })
            that.setData({
              "day_data[4].location":that.data.schedule[i].location
            })
          }
        }
        console.log(that.data.day_data);
  }
})
/*
location:"涵虚楼C3603"!!!!!
section:"0102"
subjectName:"离散数学"!!!!!
teacher:"朱永娇"!!!!!!!!!!!
 */


/*
location:"涵虚楼C3603"!!!!!
section:"0102"
subjectName:"离散数学"!!!!!
teacher:"朱永娇"!!!!!!!!!!!
weekStr:"1-12"
weekday:"1"//周几
*/
//写一个ajax的额模版到时候直接套用就好了，根据one里面的

//换行符不起作用,,在每周课表的时候，应该有的地方要换行但是没有换

//如果点击了每一周的数字，都要触发一个函数，而且最上面的标题也要改
//点击了那一周的课表后在点别的颜色要变回来
//后面还需要提供一个当前第几周的数据
//点击了本周下周课表scroll要跳到相应位置
//把加载的界面写一下吧