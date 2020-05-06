import request from '@/utils/request'

export function Citylist() {
  return request({
    url: '/tools/CityTools/Cityadminlist',
    method: 'post',
  })
}

