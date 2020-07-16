import request from '@/utils/request'

export function GetHomeByData(day) {
    return request({
        url: '/admin/Home/GetHomeByData',
        method: 'get',
        params: {day}
    })
}


export function GetTop(query) {
    return request({
        url: '/admin/Home/GetTop',
        method: 'get',
        params: query
    })
}


export function getEnvByList(query) {
    return request({
        url: '/admin/Home/getEnvByList',
        method: 'get',
        params: query
    })
}


export function GetOrderByservice(query) {
    return request({
        url: '/admin/Home/GetOrderByservice',
        method: 'get',
        params: query
    })
}


export function GetOrderByShop(query) {
    return request({
        url: '/admin/Home/GetOrderByShop',
        method: 'get',
        params: query
    })
}


export function GetOrderByServer(query) {
    return request({
        url: '/admin/Home/GetOrderByServer',
        method: 'get',
        params: query
    })
}


export function GetShopByList(query) {
    return request({
        url: '/admin/Home/GetShopByList',
        method: 'get',
        params: query
    })
}


export  function GetDataByTopShop(query) {
    return request({
        url: '/admin/Home/GetDataByTopShop',
        method: 'get',
        params: query
    })
}




export  function GetDataByDownload(query) {
    return request({
        url: '/admin/Home/GetDatabyDownload',
        method: 'get',
        params: query
    })
}







