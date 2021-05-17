import {request} from "@/network/request";

export function getDetail(iid) {
  return request({
    url:'/detail',
    params: {
      iid
    }
  })
}

// 实例化商品类，并导出
export class Goods {
  constructor(itemInfo, columns, service) {
    this.desc = itemInfo.title;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = service;
  }
}


