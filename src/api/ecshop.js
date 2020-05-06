import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/Ecshopclass/GetDataByList',
    method: 'post',
    data: query
  })
}


export function PostDataByAdd(data) {
  return request({
    url: '/admin/Ecshopclass/PostDataByAdd',
    method: 'post',
    data
  })
}


export function PostDataByUpSort(data) {
  return request({
    url: '/admin/Ecshopclass/PostDataByUpSort',
    method: 'post',
    data
  })
}


export function GetIdByDelete(data) {
  return request({
    url: '/admin/Ecshopclass/GetIdByDelete',
    method: 'post',
    data
  })
}

/**
 * 通用分类
 */


export function GetDataByAll(query) {
  return request({
    url: '/admin/ProductClass/GetDataByAll',
    method: 'post',
    data: query
  })
}

export function GetecshopByList() {
  return request({
    url: '/admin/Ecshopclass/GetecshopByList',
    method: 'get',
  })
}

