import request from '@/utils/request'

export function GetHomeByData() {
  return request({
    url: '/admin/Home/GetHomeByData',
    method: 'get',
  })
}

