
import request from '../../../assets/js/request';


export function requestOrderList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backOrder/order',
        params: data
    })
    
}




export function requestOrderDetail(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backOrder/orderDetails',
        params: data
    })
    
}


/**
 * 导出
 * @param {} data 
 */
export function requestForOrderExport(data) {
    return request({
        method: 'get',
        type: 'json',
        url: '/newdreamer/backOrder/exportOrder',
        data: data
    })
}


/**
 * 修改状态
 * @param {} data 
 */
export function requestForOrdrStatusUpdate(data) {
    return request({
        method: 'POST',
        url: '/newdreamer/backOrder/updateOrderStatus',
        data: data
    })
}
