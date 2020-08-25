
import request from '@/utils/request'

export function GetDataByList(query) {
    return request({
        url: '/admin/OperationLog/index',
        method: 'post',
        data: query
    })
}
