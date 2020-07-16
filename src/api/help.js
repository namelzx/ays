
import request from '@/utils/request'

export function GetDataByList(query) {
    return request({
        url: '/admin/help/GetDataByList',
        method: 'post',
        data: query
    })
}


export function PostDataByAdd(data) {
    return request({
        url: '/admin/help/PostDataByAdd',
        method: 'post',
        data
    })
}


export function updateStatus(data) {
    return request({
        url: '/admin/help/updateStatus',
        method: 'post',
        data
    })
}




export function deleteHomeAdvertise(data) {
    return request({
        url: '/admin/help/GetIdByDelete',
        method: 'post',
        data
    })
}


export function getBanner(id) {
    return request({
        url: '/admin/help/getBanner',
        method: 'post',
        params:{id}
    })
}


