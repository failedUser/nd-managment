
import request from '../../../assets/js/request';
import { exportFile } from '../../../assets/js/common'

export function requestMeasureList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/volumer',
        params: data
    })
}

/**
 * 修改商品信息
 * @param {} data 
 */
export function requestForMeasureEdit(data) {
    return request({
        method: 'post ',
        url: '/newdreamer/volumer',
        data: data,
        type: 'json'
    })
}

export function requestForMeasureCreate(data) {
    return request({
        method: 'put',
        url: '/newdreamer/volumer',
        data: data,
        type: 'json'
    })
}

export function requestForMeasureDelete(data) {
    return request({
        method: 'delete',
        url: '/newdreamer/volumer',
        data: data,
        type: 'json'
    })
}


export function requestForMeasureExport(data) {
    return  exportFile('/newdreamer/volumer/exportExcel', data);
}

