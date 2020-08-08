
import request from '../../../assets/js/request';

export function requestBonusList(data) {
    return request({
        method: 'get',
        url: '/backVolumer/reward',
        params: data
    })
}

/**
 * 修改商品信息
 * @param {} data 
 */
export function requestForBonusEdit(data) {
    // TODO:奖励金修改接口
    return request({
        method: 'put',
        url: '/backVolumer/updateDeduction',
        data: data,
        type: 'json'
    })
}
