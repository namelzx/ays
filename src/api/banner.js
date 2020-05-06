
import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/banner/GetDataByList',
    method: 'post',
    data: query
  })
}


export function PostDataByAdd(data) {
  return request({
    url: '/admin/banner/PostDataByAdd',
    method: 'post',
    data
  })
}


export function updateStatus(data) {
  return request({
    url: '/admin/banner/updateStatus',
    method: 'post',
    data
  })
}




export function deleteHomeAdvertise(data) {
  return request({
    url: '/admin/banner/GetIdByDelete',
    method: 'post',
     data
  })
}


export function getBanner(id) {
  return request({
    url: '/admin/banner/getBanner',
    method: 'post',
    params:{id}
  })
}


