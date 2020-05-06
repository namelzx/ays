import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/Serviceclass/GetDataByList',
    method: 'post',
    data: query
  })
}


export function PostDataByAdd(data) {
  return request({
    url: '/admin/Serviceclass/PostDataByAdd',
    method: 'post',
    data
  })
}


export function PostDataByUpSort(data) {
  return request({
    url: '/admin/Serviceclass/PostDataByUpSort',
    method: 'post',
    data
  })
}


export function GetIdByDelete(data) {
  return request({
    url: '/admin/Serviceclass/GetIdByDelete',
    method: 'post',
    data
  })
}

/**
 * 通用分类
 */


export function GetDataByAll(query) {
  return request({
    url: '/admin/Serviceclass/GetDataByAll',
    method: 'post',
    data: query
  })
}
