
import request from '../../../assets/js/request';

export function requestCustomeVolumeList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backCustomer/sizeInfo',
        params: data
    })
}