
import request from '../../../assets/js/request';

export function requestCustomeVolumeList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backCustomer/sizeInfo',
        params: data
    })
}



export function requestCustomeVolumeExport(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backCustomer/exportSizeInfo',
        params: data
    })
}




export function requestCustomeVolumeUpdate(data) {
    return request({
        method: 'post',
        url: '/newdreamer/backCustomer/updateSizeInfo',
        data: data
    })
}