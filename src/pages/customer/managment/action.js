
import request from '../../../assets/js/request';

export function requestOrderList(data) {
    return request({
        method: 'get',
        url: '/backCustomer/customerInfo',
        params: data
    })

}