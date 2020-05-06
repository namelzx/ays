import request from '@/utils/request'

export function PostDataByAdd(data) {
  return request({
    url: '/admin/stock/PostDataByAdd',
    method: 'post',
    data
  })
}

export function GetDataByList(data) {
  return request({
    url: '/admin/stock/GetDataByList',
    method: 'post',
    data
  })
}

export function GetIdByDetele(id) {
  return request({
    url: '/admin/stock/GetIdByDetele',
    method: 'get',
    params: { id }
  })
}


