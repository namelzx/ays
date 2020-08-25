
import request from '@/utils/request'

export function GetDataByList(query) {
    return request({
        url: '/admin/Log/index',
        method: 'post',
        data: query
    })
}
