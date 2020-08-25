import request from '@/utils/request'

export function GetDataByList(data) {
    return request({
        url: '/admin/usercard/GetDataByList',
        method: 'post',
        data
    })
}

export function GetDeleteById(id) {
    return request({
        url: '/admin/usercard/GetDeleteById',
        method: 'get',
        params:{id}
    })
}




export function GetCodeByDownload(query) {
    return request({
        url: '/admin/usercard/GetDownload',
        method: 'get',
        params:query
    })
}


export function PostSaveByData(data) {
    return request({
        url: '/admin/usercard/PostSaveByData',
        method: 'post',
        data
    })
}





