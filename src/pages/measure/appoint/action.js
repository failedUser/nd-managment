
import request from '../../../assets/js/request';

export function requestAppointList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/backVolumer/reservation',
        params: data
    })
}

/**
 * 修改商品信息
 * @param {} data 
 */
export function requestForAppointEdit(data) {
    // TODO: 预约单修改接口
    return request({
        method: 'post',
        url: '/newdreamer/volumer',
        data: data,
        type: 'json'
    })
}

export function requestForAppointCreate(data) {
    // TODO: 预约单创建
    return request({
        method: 'put',
        url: '/newdreamer/volumer',
        data: data,
        type: 'json'
    })
}

export function requestForAppointDelete(data) {
     // TODO: 预约单删除
    // return request({
    //     method: 'delete',
    //     url: '/newdreamer/volumer',
    //     data: data,
    //     type: 'json'
    // })
}