import request from '@/utils/request'

export function GetBrandByList() {
  return request({
    url: '/admin/car/GetBrandByList',
    method: 'post',
  })
}


export function GetSeriesByList(brand_id) {
  return request({
    url: '/admin/car/GetSeriesByList',
    method: 'get',
    params:{brand_id}
  })
}


export function GetModelByList(series_id) {
  return request({
    url: '/admin/car/GetModelByList',
    method: 'get',
    params:{series_id}
  })
}



