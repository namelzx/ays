import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/Led/GetDataByList',
    method: 'post',
    data: query
  })
}


export function PostDataByAdd(data) {
  return request({
    url: '/admin/Led/PostDataByAdd',
    method: 'post',
    data
  })
}


export function PostDataByUpSort(data) {
  return request({
    url: '/admin/Led/PostDataByUpSort',
    method: 'post',
    data
  })
}


export function GetIdByDelete(data) {
  return request({
    url: '/admin/Led/GetIdByDelete',
    method: 'post',
    data
  })
}

/**
 * 通用分类
 */


export function GetDataByAll(query) {
  return request({
    url: '/admin/Led/GetDataByAll',
    method: 'post',
    data: query
  })
}



export function GetLedByTree() {
  return request({
    url: '/admin/Led/GetLedByTree',
    method: 'get',
  })
}
