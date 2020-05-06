import request from '@/utils/request'

export function CarBrand() {
  return request({
    url: '/tools/CarTools/CarBrand',
    method: 'get',
  })
}


export function getBrand() {
  return request({
    url: '/tools/CarTools/getBrand',
    method: 'get',
  })
}



export function getSeries(brand_id) {
  return request({
    url: '/tools/CarTools/getSeries',
    method: 'get',
    params: {brand_id}
  })
}



export function getModel(series_id) {
  return request({
    url: '/tools/CarTools/getModel',
    method: 'get',
    params: {series_id}
  })
}





