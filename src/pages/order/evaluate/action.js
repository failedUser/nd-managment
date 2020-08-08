
import request from '../../../assets/js/request';

export function requestEvaluateList(data) {
    return request({
        method: 'get',
        url: '/backOrder/evaluation',
        params: data
    })
}