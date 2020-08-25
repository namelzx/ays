import request from '@/utils/request'

export function GetcouponByList(query) {
  return request({
    url: '/admin/Platformcoupon/GetDataByList',
    method: 'get',
    params: query
  })
}

export function PostDataByAdd(data) {
  return request({
    url: '/admin/Platformcoupon/PostDataByAdd',
    method: 'post',
    data
  })
}


export function GetCouponByAll(query) {
  return request({
    url: '/admin/Platformcoupon/GetCouponByAll',
    method: 'post',
    query
  })
}


export function PostShopCouponByData(data) {
  return request({
    url: '/admin/Platformcoupon/PostShopCouponByData',
    method: 'post',
    data
  })
}




export function GetIdByDelete(id) {
  return request({
    url: '/admin/Platformcoupon/GetIdByDelete',
    method: 'get',
    params: { id }
  })
}

export function GetSenlogByList(query) {
  return request({
    url: '/admin/Platformcoupon/GetSenlogByList',
    method: 'get',
    params: query
  })
}




