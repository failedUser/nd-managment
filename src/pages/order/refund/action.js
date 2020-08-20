
import request from '../../../assets/js/request';
import { exportFile } from '../../../assets/js/common'


export function requestRefundExport(data) {
    alert('退款没有导出接口');
    // exportFile()
}

export function requestOrderRefundList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backOrder/refundDetails',
        params: data
    })
}

export function requestRefundDetail(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backOrder/refundDetails',
        params: data
    })
    
}


/**
 * 更改订单状态
 * @param {} data 
 */


export function requestRefundStatusUpdate(data) {
    return request({
        method: 'put',
        url: '/newdreamer/backOrder/updateRefundStatus',
        params: data
    })
    
}