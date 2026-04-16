import Mock from 'mockjs'
let debug = 1;
if (debug) {
  Mock.mock(/getImageArr/, {
    code: 0,
    msg: "Success",
    data:[{
      name:'山清水秀',
      url:'http://lhjf-pr.oss-cn-zhangjiakou.aliyuncs.com/img/20260416/102218/3e3e64a3393642dfa5d08b45a219a91f.jpg'
    },{
      name:'外星文明',
      url:'http://lhjf-pr.oss-cn-zhangjiakou.aliyuncs.com/img/20260416/102251/b2a27a00d5b0417b91383a918aa8adbe.jpg'
    },{
      name:'夕阳西下',
      url:'http://lhjf-pr.oss-cn-zhangjiakou.aliyuncs.com/img/20260416/102315/8cfd8f0181b6472b8509e85f782ab2eb.jpg'
    },{
      name:'华丽都市',
      url:'http://lhjf-pr.oss-cn-zhangjiakou.aliyuncs.com/img/20260416/102335/0f569f7298d34121b3cc6a6528f2568b.jpg'
    },{
      name:'浩瀚星空',
      url:'http://lhjf-pr.oss-cn-zhangjiakou.aliyuncs.com/img/20260416/102353/adbcd428d0af45198cec51c73f17bbfd.jpg'
    }]
  })

}
