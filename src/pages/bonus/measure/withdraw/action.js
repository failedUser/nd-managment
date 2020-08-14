
import request from '../../../../assets/js/request';

export function requestWithDrawList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/withdrawConfig',
        params: data
    })
}