import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/Login/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/admin/getuser',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/admin/logout',
    method: 'post'
  })
}
