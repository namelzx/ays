import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/Marketing/GetDataByList',
    method: 'get',
    params: query
  })
}


export function PostStatusByData(query) {
  return request({
    url: '/admin/Marketing/PostStatusByData',
    method: 'post',
    params: query
  })
}


//门店需求列表
export function GetDataByShopDemanList(query) {
  return request({
    url: '/admin/Shopdemand/GetDataByShopDemanList',
    method: 'get',
    params: query
  })
}

export function PostDataByShopDemanUpdate(id) {
  return request({
    url: '/admin/Shopdemand/PostDataByUpdate',
    method: 'get',
    params: {
      id
    }
  })
}
