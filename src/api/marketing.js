import request from '@/utils/request'

export function GetDataBylist(query) {
  return request({
    url: '/admin/Ordervideo/GetDataBylist',
    method: 'get',
    params: query
  })
}


export function PostDataByUpdate(query) {
  return request({
    url: '/admin/Ordervideo/PostDataByUpdate',
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
