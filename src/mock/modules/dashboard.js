import Mock from 'mockjs'
let debug = 1;
if (debug) {
  Mock.mock(/getImageArr/, {
    code: 0,
    msg: "Success",
    data:[{
      name:'山清水秀',
      url:'https://s1.ax1x.com/2020/09/11/wtunxK.jpg'
    },{
      name:'外星文明',
      url:'https://s1.ax1x.com/2020/09/11/wtum26.jpg'
    },{
      name:'夕阳西下',
      url:'https://s1.ax1x.com/2020/09/11/wtnOEj.jpg'
    },{
      name:'华丽都市',
      url:'https://s1.ax1x.com/2020/09/11/wtZj4x.jpg'
    },{
      name:'浩瀚星空',
      url:'https://s1.ax1x.com/2020/09/11/wtZxC6.jpg'
    }]
  })

}
