import Mock from "mockjs";
import qs from "qs";
let debug = 1;
if (debug) {
  Mock.mock(/getTableData/, options => {
    // console.log(options);
    // {url: "api/v1/getTableData?currentPage=1&pageSize=10", type: "GET", body: null}
    // 提取请求参数
    let params = qs.parse(options.url.split("?")[1]);
    return Mock.mock({
      code: 0,
      msg: "Success",
      data: {
        total: 100,
        currentPage: Number(params.currentPage),
        pageSize: Number(params.pageSize),
        "data|10": [
          {
            id: "@increment",
            name: "@cname",
            hero: "@pick(['甄姬','后裔','蔡文姬'])",
            date: "@date",
            province: "@province",
            city: "@city",
            address: "@csentence",
            type: "@pick(['法师','射手','辅助'])"
          }
        ]
      }
    });
  });
}
