import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/ShopGroup/GetDataByList',
    method: 'post',
    data: query
  })
}

export function PostDataByAdd(data) {
  return request({
    url: '/admin/ShopGroup/PostDataByAdd',
    method: 'post',
    data
  })
}

/**
 * 更新门店组
 * @param data
 * @constructor
 */
export function PostDataByAddShop(data) {
  return request({
    url: '/admin/ShopGroup/PostDataByAddShop',
    method: 'post',
    data
  })
}

export function GetShopByVal(val) {
  return request({
    url: '/admin/ShopGroup/GetShopByVal',
    method: 'get',
    params: { val }
  })
}

export function GetDataShopByList(query) {
  return request({
    url: '/admin/ShopGroup/GetDataShopByList',
    method: 'get',
    params: query
  })
}

export function GetGroupByList(val) {
  return request({
    url: '/admin/ShopGroup/GetGroupByList',
    method: 'get',
    params: { val }
  })
}

export function PostDataByUpSort(data) {
  return request({
    url: '/admin/ShopGroup/PostDataByUpSort',
    method: 'post',
    data
  })
}

export function GetIdByDelete(data) {
  return request({
    url: '/admin/ShopGroup/GetIdByDelete',
    method: 'post',
    data
  })
}

/**
 * 通用分类
 */


export function GetDataByAll(query) {
  return request({
    url: '/admin/ShopGroup/GetDataByAll',
    method: 'post',
    data: query
  })
}

export function GetecshopByList() {
  return request({
    url: '/admin/ShopGroup/GetecshopByList',
    method: 'get'
  })
}

