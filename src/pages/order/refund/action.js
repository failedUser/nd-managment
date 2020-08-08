
import request from '../../../assets/js/request';


export function requestOrderRefundList(data) {
    return request({
        method: 'get',
        url: '/backOrder/refundDetails',
        params: data
    })
}

export function requestRefundDetail(data) {
    return request({
        method: 'get',
        url: '/backOrder/refundDetails',
        params: data
    })
    
}