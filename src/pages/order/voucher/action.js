
import request from '../../../assets/js/request';
import { exportFile } from '../../../assets/js/common'


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
    return exportFile('/newdreamer/backOrder/exportOrder', data);
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



/**
 * 发货
 * @param {} data 
 */
export function requestForOrdrShip(data) {
    return request({
        method: 'POST',
        url: '/newdreamer/deliver',
        data: data
    })
}
