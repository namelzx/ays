import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/PayOrder/GetDataByList',
    method: 'get',
    params: query
  })
}

export function GetIdByOrderLog(id) {
  return request({
    url: '/admin/PayOrder/GetIdByOrderLog',
    method: 'get',
    params: { id }
  })
}

export function PostDataByAdd(data) {
  return request({
    url: '/admin/PayOrder/PostDataByAdd',
    method: 'post',
    data
  })
}

export function PostNoteByAdd(data) {
  return request({
    url: '/admin/PayOrder/PostNoteByAdd',
    method: 'post',
    data
  })
}

//回访售后添加
export function PostDataBySale(data) {
  return request({
    url: '/admin/PayOrder/PostDataBySale',
    method: 'post',
    data
  })
}

//退货
export function PostReturnedByAdd(data) {
  return request({
    url: '/admin/PayOrder/PostReturnedByAdd',
    method: 'post',
    data
  })
}

//获取售后数据

export function GetTypeBySale(query) {
  return request({
    url: '/admin/PayOrder/GetTypeBySale',
    method: 'get',
    params: query
  })
}

export function del(id) {
  return request({
    url: '/admin/PayOrder/GetIdByDelete',
    method: 'get',
    params: { id }
  })
}



export function GetIdBydetails(id) {
  return request({
    url: '/admin/PayOrder/GetIdBydetails',
    method: 'get',
    params: { id }
  })
}



export function GetQueryBydownload(query) {
  return request({
    url: '/admin/PayOrder/GetQueryBydownload',
    method: 'get',
    params: query
  })
}


export function AddPayOrderLog(data) {
  return request({
    url: '/admin/PayOrder/AddPayOrderLog',
    method: 'post',
    data
  })
}




export function GetIdByinstaOrderLog(id) {
  return request({
    url: '/admin/Order/GetIdByOrderLog',
    method: 'get',
    params: { id }
  })
}











