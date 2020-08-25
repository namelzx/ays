import request from '@/utils/request'

export function GetCancelCodeByData(query) {
    return request({
        url: '/admin/Cancelcoupon/GetCancelCodeByData',
        method: 'get',
        params:query
    })
}

export function PostDataByCancel(data) {
    return request({
        url: '/admin/Cancelcoupon/PostDataByCancel',
        method: 'post',
        data
    })
}



export function GetItemByData(query) {
    return request({
        url: '/admin/Cancelcoupon/GetItemByData',
        method: 'get',
        params:query
    })
}



