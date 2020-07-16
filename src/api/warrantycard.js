import request from '@/utils/request'

export function PostDataByAdd(data) {
    return request({
        url: '/admin/warrantycard/PostDataByAdd',
        method: 'post',
        data
    })
}

export function GetDataByList(data) {
    return request({
        url: '/admin/warrantycard/GetDataByList',
        method: 'post',
        data
    })
}



export function GetIdByDetele(id) {
    return request({
        url: '/admin/warrantycard/GetIdByDetele',
        method: 'get',
        params: { id }
    })
}




export function GetWarrantyByCode(query) {
    return request({
        url: '/admin/warrantycard/GetWarrantyByCode',
        method: 'get',
        params: query
    })
}


export function GetIdByDeleteCode(id) {
    return request({
        url: '/admin/warrantycard/GetIdByDeleteCode',
        method: 'get',
        params: {id}
    })
}


export function GetUdByDelete(id) {
    return request({
        url: '/admin/warrantycard/GetUdByDelete',
        method: 'get',
        params: {id}
    })
}


export function GetCodeByDownload(id) {
    return request({
        url: '/admin/warrantycard/GetCodeByDownload',
        method: 'get',
        params: {id}
    })
}




