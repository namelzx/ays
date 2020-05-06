import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/ProductClass/GetDataByList',
    method: 'post',
    data: query
  })
}


export function PostDataByAdd(data) {
  return request({
    url: '/admin/ProductClass/PostDataByAdd',
    method: 'post',
    data
  })
}


export function PostDataByUpSort(data) {
  return request({
    url: '/admin/ProductClass/PostDataByUpSort',
    method: 'post',
    data
  })
}


export function GetIdByDelete(data) {
  return request({
    url: '/admin/ProductClass/GetIdByDelete',
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

/**
 * 产品参数
 */


export function getList(query) {
  return request({
    url: '/admin/Product/GetDataByList',
    method: 'post',
    data: query
  })
}


export function del(id) {
  return request({
    url: '/admin/Product/GetIdByDelete',
    method: 'post',
    data: {id}
  })
}



export function PostDataPByAdd(data) {
  return request({
    url: '/admin/Product/PostDataByAdd',
    method: 'post',
    data
  })
}


//获取所有产品
export function GetProductByAll(query) {
  return request({
    url: '/admin/Product/GetDataByAll',
    method: 'post',
    data: query
  })
}

//
//
export function GetDataProductByList(query) {
  return request({
    url: '/admin/Product/GetDataByList',
    method: 'post',
    data: query
  })
}

//获取 产品树
export function GetProductByTree(query) {
  return request({
    url: '/admin/Product/GetProductByTree',
    method: 'post',
    data: query
  })
}


