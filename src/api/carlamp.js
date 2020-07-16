import request from '@/utils/request'

export function GetModelIdByInfo(query) {
    return request({
        url: '/admin/CarLamp/GetModelIdByInfo',
        method: 'get',
        params: {model_id},
    })
}


export function PostDataBySave(data) {
    return request({
        url: '/admin/CarLamp/PostDataBySave',
        method: 'post',
        data
    })
}


export function importCarLamp(data) {
    return request({
        url: '/admin/CarLamp/importCarLamp',
        method: 'post',
        data
    })
}



export function GetCarlampInfo(model_id) {
    return request({
        url: '/admin/CarLamp/GetCarlampInfo',
        method: 'get',
        params:{model_id}
    })
}




