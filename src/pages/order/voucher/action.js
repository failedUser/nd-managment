
import request from '../../../assets/js/request';


export function requestOrderList(data) {
    return request({
        method: 'get',
        url: '/backOrder/order',
        params: data
    })
    
}




export function requestOrderDetail(data) {
    return request({
        method: 'get',
        url: '/backOrder/orderDetails',
        params: data
    })
    
}